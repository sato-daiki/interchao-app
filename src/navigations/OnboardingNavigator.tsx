import React from 'react';
import {
  DefaultAuthLayoutOptions,
  DefaultNavigationOptions,
} from '@/constants/NavigationOptions';
import ReminderInitialOnboardingScreen from '@/screens/ReminderInitialScreen/ReminderInitialOnboardingScreen';
import ReminderSelectTimeOwnbordingScreenContainer from '@/containers/ReminderSelectTimeOwnbordingScreenContainer';
import PushSettingScreenContainer from '@/containers/PushSettingScreenContainer';
import ReminderSelectDayScreen from '@/screens/ReminderSelectDayScreen';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import I18n from '@/utils/I18n';
import { CustomTimeInfo, FixDay } from '@/types';
import { RootStackParamList } from './RootNavigator';

export type OnboardingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

export type OnboardingStackParamList = {
  ReminderInitialOnboarding: undefined;
  ReminderSelectTimeOnboarding: undefined;
  ReminderSelectDay: {
    checkedDays: FixDay[] | CustomTimeInfo[];
    onChangeCheckedDays: (checkedDays: FixDay[] | CustomTimeInfo[]) => void;
  };
  PushSetting: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="ReminderInitialOnboarding"
      screenOptions={{
        ...DefaultNavigationOptions,
      }}
    >
      <Stack.Screen
        name="ReminderInitialOnboarding"
        component={ReminderInitialOnboardingScreen}
        options={{
          title: I18n.t('onboarding.reminderInitial'),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReminderSelectTimeOnboarding"
        component={ReminderSelectTimeOwnbordingScreenContainer}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('onboarding.reminderSelectTime'),
        }}
      />
      <Stack.Screen
        name="ReminderSelectDay"
        component={ReminderSelectDayScreen}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('onboarding.reminderSelectDay'),
        }}
      />
      <Stack.Screen
        name="PushSetting"
        component={PushSettingScreenContainer}
        options={{
          title: I18n.t('onboarding.pushSetting'),
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
