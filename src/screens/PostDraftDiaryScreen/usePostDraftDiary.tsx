import { useState, useCallback, useEffect } from 'react';
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
  getThemeDiaries,
} from '@/utils/diary';
import I18n from '@/utils/I18n';
import { alert } from '@/utils/ErrorAlert';
import {
  PostDraftDiaryNavigationProp,
  PostDraftDiaryRouteProp,
} from './interfaces';

interface UsePostDiary {
  user: User;
  profile: Profile;
  setUser: (user: User) => void;
  editDiary: (objectID: string, diary: Diary) => void;
  navigation: PostDraftDiaryNavigationProp;
  route: PostDraftDiaryRouteProp;
}

export const usePostDraftDiary = ({
  navigation,
  route,
  user,
  profile,
  setUser,
  editDiary,
}: UsePostDiary) => {
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLack, setIsModalLack] = useState(user.points < 10);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [publishMessage, setPublishMessage] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const { item } = route.params;
    if (item) {
      setTitle(item.title);
      setText(item.text);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const getDiary = useCallback(
    (diaryStatus: DiaryStatus) => {
      const displayProfile = getDisplayProfile(profile);
      return {
        firstDiary:
          diaryStatus === 'publish' &&
          (user.diaryPosted === undefined || user.diaryPosted === false),
        title,
        text,
        profile: displayProfile,
        diaryStatus,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
    },
    [profile, text, title, user.diaryPosted]
  );

  const onPressDraft = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isLoadingDraft || isModalLack) return;
    try {
      const { item } = route.params;
      if (!item || !item.objectID) return;

      setIsLoadingDraft(true);
      const diary = getDiary('draft');
      const refDiary = firebase.firestore().doc(`diaries/${item.objectID}`);
      await refDiary.update(diary);
      track(events.CREATED_DIARY, {
        characters: text.length,
        diaryStatus: 'draft',
      });

      // reduxを更新
      editDiary(item.objectID, {
        ...item,
        ...diary,
      });
      setIsLoadingDraft(false);
      setIsModalAlert(false);

      navigation.navigate('Home', {
        screen: 'MyDiaryTab',
        params: { screen: 'MyDiaryList' },
      });
    } catch (err) {
      setIsLoadingDraft(false);
      alert({ err });
    }
  }, [
    editDiary,
    getDiary,
    isLoadingDraft,
    isModalLack,
    navigation,
    route.params,
    text.length,
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

  const onPressSubmit = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isLoading) return;
    const { item } = route.params;
    if (!item.objectID) return;

    setIsLoading(true);
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

    let { themeDiaries } = user;
    if (item.themeCategory && item.themeSubcategory) {
      themeDiaries = getThemeDiaries(
        user.themeDiaries,
        item.objectID,
        item.themeCategory,
        item.themeSubcategory
      );
    }

    await firebase
      .firestore()
      .runTransaction(async transaction => {
        const diaryRef = firebase.firestore().doc(`diaries/${item.objectID}`);
        transaction.update(diaryRef, diary);

        const refUser = firebase.firestore().doc(`users/${user.uid}`);
        // 初回の場合はdiaryPostedを更新する
        const updateUser = {
          themeDiaries,
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
        setIsLoading(false);
        alert({ err });
      });
    track(events.CREATED_DIARY, {
      usePoints,
      characters: text.length,
      diaryStatus: 'publish',
    });

    // reduxを更新
    editDiary(item.objectID, {
      ...item,
      title,
      text,
      diaryStatus: 'publish',
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
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

    setIsLoading(false);
    setIsPublish(true);
  }, [
    editDiary,
    getDiary,
    isLoading,
    profile.learnLanguage,
    route.params,
    setUser,
    text,
    title,
    user,
  ]);

  const onClosePostDiary = useCallback((): void => {
    navigation.navigate('Home', {
      screen: 'MyDiaryTab',
      params: { screen: 'MyDiaryList' },
    });
    setIsModalAlert(false);
    setIsPublish(false);
  }, [navigation]);

  const onPressNotSave = useCallback((): void => {
    setIsModalCancel(false);
    navigation.navigate('Home', {
      screen: 'MyDiaryTab',
      params: { screen: 'MyDiaryList' },
    });
  }, [navigation]);

  const onPressCloseError = useCallback((): void => {
    setErrorMessage('');
    setIsModalError(false);
  }, []);

  const onChangeTextTitle = useCallback(txt => {
    setTitle(txt);
  }, []);

  const onChangeTextText = useCallback(txt => {
    setText(txt);
  }, []);

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
    isLoading,
    isModalLack,
    isModalAlert,
    isModalCancel,
    isModalError,
    isPublish,
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
    onPressCloseError,
    onPressClose,
    onPressPublic,
  };
};
