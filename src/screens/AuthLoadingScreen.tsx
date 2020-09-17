import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { getUser } from '../utils/user';
import { getProfile } from '../utils/profile';
import { initAnalytics, setAnalyticsUser } from '../utils/Analytics';
import { Profile, User, LocalStatus } from '../types';
import { LoadingModal } from '../components/atoms';
import AuthNavigator from '../navigations/AuthNavigator';
import MainNavigator from '../navigations/MainNavigator';

export interface Props {
  localStatus: LocalStatus;
}

interface DispatchProps {
  setUser: (user: User) => void;
  setProfile: (profile: Profile) => void;
  restoreUid: (uid: string | null) => void;
}

/**
 * 概要：初期ローデンング
 */
const AuthLoadingScreen: React.FC<Props & DispatchProps> = ({
  localStatus,
  setUser,
  setProfile,
  restoreUid,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const initNavigation = (authUser: firebase.User | null): void => {
    const f = async (): Promise<void> => {
      if (authUser) {
        const newUser = await getUser(authUser.uid);
        const newProfile = await getProfile(authUser.uid);
        if (newUser && newProfile) {
          setUser(newUser);
          setProfile(newProfile);
          restoreUid(authUser.uid);

          // Amplitudeに登録
          setAnalyticsUser(newUser, newProfile);
        }
      } else {
        restoreUid(null);
      }
      if (isLoading) setIsLoading(false);
    };
    f();
  };

  useEffect(() => {
    const authSubscriber = firebase.auth().onAuthStateChanged(initNavigation);
    return authSubscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Stack = createStackNavigator();

  if (localStatus.isLoading) {
    return (
      // 直でスクリーン呼ぶとwebの時エラーになる
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingModal} />
      </Stack.Navigator>
    );
  }

  if (localStatus.uid !== null) {
    return <MainNavigator />;
  }
  return <AuthNavigator />;
};

export default AuthLoadingScreen;
