import { useState, useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { logAnalytics, events } from '@/utils/Analytics';
import firebase from '@/constants/firebase';
import { User } from '@/types/user';
import { DiaryStatus, Profile, Diary } from '@/types';
import {
  getUsePoints,
  getDisplayProfile,
  getRunningDays,
  getRunningWeeks,
  getPublishMessage,
  getThemeDiaries,
} from '@/utils/diary';
import { alert } from '@/utils/ErrorAlert';
import {
  PostDraftDiaryNavigationProp,
  PostDraftDiaryRouteProp,
} from './interfaces';
import { useCommon } from '../PostDiaryScreen/useCommont';

interface UsePostDraftDiary {
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
}: UsePostDraftDiary) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const { item } = route.params;

  const {
    isModalLack,
    isModalCancel,
    isModalError,
    errorMessage,
    isLoadingPublish,
    setIsLoadingPublish,
    isLoadingDraft,
    setIsLoadingDraft,
    isModalAlert,
    setIsModalAlert,
    isPublish,
    setIsPublish,
    title,
    setTitle,
    text,
    setText,
    publishMessage,
    setPublishMessage,
    onPressPublic,
    onPressClose,
    onPressCloseError,
    onPressCloseModalPublish,
    onPressCloseModalCancel,
    onPressSubmitModalLack,
    onClosePostDiary,
    onPressNotSave,
    onPressCloseModalLack,
    onPressWatchAdModalLack,
  } = useCommon({
    navigation,
    points: user.points,
    learnLanguage: profile.learnLanguage,
  });

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setText(item.text);
    }
    setIsInitialLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    [profile, text, title, user.diaryPosted],
  );

  const onPressDraft = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isInitialLoading || isLoadingDraft || isLoadingPublish || isModalLack)
      return;
    try {
      if (!item || !item.objectID) return;

      setIsLoadingDraft(true);
      const diary = getDiary('draft');
      const refDiary = firebase.firestore().doc(`diaries/${item.objectID}`);
      await refDiary.update(diary);
      logAnalytics(events.CREATED_DIARY);

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
    } catch (err: any) {
      setIsLoadingDraft(false);
      alert({ err });
    }
  }, [
    editDiary,
    getDiary,
    isInitialLoading,
    isLoadingDraft,
    isLoadingPublish,
    isModalLack,
    item,
    navigation,
    setIsLoadingDraft,
    setIsModalAlert,
  ]);

  const onPressSubmit = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isInitialLoading || isLoadingDraft || isLoadingPublish) return;
    if (!item.objectID) return;

    setIsLoadingPublish(true);
    const diary = getDiary('publish');
    const usePoints = getUsePoints(text.length, profile.learnLanguage);
    const newPoints = user.points - usePoints;
    const runningDays = getRunningDays(
      user.runningDays,
      user.lastDiaryPostedAt,
    );
    const runningWeeks = getRunningWeeks(
      user.runningWeeks,
      user.lastDiaryPostedAt,
    );

    const message = getPublishMessage(
      user.runningDays,
      user.runningWeeks,
      runningDays,
      runningWeeks,
    );

    let { themeDiaries } = user;
    if (item.themeCategory && item.themeSubcategory) {
      themeDiaries = getThemeDiaries(
        user.themeDiaries,
        item.objectID,
        item.themeCategory,
        item.themeSubcategory,
      );
    }

    await firebase
      .firestore()
      .runTransaction(async (transaction) => {
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
      .catch((err) => {
        setIsLoadingPublish(false);
        alert({ err });
      });
    logAnalytics(events.CREATED_DIARY);

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

    setIsLoadingPublish(false);
    setIsPublish(true);
  }, [
    editDiary,
    getDiary,
    isInitialLoading,
    isLoadingDraft,
    isLoadingPublish,
    item,
    profile.learnLanguage,
    setIsLoadingPublish,
    setIsPublish,
    setPublishMessage,
    setUser,
    text,
    title,
    user,
  ]);

  const onChangeTextTitle = useCallback(
    (txt) => {
      setTitle(txt);
    },
    [setTitle],
  );

  const onChangeTextText = useCallback(
    (txt) => {
      setText(txt);
    },
    [setText],
  );

  return {
    isLoadingDraft,
    isLoadingPublish,
    isInitialLoading,
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
    onPressWatchAdModalLack,
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
