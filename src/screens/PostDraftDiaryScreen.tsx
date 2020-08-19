import React, { useState, useCallback, useEffect } from 'react';
import { Keyboard, BackHandler, Alert } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from '../constants/firebase';
import { User } from '../types/user';

import { HeaderRight, HeaderLeft } from '../components/atoms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { DiaryStatus, Profile, Diary } from '../types';
import { track, events } from '../utils/Analytics';
import PostDiary from '../components/organisms/PostDiary';
import {
  getDisplayProfile,
  checkBeforePost,
  getUsePoints,
} from '../utils/diary';
import I18n from '../utils/I18n';
import { alert } from '../utils/ErrorAlert';

export interface Props {
  user: User;
  profile: Profile;
}

interface DispatchProps {
  setUser: (user: User) => void;
  addDiary: (diary: Diary) => void;
}

type ScreenType = React.ComponentType<
  Props & DispatchProps & NavigationStackScreenProps
> & {
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
  setUser,
  addDiary,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLack, setIsModalLack] = useState(user.points < 10);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

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
              navigation.goBack(null);
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

  useEffect(() => {
    const { params = {} } = navigation.state;
    const { item } = params;
    if (item) {
      setTitle(item.title);
      setText(item.text);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDiary = useCallback(
    (diaryStatus: DiaryStatus) => {
      const displayProfile = getDisplayProfile(profile);
      return {
        premium: user.premium,
        title,
        text,
        profile: displayProfile,
        diaryStatus,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
    },
    [profile, text, title, user.premium]
  );

  const onPressDraft = useCallback(() => {
    const f = async (): Promise<void> => {
      Keyboard.dismiss();
      if (isLoading || isModalLack) return;
      try {
        const { params = {} } = navigation.state;
        const { item } = params;
        if (!item || !item.objectID) return;

        setIsLoading(true);
        const diary = getDiary('draft');
        const refDiary = firebase.firestore().doc(`diaries/${item.objectID}`);
        await refDiary.update(diary);
        track(events.CREATED_DIARY, {
          characters: text.length,
          diaryStatus: 'draft',
        });
        navigation.navigate('MyDiaryList');
        setIsLoading(false);
        setIsModalAlert(false);
      } catch (err) {
        setIsLoading(false);
        alert({ err });
      }
    };
    f();
  }, [getDiary, isLoading, isModalLack, navigation, text.length]);

  const onPressClose = useCallback((): void => {
    Keyboard.dismiss();
    if (title.length > 0 || text.length > 0) {
      setIsModalCancel(true);
    } else {
      navigation.goBack(null);
    }
  }, [navigation, text.length, title.length]);

  const onPressPublic = useCallback((): void => {
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
      Keyboard.dismiss();
      if (isLoading) return;
      setIsLoading(true);

      const { params = {} } = navigation.state;
      const { item } = params;
      const usePoints = getUsePoints(text.length, profile.learnLanguage);
      const newPoints = user.points - usePoints;
      const diary = getDiary('publish');

      await firebase
        .firestore()
        .runTransaction(async transaction => {
          const diaryRef = firebase.firestore().doc(`diaries/${item.objectID}`);
          transaction.update(diaryRef, diary);

          const userRef = firebase.firestore().doc(`users/${user.uid}`);
          // 初回の場合はdiaryPostedを更新する
          const updateUser = {
            points: newPoints,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          } as any;
          if (!user.diaryPosted) {
            updateUser.diaryPosted = true;
          }
          transaction.update(userRef, updateUser);
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

      // reduxに追加
      addDiary({
        ...item,
        title,
        text,
        diaryStatus: 'publish',
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setUser({
        ...user,
        diaryPosted: true,
        points: newPoints,
      });

      navigation.navigate('MyDiaryList');
      setIsLoading(false);
      setIsModalAlert(false);
    };
    f();
  }, [
    addDiary,
    getDiary,
    isLoading,
    navigation,
    profile.learnLanguage,
    setUser,
    text,
    title,
    user,
  ]);

  const onPressNotSave = useCallback((): void => {
    setIsModalCancel(false);
    navigation.goBack(null);
  }, [navigation]);

  return (
    <PostDiary
      isLoading={isLoading}
      isModalLack={isModalLack}
      isModalAlert={isModalAlert}
      isModalCancel={isModalCancel}
      title={title}
      text={text}
      points={user.points}
      learnLanguage={profile.learnLanguage}
      onPressSubmitModalLack={(): void => setIsModalLack(false)}
      onPressCloseModalLack={(): void => {
        navigation.navigate('TeachDiaryList');
      }}
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
  const onPressDraft = navigation.getParam('onPressDraft');
  const points = navigation.getParam('points');

  return {
    ...DefaultNavigationOptions,
    title: I18n.t('postDraftDiary.headerTitle'),
    headerLeft: (): JSX.Element => (
      <HeaderLeft text={I18n.t('common.close')} onPress={onPressClose} />
    ),
    headerRight: (): JSX.Element => {
      if (points >= 10) {
        return (
          <HeaderRight
            text={I18n.t('common.publish')}
            onPress={onPressPublic}
          />
        );
      }
      return (
        <HeaderRight text={I18n.t('common.draft')} onPress={onPressDraft} />
      );
    },
  };
};

export default PostDraftDiaryScreen;
