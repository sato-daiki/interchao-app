import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { primaryColor, fontSizeM } from '../styles/Common';
import { Profile, UserReview, User } from '../types';
import {
  ProfileIconHorizontal,
  SmallButtonWhite,
  Space,
  ScoreStar,
  UserPoints,
} from '../components/atoms';
import { ProfileLanguage } from '../components/molecules';
import { getUserReview } from '../utils/userReview';
import I18n from '../utils/I18n';

export interface Props {
  profile: Profile;
  user: User;
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 16,
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
const MyPageScreen: ScreenType = ({ navigation, profile, user }) => {
  const [userReview, setUserReview] = useState<UserReview | null>();

  const {
    uid,
    userName,
    name,
    photoUrl,
    introduction,
    nativeLanguage,
    learnLanguage,
  } = profile;

  useEffect(() => {
    const f = async (): Promise<void> => {
      navigation.setParams({
        onPressSetting: () => navigation.navigate('Setting'),
      });
      const newUserReivew = await getUserReview(uid);
      setUserReview(newUserReivew);
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const onPressEdit = useCallback(() => {
    navigation.navigate('EditMyProfile');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProfileIconHorizontal userName={userName} photoUrl={photoUrl} />
        <SmallButtonWhite
          title={I18n.t('myPage.editButton')}
          onPress={onPressEdit}
        />
      </View>
      {name ? <Text style={styles.name}>{name}</Text> : null}
      {userReview ? (
        <ScoreStar score={userReview.score} reviewNum={userReview.reviewNum} />
      ) : null}
      <Space size={8} />
      <Text style={styles.introduction}>{introduction}</Text>
      <UserPoints points={user.points} />
      <Space size={8} />
      <ProfileLanguage
        nativeLanguage={nativeLanguage}
        learnLanguage={learnLanguage}
      />
    </View>
  );
};

MyPageScreen.navigationOptions = ({ navigation }): NavigationStackOptions => {
  const onPressSetting = navigation.getParam('onPressSetting');
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('myPage.headerTitle'),
    headerRight: (): JSX.Element => (
      <TouchableOpacity onPress={onPressSetting}>
        <MaterialCommunityIcons
          size={28}
          color={primaryColor}
          name="settings"
          onPress={onPressSetting}
        />
      </TouchableOpacity>
    ),
  };
};

export default MyPageScreen;
