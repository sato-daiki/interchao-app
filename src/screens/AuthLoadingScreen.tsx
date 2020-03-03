import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import firebase, { User } from 'firebase';
import { getUser } from '../libs/user';
import { getProfile } from '../libs/profile';

/**
 * 概要：初期ローデンング
 */
const AuthLoadingScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  setUser,
  setProfile,
  navigation,
}): JSX.Element => {
  const initNavigation = async (
    authUser: firebase.User | null
  ): Promise<void> => {
    if (authUser) {
      const user = await getUser(authUser.uid);
      const profile = await getProfile(authUser.uid);
      if (user && profile) {
        // 初期登録が最後までできているユーザ
        setUser({
          ...user,
        });
        setProfile({
          ...profile,
        });
        navigation.navigate('MainTabNavigator');
      }
    } else {
      navigation.navigate('AuthNavigator');
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(initNavigation);
  }, []);

  return <View />;
};

export default AuthLoadingScreen;
