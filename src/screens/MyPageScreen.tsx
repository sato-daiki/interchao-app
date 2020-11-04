import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import TopReviewList from '@/components/organisms/TopReviewList';
import { primaryColor, fontSizeM } from '../styles/Common';
import { Profile, UserReview, User } from '../types';
import {
  ProfileIconHorizontal,
  SmallButtonWhite,
  Space,
  ScoreStar,
  UserPoints,
  HeaderIcon,
} from '../components/atoms';
import {
  ProfileLanguage,
  ProfileNationalityCode,
} from '../components/molecules';
import { getUserReview } from '../utils/userReview';
import I18n from '../utils/I18n';
import {
  MyPageTabStackParamList,
  MyPageTabNavigationProp,
} from '../navigations/MyPageTabNavigator';

export interface Props {
  profile: Profile;
  user: User;
}

type MyPageNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageTabStackParamList, 'MyPage'>,
  MyPageTabNavigationProp
>;

type ScreenType = {
  navigation: MyPageNavigationProp;
} & Props;

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
});

/**
 * マイページ
 */
const MyPageScreen: React.FC<ScreenType> = ({ navigation, profile, user }) => {
  const [userReview, setUserReview] = useState<UserReview | null>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: (): JSX.Element => (
        <HeaderIcon
          icon="community"
          name="settings"
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
    [navigation]
  );

  const onPressMoreReview = useCallback((): void => {
    if (!profile) return;
    navigation.push('ReviewList', {
      userName: profile.userName,
    });
  }, [navigation, profile]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.header}>
          <ProfileIconHorizontal
            userName={profile.userName}
            photoUrl={profile.photoUrl}
            nativeLanguage={profile.nativeLanguage}
          />
          <SmallButtonWhite
            title={I18n.t('myPage.editButton')}
            onPress={onPressEdit}
          />
        </View>
        {profile.name ? <Text style={styles.name}>{profile.name}</Text> : null}
        {userReview ? (
          <ScoreStar
            score={userReview.score}
            reviewNum={userReview.reviewNum}
          />
        ) : null}
        <Space size={8} />
        <Text style={styles.introduction}>{profile.introduction}</Text>
        <UserPoints points={user.points} />
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
