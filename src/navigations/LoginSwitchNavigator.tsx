import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { User } from '../types';
import { State } from '../types/state';
import firebase from '../constants/firebase';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { LoadingModal } from '../components/atoms';
import AuthLoadingScreenContainer from '../containers/AuthLoadingScreenContainer';
import { getUser } from '../utils/user';
import { getProfile } from '../utils/profile';

type LoginSwitchProps = {
  user: User;
};

const LoginSwitch: React.FC<LoginSwitchProps> = (): JSX.Element => {
  const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState<firebase.User | null>(null);

  const initNavigation = (authUser: firebase.User | null): void => {
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
          navigation.navigate('MainTab');
        } else {
          // ここに入る場合エラーどうするか;
        }
      } else {
        navigation.navigate('Auth');
      }
    };
    f();
    setUser(result);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const authSubscriber = firebase.auth().onAuthStateChanged(initNavigation);

    // unsubscribe on unmount
    return authSubscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return <AuthLoadingScreenContainer />;
  }

  if (!user) {
    return <AuthNavigator />;
  }
  return <MainTabNavigator />;
};

export default LoginSwitch;
