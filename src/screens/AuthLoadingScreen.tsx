import React, { useEffect, useCallback, useState } from 'react';
import firebase from 'firebase';
import { getUser } from '../utils/user';
import { getProfile } from '../utils/profile';
import { initAnalytics, setAnalyticsUser } from '../utils/Analytics';
import { Profile, User } from '../types';
import { LoadingModal } from '../components/atoms';
import AuthNavigator from '../navigations/AuthNavigator';
import MainNavigator from '../navigations/MainNavigator';

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
  const [isLoggedIn, setisLoggedIn] = useState(false);

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
            setisLoggedIn(true);

            // Amplitudeに登録
            setAnalyticsUser(user, profile);
          } else {
            setisLoggedIn(false);
          }
        } else {
          setisLoggedIn(false);
        }
        if (isLoading) setIsLoading(false);
      };
      f();
    },
    [isLoading, profile, setProfile, setUser, user]
  );

  useEffect(() => {
    const authSubscriber = firebase.auth().onAuthStateChanged(initNavigation);
    return authSubscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingModal visible />;
  }

  if (!isLoggedIn) {
    return <AuthNavigator />;
  }
  return <MainNavigator />;
};

export default AuthLoadingScreen;
