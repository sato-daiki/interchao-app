import React, { useEffect, useCallback, useState } from 'react';
import firebase from 'firebase';
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
  setUser,
  setProfile,
  localStatus,
  restoreUid,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initAnalytics();
  }, []);

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
        } else {
          restoreUid(null);
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

  // if (localStatus.isLoading) {
  if (localStatus.isLoading) {
    return <LoadingModal visible />;
  }

  if (localStatus.uid === null) {
    return <AuthNavigator />;
  }
  return <MainNavigator />;
};

export default AuthLoadingScreen;
