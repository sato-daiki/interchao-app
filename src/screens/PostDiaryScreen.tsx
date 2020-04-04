import React, { useState, useCallback, useEffect } from 'react';
import { Alert, Keyboard } from 'react-native';
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
import { checkBeforePost, getUsePoints } from '../utils/diary';

interface Props {
  user: User;
  profile: Profile;
  setPoints: (points: number) => void;
  addDiary: (diary: Diary) => void;
  addDraftDiary: (diary: Diary) => void;
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

/**
 * 概要：日記投稿画面
 */
const PostDiaryScreen: ScreenType = ({
  navigation,
  user,
  profile,
  setPoints,
  addDiary,
  addDraftDiary,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // ポイントが足りない時アラートをだす
  const [isModalLack, setIsModalLack] = useState(user.points < 10);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const getDiary = useCallback(
    (diaryStatus: DiaryStatus): Diary => {
      const displayProfile: DisplayProfile = {
        uid: profile.uid,
        userName: profile.userName,
        photoUrl: profile.photoUrl,
        learnLanguage: profile.learnLanguage,
        nativeLanguage: profile.nativeLanguage,
        ref: firebase.firestore().doc(`profiles/${profile.uid}`),
      };

      return {
        premium: user.premium || false,
        isPublic,
        title,
        text,
        profile: displayProfile,
        diaryStatus,
        correction: null,
        proCorrection: null,
        correctionStatus: 'yet',
        correctionStatusPro: 'yet',
        isReview: false,
        isReviewPro: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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

  const onPressDraft = useCallback(() => {
    const f = async (): Promise<void> => {
      Keyboard.dismiss();
      if (isLoading || isModalLack) return;
      try {
        setIsLoading(true);
        const diary = getDiary('draft');
        const diaryDoc = await firebase
          .firestore()
          .collection('diaries')
          .add(diary);

        track(events.CREATED_DIARY, { diaryStatus: 'draft' });

        // reduxに追加
        addDraftDiary({
          objectID: diaryDoc.id,
          ...diary,
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
  }, [addDraftDiary, getDiary, isLoading, isModalLack, navigation]);

  const onPressClose = useCallback((): void => {
    Keyboard.dismiss();
    if (title.length > 0 || text.length > 0) {
      setIsModalCancel(true);
    } else {
      navigation.goBack(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text.length, title.length]);

  const onPressPublic = useCallback((): void => {
    Keyboard.dismiss();
    const res = checkBeforePost(
      title,
      text,
      user.points,
      profile.learnLanguage
    );
    if (!res) {
      return;
    }
    setIsModalAlert(true);
  }, [profile.learnLanguage, text, title, user.points]);

  useEffect(() => {
    navigation.setParams({
      points: user.points,
      onPressClose,
      onPressDraft,
      onPressPublic,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.points, text, title]);

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isLoading) return;
      try {
        setIsLoading(true);
        const diary = getDiary('publish');
        const usePoints = getUsePoints(text.length, profile.learnLanguage);
        const newPoints = user.points - usePoints;
        const diaryDoc = await firebase
          .firestore()
          .collection('diaries')
          .add(diary);

        const refUser = firebase.firestore().doc(`users/${user.uid}`);
        await refUser.update({
          points: newPoints,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        track(events.CREATED_DIARY, { diaryStatus: 'publish' });

        // reduxに追加
        addDiary({
          objectID: diaryDoc.id,
          ...diary,
        });
        setPoints(newPoints);

        navigation.navigate('MyDiaryList');
        setIsLoading(false);
        setIsModalAlert(false);
      } catch (err) {
        setIsLoading(false);
        Alert.alert('ネットワークエラーです', err);
      }
    };
    f();
  }, [
    addDiary,
    getDiary,
    isLoading,
    navigation,
    profile.learnLanguage,
    setPoints,
    text.length,
    user.points,
    user.uid,
  ]);

  const onPressNotSave = useCallback((): void => {
    navigation.goBack(null);
  }, [navigation]);

  return (
    <PostDiary
      isLoading={isLoading}
      isModalLack={isModalLack}
      isModalAlert={isModalAlert}
      isModalCancel={isModalCancel}
      isPublic={isPublic}
      title={title}
      text={text}
      points={user.points}
      learnLanguage={profile.learnLanguage}
      onPressSubmitModalLack={(): void => setIsModalLack(false)}
      onPressCloseModalLack={(): void => {
        navigation.navigate('TeachDiaryList');
      }}
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

PostDiaryScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressClose = navigation.getParam('onPressClose');
  const onPressPublic = navigation.getParam('onPressPublic');
  const onPressDraft = navigation.getParam('onPressDraft');
  const points = navigation.getParam('points');

  return {
    ...DefaultNavigationOptions,
    title: '新規日記',
    headerLeft: (): JSX.Element => (
      <HeaderText title="閉じる" onPress={onPressClose} />
    ),
    headerRight: (): JSX.Element => {
      if (points >= 10) {
        return <HeaderText title="投稿" onPress={onPressPublic} />;
      }
      return <HeaderText title="下書き保存" onPress={onPressDraft} />;
    },
  };
};

export default PostDiaryScreen;
