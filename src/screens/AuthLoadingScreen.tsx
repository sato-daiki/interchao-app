import React, { useEffect, useCallback, useState } from 'react';
import firebase from 'firebase';
import { getUser } from '../utils/user';
import { getProfile } from '../utils/profile';
import { initAnalytics, setAnalyticsUser } from '../utils/Analytics';
import { Profile, User } from '../types';
import { LoadingModal } from '../components/atoms';
import AuthNavigator from '../navigations/AuthNavigator';
import MainTabNavigator from '../navigations/MainTabNavigator';

export interface Props {
  user: User;
  profile: Profile;
}

interface DispatchProps {
  setUser: (user: User) => void;
  setProfile: (profile: Profile) => void;
}

/**
 * 概要：初期ローデンング
 */
const AuthLoadingScreen: React.FC<Props & DispatchProps> = ({
  user,
  profile,
  setUser,
  setProfile,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initAnalytics();
  }, []);
  const initNavigation = useCallback(
    (authUser: firebase.User | null) => {
      const f = async (): Promise<void> => {
        if (authUser) {
          // 登録済のユーザ
          const newUser = await getUser(authUser.uid);
          const newProfile = await getProfile(authUser.uid);

          if (newUser && newProfile) {
            // reduxの登録
            setUser(newUser);
            setProfile(newProfile);

            // Amplitudeに登録
            setAnalyticsUser(user, profile);
          }
        }
        setIsLoading(false);
      };
      f();
    },
    [profile, setProfile, setUser, user]
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged(initNavigation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingModal visible />;
  }

  if (!user) {
    return <AuthNavigator />;
  }
  return <MainTabNavigator />;
};

export default AuthLoadingScreen;
