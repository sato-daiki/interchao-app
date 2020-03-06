import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from 'firebase';
import { getUser } from '../libs/user';
import { getProfile } from '../libs/profile';
import { initAnalytics } from '../utils/Analytics';
import { Profile, User } from '../types';

interface Props {
  setUser: (user: User) => void;
  setProfile: (profile: Profile) => void;
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

/**
 * 概要：初期ローデンング
 */
const AuthLoadingScreen: ScreenType = ({
  setUser,
  setProfile,
  navigation,
}): JSX.Element => {
  const initNavigation = async (
    authUser: firebase.User | null
  ): Promise<void> => {
    console.log('authUser', authUser);
    if (authUser) {
      const user = await getUser(authUser.uid);
      const profile = await getProfile(authUser.uid);
      if (user && profile) {
        // 初期登録が最後までできているユーザ
        setUser(user);
        setProfile(profile);
        navigation.navigate('MainTabNavigator');
      }
      せ;
    } else {
      navigation.navigate('AuthNavigator');
    }
  };

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(initNavigation);
  }, []);

  return <View />;
};

AuthLoadingScreen.navigationOptions = (): NavigationStackOptions => ({
  headerShown: false,
});

export default AuthLoadingScreen;
