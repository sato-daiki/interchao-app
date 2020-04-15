import React, { useEffect, useCallback } from 'react';
import { View } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from 'firebase';
import { getUser } from '../utils/user';
import { getProfile } from '../utils/profile';
import { initAnalytics, setAnalyticsUser } from '../utils/Analytics';
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
  useEffect(() => {
    initAnalytics();
  }, []);

  const initNavigation = useCallback(
    (authUser: firebase.User | null) => {
      const f = async (): Promise<void> => {
        if (authUser) {
          // 登録済のユーザ
          const user = await getUser(authUser.uid);
          const profile = await getProfile(authUser.uid);

          if (user && profile) {
            // reduxの登録
            setUser(user);
            setProfile(profile);

            // Amplitudeに登録
            setAnalyticsUser(user, profile);
            navigation.navigate('MainTabNavigator');
          } else {
            // ここに入る場合エラーどうするか;
            navigation.navigate('AuthNavigator');
          }
        } else {
          navigation.navigate('AuthNavigator');
        }
      };
      f();
    },
    [navigation, setProfile, setUser]
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged(initNavigation);
  }, [initNavigation]);

  return <View />;
};

AuthLoadingScreen.navigationOptions = (): NavigationStackOptions => ({
  headerShown: false,
});

export default AuthLoadingScreen;
