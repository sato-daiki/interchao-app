import React, { useCallback, useEffect, useState } from 'react';
import firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { getUser } from '@/utils/user';
import { getProfile } from '@/utils/profile';
import { setAnalyticsUser } from '@/utils/Analytics';
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
  restoreUid: (uid: string | null) => void;
}

const RootNavigator: React.FC<Props & DispatchProps> = ({
  localStatus,
  setUser,
  setProfile,
  restoreUid,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  const initNavigation = useCallback(
    async (authUser: firebase.User | null): Promise<void> => {
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
    },
    [isLoading, restoreUid, setProfile, setUser]
  );

  useEffect(() => {
    const authSubscriber = firebase.auth().onAuthStateChanged(initNavigation);
    return authSubscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Stack = createStackNavigator<RootStackParamList>();

  const renderScreen = useCallback(() => {
    if (localStatus.isLoading) {
      return <Stack.Screen name="Loading" component={LoadingScreen} />;
    }
    // if (localStatus.uid !== null) {
    // if (localStatus.onboarding) {
    return <Stack.Screen name="Onboarding" component={OnboardingNavigator} />;
    // }
    // return <Stack.Screen name="Main" component={MainNavigator} />;
    // }
    return <Stack.Screen name="Auth" component={AuthNavigator} />;
  }, [localStatus.isLoading, localStatus.uid]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {renderScreen()}
    </Stack.Navigator>
  );
};

export default RootNavigator;
