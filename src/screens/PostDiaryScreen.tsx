import React, { useState, useCallback, useEffect } from 'react';
import { Keyboard, StyleSheet, Platform } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from '../constants/firebase';
import { User } from '../types/user';
import { HeaderText } from '../components/atoms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
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

export interface Props {
  user: User;
  profile: Profile;
}

interface DispatchProps {
  setUser: (user: User) => void;
  addDiary: (diary: Diary) => void;
}

const styles = StyleSheet.create({
  headerLeft: {
    paddingLeft: Platform.OS === 'android' ? 16 : 0,
  },
});

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
const PostDiaryScreen: ScreenType = ({
  navigation,
  user,
  profile,
  setUser,
  addDiary,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTutorialLoading, setIsTutorialLoading] = useState(false);

  // ポイントが足りない時アラートをだす
  const [isModalLack, setIsModalLack] = useState(user.points < 10);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  // const [isPublic, setIsPublic] = useState(false);

  const getDiary = useCallback(
    (diaryStatus: DiaryStatus): Diary => {
      const displayProfile = getDisplayProfile(profile);

      return {
        premium: user.premium,
        isPublic: false,
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
    [profile, text, title, user.premium]
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

        navigation.navigate('MyDiaryList');
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
      profile.learnLanguage,
      profile.nativeLanguage
    );
    if (!res) {
      return;
    }
    setIsModalAlert(true);
  }, [profile.learnLanguage, profile.nativeLanguage, text, title, user.points]);

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
          transaction.update(refUser, {
            points: newPoints,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
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
    text.length,
    user,
  ]);

  const onPressNotSave = useCallback((): void => {
    setIsModalCancel(false);
    navigation.goBack(null);
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

  return (
    <PostDiary
      isLoading={isLoading}
      isModalLack={isModalLack}
      isModalAlert={isModalAlert}
      isModalCancel={isModalCancel}
      // isPublic={isPublic}
      isTutorialLoading={isTutorialLoading}
      tutorialPostDiary={user.tutorialPostDiary}
      title={title}
      text={text}
      points={user.points}
      learnLanguage={profile.learnLanguage}
      nativeLanguage={profile.nativeLanguage}
      onPressSubmitModalLack={(): void => setIsModalLack(false)}
      onPressCloseModalLack={(): void => {
        navigation.navigate('TeachDiaryList');
      }}
      // onValueChangePublic={(): void => setIsPublic(!isPublic)}
      onPressCloseModalPublish={(): void => setIsModalAlert(false)}
      onPressCloseModalCancel={(): void => setIsModalCancel(false)}
      onChangeTextTitle={(txt: string): void => setTitle(txt)}
      onChangeTextText={(txt: string): void => setText(txt)}
      onPressSubmit={onPressSubmit}
      onPressDraft={onPressDraft}
      onPressNotSave={onPressNotSave}
      onPressTutorial={onPressTutorial}
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
    title: I18n.t('postDiary.headerTitle'),
    headerLeft: (): JSX.Element => (
      <HeaderText
        containerStyle={styles.headerLeft}
        title={I18n.t('common.close')}
        onPress={onPressClose}
      />
    ),
    headerRight: (): JSX.Element => {
      if (points >= 10) {
        return (
          <HeaderText
            title={I18n.t('common.publish')}
            onPress={onPressPublic}
          />
        );
      }
      return (
        <HeaderText title={I18n.t('common.draft')} onPress={onPressDraft} />
      );
    },
  };
};

export default PostDiaryScreen;
