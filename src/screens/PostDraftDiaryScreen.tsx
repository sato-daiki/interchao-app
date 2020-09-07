import React, { useState, useCallback, useEffect } from 'react';
import { Keyboard, BackHandler, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import firebase from '../constants/firebase';
import { User } from '../types/user';

import { HeaderRight, HeaderLeft } from '../components/atoms';
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
import {
  ModalPostDraftDiaryStackParamList,
  ModalPostDraftDiaryStackNavigationProp,
} from '../navigations/ModalNavigator';

export interface Props {
  user: User;
  profile: Profile;
}

interface DispatchProps {
  setUser: (user: User) => void;
  addDiary: (diary: Diary) => void;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalPostDraftDiaryStackParamList, 'PostDraftDiary'>,
  ModalPostDraftDiaryStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
  route: RouteProp<ModalPostDraftDiaryStackParamList, 'PostDraftDiary'>;
} & Props &
  DispatchProps;

/**
 * 概要：日記投稿画面
 */
const PostDraftDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  user,
  profile,
  setUser,
  addDiary,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLack, setIsModalLack] = useState(user.points < 10);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  useEffect(() => {
    const { item } = route.params;
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
        title,
        text,
        profile: displayProfile,
        diaryStatus,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
    },
    [profile, text, title]
  );

  const onPressDraft = useCallback(() => {
    const f = async (): Promise<void> => {
      Keyboard.dismiss();
      if (isLoading || isModalLack) return;
      try {
        const { item } = route.params;
        if (!item || !item.objectID) return;

        setIsLoading(true);
        const diary = getDiary('draft');
        const refDiary = firebase.firestore().doc(`diaries/${item.objectID}`);
        await refDiary.update(diary);
        track(events.CREATED_DIARY, {
          characters: text.length,
          diaryStatus: 'draft',
        });
        navigation.navigate('Home', {
          screen: 'MyDiaryTab',
          params: { screen: 'MyDiaryList' },
        });
        setIsLoading(false);
        setIsModalAlert(false);
      } catch (err) {
        setIsLoading(false);
        alert({ err });
      }
    };
    f();
  }, [getDiary, isLoading, isModalLack, navigation, route.params, text.length]);

  const onPressClose = useCallback((): void => {
    Keyboard.dismiss();
    if (title.length > 0 || text.length > 0) {
      setIsModalCancel(true);
    } else {
      navigation.goBack();
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

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (): JSX.Element => (
        <HeaderLeft text={I18n.t('common.close')} onPress={onPressClose} />
      ),
      headerRight: (): JSX.Element => {
        if (user.points >= 10) {
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.points, text, title]);

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      Keyboard.dismiss();
      if (isLoading) return;
      setIsLoading(true);

      const { item } = route.params;
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
      navigation.navigate('Home', {
        screen: 'MyDiaryTab',
        params: { screen: 'MyDiaryList' },
      });
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
    route.params,
    setUser,
    text,
    title,
    user,
  ]);

  const onPressNotSave = useCallback((): void => {
    setIsModalCancel(false);
    navigation.goBack();
  }, [navigation]);

  const onPressCloseError = (): void => {
    setErrorMessage('');
    setIsModalError(false);
  };

  return (
    <PostDiary
      isLoading={isLoading}
      isModalLack={isModalLack}
      isModalAlert={isModalAlert}
      isModalCancel={isModalCancel}
      isModalError={isModalError}
      errorMessage={errorMessage}
      title={title}
      text={text}
      points={user.points}
      learnLanguage={profile.learnLanguage}
      onPressSubmitModalLack={(): void => setIsModalLack(false)}
      onPressCloseModalLack={(): void => {
        navigation.navigate('Home', {
          screen: 'TeachDiaryTab',
          params: { screen: 'TeachDiaryList' },
        });
      }}
      onPressCloseModalPublish={(): void => setIsModalAlert(false)}
      onPressCloseModalCancel={(): void => setIsModalCancel(false)}
      onChangeTextTitle={(txt: string): void => setTitle(txt)}
      onChangeTextText={(txt: string): void => setText(txt)}
      onPressSubmit={onPressSubmit}
      onPressDraft={onPressDraft}
      onPressNotSave={onPressNotSave}
      onPressCloseError={onPressCloseError}
    />
  );
};

export default PostDraftDiaryScreen;
