import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { getUser } from '../utils/user';
import { getProfile } from '../utils/profile';
import { setAnalyticsUser } from '../utils/Analytics';
import { Profile, User, LocalStatus } from '../types';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import PublicNavigator from './PublicNavigator';
import LoadingScreen from '../screens/LoadingScreen';

export type RootStackParamList = {
  Loading: undefined;
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

  const Stack = createStackNavigator<RootStackParamList>();

  const renderScreen = (): JSX.Element => {
    if (localStatus.isLoading) {
      return <Stack.Screen name="Loading" component={LoadingScreen} />;
    }
    if (localStatus.uid !== null) {
      return <Stack.Screen name="Main" component={MainNavigator} />;
    }
    return <Stack.Screen name="Auth" component={AuthNavigator} />;
  };

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
      {/* <Stack.Screen name="Public" component={PublicNavigator} /> */}
    </Stack.Navigator>
  );
};

export default RootNavigator;
