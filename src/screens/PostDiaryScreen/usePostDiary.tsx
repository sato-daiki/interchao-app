import React, { useState, useCallback, useEffect } from 'react';
import { Keyboard, BackHandler, Alert } from 'react-native';
import { track, events } from '@/utils/Analytics';
import firebase from '@/constants/firebase';
import { User } from '@/types/user';
import { DiaryStatus, Profile, Diary } from '@/types';
import {
  checkBeforePost,
  getUsePoints,
  getDisplayProfile,
  getRunningDays,
  getRunningWeeks,
  getPublishMessage,
} from '@/utils/diary';
import I18n from '@/utils/I18n';
import { alert } from '@/utils/ErrorAlert';
import { NavigationProp } from './PostDiaryScreen';

interface UsePostDiary {
  user: User;
  profile: Profile;
  setUser: (user: User) => void;
  addDiary: (diary: Diary) => void;
  navigation: NavigationProp;
}

export const usePostDiary = ({
  navigation,
  user,
  profile,
  setUser,
  addDiary,
}: UsePostDiary) => {
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [isLoadingPublish, setIsLoadingPublish] = useState(false);
  const [isFirstEdit, setIsFirstEdit] = useState(false);
  const [isTutorialLoading, setIsTutorialLoading] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ポイントが足りない時アラートをだす
  const [isModalLack, setIsModalLack] = useState(user.points < 10);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [publishMessage, setPublishMessage] = useState<string | null>(null);

  const getDiary = useCallback(
    (diaryStatus: DiaryStatus): Diary => {
      const displayProfile = getDisplayProfile(profile);

      return {
        // 最初の日記かチェック
        firstDiary: !(
          user.diaryPosted === undefined || user.diaryPosted === true
        ),
        hidden: false,
        title,
        text,
        profile: displayProfile,
        diaryStatus,
        correction: null,
        correction2: null,
        correction3: null,
        correctionStatus: 'yet',
        correctionStatus2: 'yet',
        correctionStatus3: 'yet',
        isReview: false,
        isReview2: false,
        isReview3: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
    },
    [profile, text, title, user.diaryPosted]
  );

  const onPressDraft = useCallback(() => {
    const f = async (): Promise<void> => {
      Keyboard.dismiss();
      if (isLoadingDraft || isLoadingPublish || isModalLack) return;
      try {
        setIsLoadingDraft(true);
        const diary = getDiary('draft');
        await firebase
          .firestore()
          .collection('diaries')
          .add(diary);

        track(events.CREATED_DIARY, { diaryStatus: 'draft' });
        navigation.navigate('Home', {
          screen: 'MyDiaryTab',
          params: { screen: 'MyDiaryList' },
        });
        setIsLoadingDraft(false);
        setIsModalAlert(false);
      } catch (err) {
        alert({ err });
        setIsLoadingDraft(false);
      }
    };
    f();
  }, [getDiary, isLoadingDraft, isLoadingPublish, isModalLack, navigation]);

  const onPressClose = useCallback((): void => {
    Keyboard.dismiss();
    if (title.length > 0 || text.length > 0) {
      setIsModalCancel(true);
    } else {
      navigation.goBack();
    }
  }, [navigation, text.length, title.length]);

  const onPressPublic = useCallback((): void => {
    Keyboard.dismiss();
    const checked = checkBeforePost(
      title,
      text,
      user.points,
      profile.learnLanguage
    );
    if (!checked.result) {
      setErrorMessage(checked.errorMessage);
      setIsModalError(true);
      return;
    }
    setIsModalAlert(true);
  }, [profile.learnLanguage, text, title, user.points]);

  useEffect(() => {
    // keybordでの戻るを制御する Androidのみ
    const backAction = (): boolean => {
      Alert.alert(
        I18n.t('common.confirmation'),
        I18n.t('modalDiaryCancel.message'),
        [
          {
            text: I18n.t('common.cancel'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: (): void => {
              navigation.goBack();
            },
          },
        ]
      );
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);
    return (): void =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [navigation]);

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isLoadingDraft || isLoadingPublish) return;
      setIsLoadingPublish(true);
      const diary = getDiary('publish');
      const usePoints = getUsePoints(text.length, profile.learnLanguage);
      const newPoints = user.points - usePoints;
      const runningDays = getRunningDays(
        user.runningDays,
        user.lastDiaryPostedAt
      );
      const runningWeeks = getRunningWeeks(
        user.runningWeeks,
        user.lastDiaryPostedAt
      );

      const message = getPublishMessage(
        user.runningDays,
        user.runningWeeks,
        runningDays,
        runningWeeks
      );

      let diaryId = '';
      // 日記の更新とpointsの整合性をとるためtransactionを使う
      await firebase
        .firestore()
        .runTransaction(async transaction => {
          const diaryRef = firebase
            .firestore()
            .collection('diaries')
            .doc();
          diaryId = diaryRef.id;
          transaction.set(diaryRef, diary);

          const refUser = firebase.firestore().doc(`users/${user.uid}`);
          // 初回の場合はdiaryPostedを更新する
          const updateUser = {
            points: newPoints,
            runningDays,
            runningWeeks,
            lastDiaryPostedAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          } as Pick<
            User,
            | 'points'
            | 'runningDays'
            | 'runningWeeks'
            | 'lastDiaryPostedAt'
            | 'updatedAt'
            | 'diaryPosted'
          >;
          if (!user.diaryPosted) {
            updateUser.diaryPosted = true;
          }
          transaction.update(refUser, updateUser);
        })
        .catch(err => {
          setIsLoadingPublish(false);
          alert({ err });
        });

      track(events.CREATED_DIARY, {
        usePoints,
        characters: text.length,
        diaryStatus: 'publish',
      });

      // reduxに追加
      addDiary({
        objectID: diaryId,
        ...diary,
      });
      setUser({
        ...user,
        runningDays,
        runningWeeks,
        lastDiaryPostedAt: firebase.firestore.Timestamp.now(),
        diaryPosted: true,
        points: newPoints,
      });
      setPublishMessage(message);
      setIsLoadingPublish(false);
      setIsPublish(true);
    };
    f();
  }, [
    addDiary,
    getDiary,
    isLoadingDraft,
    isLoadingPublish,
    profile.learnLanguage,
    setUser,
    text.length,
    user,
  ]);

  const onPressCloseSns = useCallback((): void => {
    navigation.navigate('Home', {
      screen: 'MyDiaryTab',
      params: { screen: 'MyDiaryList' },
    });
    setIsModalAlert(false);
    setIsPublish(false);
  }, [navigation]);

  const onPressNotSave = useCallback((): void => {
    setIsModalCancel(false);
    navigation.goBack();
  }, [navigation]);

  const onPressTutorial = useCallback((): void => {
    const f = async (): Promise<void> => {
      setIsTutorialLoading(true);
      await firebase
        .firestore()
        .doc(`users/${user.uid}`)
        .update({
          tutorialPostDiary: true,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setUser({
        ...user,
        tutorialPostDiary: true,
      });
      setIsTutorialLoading(false);
    };
    f();
  }, [setUser, user]);

  const onPressCloseError = useCallback((): void => {
    setErrorMessage('');
    setIsModalError(false);
  }, []);

  const onChangeTextTitle = useCallback(
    txt => {
      if (!isFirstEdit) setIsFirstEdit(true);
      setTitle(txt);
    },
    [isFirstEdit]
  );

  const onChangeTextText = useCallback(
    txt => {
      if (!isFirstEdit) setIsFirstEdit(true);
      setText(txt);
    },
    [isFirstEdit]
  );

  const onPressSubmitModalLack = useCallback(() => {
    setIsModalLack(false);
  }, []);

  const onPressCloseModalLack = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'TeachDiaryTab',
      params: { screen: 'TeachDiaryList' },
    });
  }, [navigation]);

  const onPressCloseModalPublish = useCallback(() => {
    setIsModalAlert(false);
  }, []);

  const onPressCloseModalCancel = useCallback(() => {
    setIsModalCancel(false);
  }, []);

  return {
    isLoadingDraft,
    isLoadingPublish,
    isModalLack,
    isModalAlert,
    isModalCancel,
    isModalError,
    isPublish,
    isFirstEdit,
    isTutorialLoading,
    errorMessage,
    title,
    text,
    publishMessage,
    onPressSubmitModalLack,
    onPressCloseModalLack,
    onPressCloseModalPublish,
    onPressCloseModalCancel,
    onPressCloseSns,
    onChangeTextTitle,
    onChangeTextText,
    onPressSubmit,
    onPressDraft,
    onPressNotSave,
    onPressTutorial,
    onPressCloseError,
    onPressClose,
    onPressPublic,
  };
};