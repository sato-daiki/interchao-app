import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
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

  const {
    uid,
    userName,
    name,
    photoUrl,
    introduction,
    nativeLanguage,
    learnLanguage,
    spokenLanguages,
    nationalityCode,
  } = profile;

  useEffect(() => {
    const f = async (): Promise<void> => {
      navigation.setOptions({
        headerRight: (): JSX.Element => (
          <HeaderIcon
            icon="community"
            name="settings"
            onPress={(): void => navigation.navigate('Setting')}
          />
        ),
      });
      const newUserReivew = await getUserReview(uid);
      setUserReview(newUserReivew);
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const onPressEdit = useCallback(() => {
    navigation.navigate('ModalEditMyProfile', { screen: 'EditMyProfile' });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProfileIconHorizontal
          userName={userName}
          photoUrl={photoUrl}
          nativeLanguage={nativeLanguage}
        />
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
        spokenLanguages={spokenLanguages}
      />
      {nationalityCode ? (
        <ProfileNationalityCode nationalityCode={nationalityCode} />
      ) : null}
    </View>
  );
};

export default MyPageScreen;
