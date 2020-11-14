import { useState, useCallback, useEffect } from 'react';
import { Keyboard, BackHandler, Alert } from 'react-native';

import firebase from '@/constants/firebase';
import {
  User,
  DiaryStatus,
  Profile,
  Diary,
  ThemeCategory,
  ThemeSubcategory,
} from '@/types';
import {
  checkBeforePost,
  getUsePoints,
  getDisplayProfile,
  getRunningDays,
  getRunningWeeks,
  getPublishMessage,
  getThemeDiaries,
} from '@/utils/diary';
import { track, events } from '@/utils/Analytics';
import I18n from '@/utils/I18n';
import { alert } from '@/utils/ErrorAlert';
import { PostDiaryNavigationProp } from './interfaces';

interface UsePostDiary {
  user: User;
  themeCategory: ThemeCategory | undefined;
  themeSubcategory: ThemeSubcategory | undefined;
  profile: Profile;
  setUser: (user: User) => void;
  addDiary: (diary: Diary) => void;
  navigation: PostDiaryNavigationProp;
}

export const usePostDiary = ({
  navigation,
  themeCategory,
  themeSubcategory,
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
  const [title, setTitle] = useState(themeSubcategory || '');
  const [text, setText] = useState('');
  const [publishMessage, setPublishMessage] = useState<string | null>(null);

  const getDiary = useCallback(
    (diaryStatus: DiaryStatus): Diary => {
      const displayProfile = getDisplayProfile(profile);
      return {
        // 最初の日記かチェック
        firstDiary:
          diaryStatus === 'publish' &&
          (user.diaryPosted === undefined || user.diaryPosted === false),
        hidden: false,
        title,
        text,
        themeCategory: themeCategory || null,
        themeSubcategory: themeSubcategory || null,
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
    [profile, user.diaryPosted, title, text, themeCategory, themeSubcategory]
  );

  const onPressDraft = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isLoadingDraft || isLoadingPublish || isModalLack) return;
    try {
      setIsLoadingDraft(true);
      const diary = getDiary('draft');
      const diaryRef = await firebase
        .firestore()
        .collection('diaries')
        .add(diary);
      // reduxに追加
      addDiary({
        objectID: diaryRef.id,
        ...diary,
      });
      setIsLoadingDraft(false);
      setIsModalAlert(false);
      track(events.CREATED_DIARY, { diaryStatus: 'draft' });
      navigation.navigate('Home', {
        screen: 'MyDiaryTab',
        params: { screen: 'MyDiaryList' },
      });
    } catch (err) {
      alert({ err });
      setIsLoadingDraft(false);
    }
  }, [
    addDiary,
    getDiary,
    isLoadingDraft,
    isLoadingPublish,
    isModalLack,
    navigation,
  ]);

  const onPressClose = useCallback((): void => {
    Keyboard.dismiss();
    if (title.length > 0 || text.length > 0) {
      setIsModalCancel(true);
    } else {
      navigation.navigate('Home', {
        screen: 'MyDiaryTab',
        params: { screen: 'MyDiaryList' },
      });
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
              navigation.navigate('Home', {
                screen: 'MyDiaryTab',
                params: { screen: 'MyDiaryList' },
              });
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

  const onPressSubmit = useCallback(async (): Promise<void> => {
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
    let themeDiaries = user.themeDiaries || null;

    // 日記の更新とpointsの整合性をとるためtransactionを使う
    await firebase
      .firestore()
      .runTransaction(async transaction => {
        // diariesの更新
        const refDiary = firebase
          .firestore()
          .collection('diaries')
          .doc();
        diaryId = refDiary.id;
        transaction.set(refDiary, diary);

        // Usersの更新
        if (themeCategory && themeSubcategory) {
          themeDiaries = getThemeDiaries(
            user.themeDiaries,
            diaryId,
            themeCategory,
            themeSubcategory
          );
        }
        const refUser = firebase.firestore().doc(`users/${user.uid}`);
        // 初回の場合はdiaryPostedを更新する
        const updateUser = {
          themeDiaries: themeDiaries || null,
          runningDays,
          runningWeeks,
          points: newPoints,
          lastDiaryPostedAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        } as Pick<
          User,
          | 'points'
          | 'themeDiaries'
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
      themeDiaries,
      runningDays,
      runningWeeks,
      lastDiaryPostedAt: firebase.firestore.Timestamp.now(),
      diaryPosted: true,
      points: newPoints,
    });
    setPublishMessage(message);
    setIsLoadingPublish(false);
    setIsPublish(true);
  }, [
    addDiary,
    getDiary,
    isLoadingDraft,
    isLoadingPublish,
    profile.learnLanguage,
    setUser,
    text.length,
    themeCategory,
    themeSubcategory,
    user,
  ]);

  const onClosePostDiary = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'MyDiaryTab',
      params: { screen: 'MyDiaryList' },
    });
    setIsModalAlert(false);
    setIsPublish(false);
  }, [navigation]);

  const onPressNotSave = useCallback(() => {
    setIsModalCancel(false);
    navigation.navigate('Home', {
      screen: 'MyDiaryTab',
      params: { screen: 'MyDiaryList' },
    });
  }, [navigation]);

  const onPressTutorial = useCallback(async (): Promise<void> => {
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
  }, [setUser, user]);

  const onPressCloseError = useCallback(() => {
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
    onClosePostDiary,
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
