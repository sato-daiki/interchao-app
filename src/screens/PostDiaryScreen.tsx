import React, { useState, useCallback, useEffect } from 'react';
import { Keyboard, BackHandler, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import firebase from '../constants/firebase';
import { User } from '../types/user';
import { HeaderRight, HeaderLeft } from '../components/atoms';
import { DiaryStatus, Profile, Diary } from '../types';
import { track, events } from '../utils/Analytics';
import PostDiary from '../components/organisms/PostDiary';
import {
  checkBeforePost,
  getUsePoints,
  getDisplayProfile,
} from '../utils/diary';
import I18n from '../utils/I18n';
import { alert } from '../utils/ErrorAlert';
import {
  ModalPostDiaryStackParamList,
  ModalPostDiaryStackNavigationProp,
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
  StackNavigationProp<ModalPostDiaryStackParamList, 'PostDiary'>,
  ModalPostDiaryStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
} & Props &
  DispatchProps;

/**
 * 概要：日記投稿画面
 */
const PostDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  user,
  profile,
  setUser,
  addDiary,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTutorialLoading, setIsTutorialLoading] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ポイントが足りない時アラートをだす
  const [isModalLack, setIsModalLack] = useState(user.points < 10);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const getDiary = useCallback(
    (diaryStatus: DiaryStatus): Diary => {
      const displayProfile = getDisplayProfile(profile);

      return {
        premium: user.premium,
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
    [profile, text, title, user.diaryPosted, user.premium]
  );

  const onPressDraft = useCallback(() => {
    const f = async (): Promise<void> => {
      Keyboard.dismiss();
      if (isLoading || isModalLack) return;
      try {
        setIsLoading(true);
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
        setIsLoading(false);
        setIsModalAlert(false);
      } catch (err) {
        alert({ err });
        setIsLoading(false);
      }
    };
    f();
  }, [getDiary, isLoading, isModalLack, navigation]);

  const onPressClose = useCallback((): void => {
    Keyboard.dismiss();
    if (title.length > 0 || text.length > 0) {
      setIsModalCancel(true);
    } else {
      navigation.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text.length, title.length]);

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
      if (isLoading) return;
      setIsLoading(true);
      const diary = getDiary('publish');
      const usePoints = getUsePoints(text.length, profile.learnLanguage);
      const newPoints = user.points - usePoints;
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
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          } as any;
          if (!user.diaryPosted) {
            updateUser.diaryPosted = true;
          }
          transaction.update(refUser, updateUser);
        })
        .catch(err => {
          setIsLoading(false);
          alert({ err });
        });

      track(events.CREATED_DIARY, { diaryStatus: 'publish' });
      // reduxに追加
      addDiary({
        objectID: diaryId,
        ...diary,
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
    setUser,
    text.length,
    user,
  ]);

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
      isTutorialLoading={isTutorialLoading}
      tutorialPostDiary={user.tutorialPostDiary}
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
      onPressTutorial={onPressTutorial}
      onPressCloseError={onPressCloseError}
    />
  );
};

export default PostDiaryScreen;
