import React, { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from '../constants/firebase';
import { User } from '../types/user';

import { HeaderText } from '../components/atoms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { DiaryStatus, Profile, DisplayProfile, Diary } from '../types';
import { track, events } from '../utils/Analytics';
import PostDiary from '../components/organisms/PostDiary';
import { getDisplayProfile } from '../utils/diary';

interface Props {
  user: User;
  profile: Profile;
  setPoints: (points: number) => void;
  addDiary: (diary: Diary) => void;
  deleteDraftDiary: (objectID: string) => void;
  setDraftDiary: (objectID: string, draftDiary: Diary) => void;
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

/**
 * 概要：日記投稿画面
 */
const PostDraftDiaryScreen: ScreenType = ({
  navigation,
  user,
  profile,
  setPoints,
  addDiary,
  deleteDraftDiary,
  setDraftDiary,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    const { params = {} } = navigation.state;
    const { item } = params;
    if (item) {
      setTitle(item.title);
      setText(item.text);
    }
    setIsLoading(false);
  }, []);

  const onPressClose = useCallback((): void => {
    if (title.length > 0 || text.length > 0) {
      setIsModalCancel(true);
    } else {
      navigation.goBack(null);
    }
  }, [navigation, text.length, title.length]);

  useEffect(() => {
    navigation.setParams({
      onPressClose,
      onPressPublic: () => setIsModalAlert(true),
    });
  }, [text, title]);

  const getDiary = useCallback(
    (diaryStatus: DiaryStatus) => {
      const displayProfile = getDisplayProfile(profile);
      return {
        premium: user.premium || false,
        isPublic,
        title,
        text,
        profile: displayProfile,
        diaryStatus,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
    },
    [
      isPublic,
      profile.learnLanguage,
      profile.nativeLanguage,
      profile.photoUrl,
      profile.uid,
      profile.userName,
      text,
      title,
      user.premium,
    ]
  );

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isLoading) return;
      try {
        const { params = {} } = navigation.state;
        const { item }: { item: Diary } = params;
        const points = user.points - 10;

        setIsLoading(true);
        const diary = getDiary('publish');
        const refDiary = firebase.firestore().doc(`diaries/${item.objectID}`);
        await refDiary.update(diary);

        const refUser = firebase.firestore().doc(`users/${user.uid}`);
        await refUser.update({
          points,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        track(events.CREATED_DIARY, { diaryStatus: 'publish' });

        // reduxに追加
        addDiary({
          ...item,
          isPublic,
          title,
          text,
          diaryStatus: 'publish',
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        deleteDraftDiary(item.objectID!);
        setPoints(points);

        navigation.navigate('MyDiaryList');
        setIsLoading(false);
        setIsModalAlert(false);
      } catch (err) {
        setIsLoading(false);
        Alert.alert('ネットワークエラーです');
      }
    };
    f();
  }, [
    addDiary,
    deleteDraftDiary,
    getDiary,
    isLoading,
    isPublic,
    navigation,
    setPoints,
    text,
    title,
    user.points,
    user.uid,
  ]);

  const onPressDraft = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isLoading) return;
      try {
        const { params = {} } = navigation.state;
        const { item }: { item: Diary } = params;

        setIsLoading(true);
        const diary = getDiary('draft');
        const refDiary = firebase.firestore().doc(`diaries/${item.objectID}`);
        await refDiary.update(diary);

        track(events.CREATED_DIARY, { diaryStatus: 'draft' });

        // reduxに追加
        setDraftDiary(item.objectID, {
          ...item,
          title,
          text,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        navigation.navigate('DraftDiaryList');
        setIsLoading(false);
        setIsModalAlert(false);
      } catch (err) {
        setIsLoading(false);
        Alert.alert('ネットワークエラーです');
      }
    };
    f();
  }, [getDiary, isLoading, navigation, setDraftDiary, text, title]);

  const onPressNotSave = useCallback((): void => {
    navigation.goBack(null);
  }, [navigation]);

  return (
    <PostDiary
      isLoading={isLoading}
      isModalAlert={isModalAlert}
      isModalCancel={isModalCancel}
      isPublic={isPublic}
      title={title}
      text={text}
      onValueChangePublic={(): void => setIsPublic(!isPublic)}
      onPressCloseModalPublish={(): void => setIsModalAlert(false)}
      onPressCloseModalCancel={(): void => setIsModalCancel(false)}
      onChangeTextTitle={(txt: string): void => setTitle(txt)}
      onChangeTextText={(txt: string): void => setText(txt)}
      onPressSubmit={onPressSubmit}
      onPressDraft={onPressDraft}
      onPressNotSave={onPressNotSave}
    />
  );
};

PostDraftDiaryScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressClose = navigation.getParam('onPressClose');
  const onPressPublic = navigation.getParam('onPressPublic');
  return {
    ...DefaultNavigationOptions,
    title: '下書を編集',
    headerLeft: (): JSX.Element => (
      <HeaderText title="閉じる" onPress={onPressClose} />
    ),
    headerRight: (): JSX.Element => (
      <HeaderText title="投稿" onPress={onPressPublic} />
    ),
  };
};

export default PostDraftDiaryScreen;
