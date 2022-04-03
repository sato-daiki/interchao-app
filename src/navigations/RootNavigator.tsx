import React, { useCallback, useEffect, useState } from 'react';
import firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { getUser } from '@/utils/user';
import { getProfile } from '@/utils/profile';
import { Profile, User, LocalStatus } from '@/types';

import LoadingScreen from '@/screens/LoadingScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import OnboardingNavigator from './OnboardingNavigator';

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  Main: undefined;
  Auth: undefined;
  Public: undefined;
};

export interface Props {
  localStatus: LocalStatus;
}

interface DispatchProps {
  setUser: (user: User) => void;
  setProfile: (profile: Profile) => void;
  restoreUid: (uid: string | null, onboarding?: boolean) => void;
}

const RootNavigator: React.FC<Props & DispatchProps> = ({
  localStatus,
  setUser,
  setProfile,
  restoreUid,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const initNavigation = useCallback(
    async (authUser: firebase.User | null): Promise<void> => {
      console.log('initNavigation');
      if (authUser) {
        const newUser = await getUser(authUser.uid);
        console.log('newUser', newUser);
        const newProfile = await getProfile(authUser.uid);
        if (newUser && newProfile) {
          setUser(newUser);
          setProfile(newProfile);
          restoreUid(authUser.uid, newUser.onboarding);
        }
      } else {
        restoreUid(null, false);
      }
      if (isLoading) setIsLoading(false);
    },
    [isLoading, restoreUid, setProfile, setUser],
  );

  useEffect(() => {
    const authSubscriber = firebase.auth().onAuthStateChanged(initNavigation);
    return authSubscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Stack = createStackNavigator<RootStackParamList>();

  const renderScreen = useCallback(() => {
    console.log(
      `[renderScreen] isLoading:${localStatus.isLoading}, onboarding:${localStatus.onboarding}, uid:${localStatus.uid}`,
    );
    if (localStatus.isLoading) {
      return <Stack.Screen name='Loading' component={LoadingScreen} />;
    }
    if (localStatus.uid !== null) {
      if (localStatus.onboarding === false && Platform.OS !== 'web') {
        return (
          <Stack.Screen name='Onboarding' component={OnboardingNavigator} />
        );
      }
      return <Stack.Screen name='Main' component={MainNavigator} />;
    }
    return <Stack.Screen name='Auth' component={AuthNavigator} />;
  }, [Stack, localStatus.isLoading, localStatus.onboarding, localStatus.uid]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      {renderScreen()}
    </Stack.Navigator>
  );
};

export default RootNavigator;
