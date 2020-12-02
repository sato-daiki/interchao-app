import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import I18n from '@/utils/I18n';
import ReminderInitialScreen from '@/screens/ReminderInitialScreen';
import PushSettingScreen from '@/screens/PushSettingScreen';
import ReminderSelectDayScreen from '@/screens/ReminderSelectDayScreen';
import ReminderSelectTimeScreenContainer from '@/containers/ReminderSelectTimeScreenContainer';
import {
  DefaultAuthLayoutOptions,
  DefaultNavigationOptions,
} from '@/constants/NavigationOptions';
import { CheckedDay } from '@/screens/ReminderSelectTimeScreen';

export type OnboardingStackParamList = {
  ReminderInitial: undefined;
  ReminderSelectTime: undefined;
  ReminderSelectDay: {
    checkedDays: CheckedDay[];
    onChangeCheckedDays: (checkedDays: any) => void;
  };
  PushSetting: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="ReminderInitial"
      screenOptions={{
        ...DefaultNavigationOptions,
      }}
    >
      <Stack.Screen
        name="ReminderInitial"
        component={ReminderInitialScreen}
        options={{
          title: I18n.t('onboarding.reminderInitial'),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReminderSelectTime"
        component={ReminderSelectTimeScreenContainer}
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
        component={PushSettingScreen}
        options={{ title: I18n.t('onboarding.pushSetting') }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
