import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import TopReviewList from '@/components/organisms/TopReviewList';
import { primaryColor, fontSizeM, subTextColor, fontSizeS } from '../styles/Common';
import firebase from '@/constants/firebase';
import { Profile, UserReview, User } from '../types';
import {
  ProfileIconHorizontal,
  SmallButtonWhite,
  Space,
  ScoreStar,
  UserPoints,
  HeaderIcon,
  LoadingModal,
} from '../components/atoms';
import { ProfileLanguage, ProfileNationalityCode } from '../components/molecules';
import { getUserReview } from '../utils/userReview';
import I18n from '../utils/I18n';
import {
  MyPageTabStackParamList,
  MyPageTabNavigationProp,
} from '../navigations/MyPageTabNavigator';
import ModalAdPointsGet from '@/components/organisms/ModalAdPointsGet';
import { useAdMobRewarded } from './hooks/useAdMobRewarded';
import { checkHourDiff, getActiveHour } from '@/utils/time';

export interface Props {
  profile: Profile;
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

type MyPageNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageTabStackParamList, 'MyPage'>,
  MyPageTabNavigationProp
>;

type ScreenType = {
  navigation: MyPageNavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 16,
  },
  main: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  name: {
    fontSize: fontSizeM,
    color: primaryColor,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  introduction: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeOut: {
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.3,
    color: subTextColor,
  },
});

const CHECK_HOUR = 3;

/**
 * マイページ
 */
const MyPageScreen: React.FC<ScreenType> = ({ navigation, profile, user, setUser }) => {
  const [userReview, setUserReview] = useState<UserReview | null>();
  const [isModalAdPointsGet, setIsModalAdPointsGet] = useState(false);

  const isActiveAdPointsGet = useMemo(() => {
    return checkHourDiff(user.lastWatchAdAt, CHECK_HOUR);
  }, [user.lastWatchAdAt]);

  const activeHour = useMemo(() => {
    return getActiveHour(user.lastWatchAdAt, CHECK_HOUR);
  }, [user.lastWatchAdAt]);

  const handleDidEarnReward = useCallback(async () => {
    // 広告をみた人が実行できる処理
    await firebase
      .firestore()
      .doc(`users/${user.uid}`)
      .update({
        points: user.points + 10,
        lastWatchAdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setUser({
      ...user,
      points: user.points + 10,
      lastWatchAdAt: firebase.firestore.Timestamp.now(),
    });
    setIsModalAdPointsGet(true);
  }, [setUser, user]);

  const { isLoading, showAdReward } = useAdMobRewarded({
    handleDidEarnReward,
  });
  const onPressAdPointGet = useCallback(() => {
    showAdReward();
  }, [showAdReward]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIcon
          icon='material'
          name='settings'
          onPress={(): void => navigation.navigate('Setting')}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isMounted = true;

    const f = async (): Promise<void> => {
      const newUserReivew = await getUserReview(profile.uid);
      if (isMounted) {
        setUserReview(newUserReivew);
      }
    };
    f();
    return (): void => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.uid]);

  const onPressEdit = useCallback(() => {
    navigation.navigate('ModalEditMyProfile', { screen: 'EditMyProfile' });
  }, [navigation]);

  const handlePressUser = useCallback(
    (uid: string, userName: string) => {
      navigation.navigate('UserProfile', { userName });
    },
    [navigation],
  );

  const onPressMoreReview = useCallback(() => {
    if (!profile) return;
    navigation.push('ReviewList', {
      userName: profile.userName,
    });
  }, [navigation, profile]);

  const onPressCloseAdPointsGet = useCallback(() => {
    setIsModalAdPointsGet(false);
  }, []);

  const renderButton = useCallback(() => {
    if (Platform.OS === 'web') return null;

    if (isActiveAdPointsGet) {
      return (
        <SmallButtonWhite
          disable={!isActiveAdPointsGet}
          color={primaryColor}
          title={I18n.t('myPage.adGetPoints', { points: 10 })}
          onPress={onPressAdPointGet}
        />
      );
    }

    return (
      <Text style={styles.timeOut}>{I18n.t('myPage.timeOut', { activeHour: activeHour })}</Text>
    );
  }, [activeHour, isActiveAdPointsGet, onPressAdPointGet]);

  return (
    <ScrollView style={styles.container}>
      <ModalAdPointsGet
        visible={isModalAdPointsGet}
        points={user.points}
        getPoints={10}
        onPressClose={onPressCloseAdPointsGet}
      />
      <LoadingModal visible={isLoading} text='loading' />
      <View style={styles.main}>
        <View style={styles.header}>
          <ProfileIconHorizontal
            userName={profile.userName}
            photoUrl={profile.photoUrl}
            nativeLanguage={profile.nativeLanguage}
          />
          <SmallButtonWhite title={I18n.t('myPage.editButton')} onPress={onPressEdit} />
        </View>
        {profile.name ? <Text style={styles.name}>{profile.name}</Text> : null}
        {userReview ? (
          <ScoreStar score={userReview.score} reviewNum={userReview.reviewNum} />
        ) : null}
        <Space size={8} />
        <Text style={styles.introduction}>{profile.introduction}</Text>
        <View style={styles.row}>
          <UserPoints points={user.points} />
          {renderButton()}
        </View>
        <Space size={8} />
        <ProfileLanguage
          nativeLanguage={profile.nativeLanguage}
          learnLanguage={profile.learnLanguage}
          spokenLanguages={profile.spokenLanguages}
        />
        {profile.nationalityCode ? (
          <ProfileNationalityCode nationalityCode={profile.nationalityCode} />
        ) : null}
      </View>
      <Space size={32} />
      <TopReviewList
        profile={profile}
        refreshing={false}
        userName={profile.userName}
        handlePressUser={handlePressUser}
        onPressMoreReview={onPressMoreReview}
      />
    </ScrollView>
  );
};

export default MyPageScreen;
