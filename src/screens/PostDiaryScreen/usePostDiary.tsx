import { useState, useCallback } from 'react';
import { Keyboard } from 'react-native';

import firebase from '@/constants/firebase';
import { User, DiaryStatus, Profile, Diary } from '@/types';
import {
  getUsePoints,
  getDisplayProfile,
  getRunningDays,
  getRunningWeeks,
  getPublishMessage,
  getThemeDiaries,
} from '@/utils/diary';
import { track, events } from '@/utils/Analytics';
import { alert } from '@/utils/ErrorAlert';
import { ModalPostDiaryStackParamList } from '@/navigations/ModalNavigator';
import { RouteProp } from '@react-navigation/native';
import { PostDiaryNavigationProp } from './interfaces';
import { useCommon } from './useCommont';

interface UsePostDiary {
  navigation: PostDiaryNavigationProp;
  route?: RouteProp<ModalPostDiaryStackParamList, 'PostDiary'>;
  user: User;
  profile: Profile;
  setUser: (user: User) => void;
  addDiary: (diary: Diary) => void;
}

export const usePostDiary = ({
  navigation,
  route,
  user,
  profile,
  setUser,
  addDiary,
}: UsePostDiary) => {
  const [isFirstEdit, setIsFirstEdit] = useState(false);
  const [isTutorialLoading, setIsTutorialLoading] = useState(false);

  const themeTitle = route?.params?.themeTitle;
  const themeCategory = route?.params?.themeCategory;
  const themeSubcategory = route?.params?.themeSubcategory;
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
    themeTitle,
    points: user.points,
    learnLanguage: profile.learnLanguage,
  });

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
    setIsLoadingDraft,
    setIsModalAlert,
  ]);

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
    setIsLoadingPublish,
    setIsPublish,
    setPublishMessage,
    setUser,
    text.length,
    themeCategory,
    themeSubcategory,
    user,
  ]);

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

  const onChangeTextTitle = useCallback(
    txt => {
      if (!isFirstEdit) setIsFirstEdit(true);
      setTitle(txt);
    },
    [isFirstEdit, setTitle]
  );

  const onChangeTextText = useCallback(
    txt => {
      if (!isFirstEdit) setIsFirstEdit(true);
      setText(txt);
    },
    [isFirstEdit, setText]
  );

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
    onPressWatchAdModalLack,
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
