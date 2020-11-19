import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import I18n from '@/utils/I18n';
import ReminderInitialScreen from '@/screens/ReminderInitialScreen';
import PushSettingScreen from '@/screens/PushSettingScreen';
import ReminderSelectDayScreen from '@/screens/ReminderSelectDayScreen';
import ReminderSelectTimeScreen from '@/screens/ReminderSelectTimeScreen';
import ReminderFixCustomTimeScreen from '@/screens/ReminderFixCustomTimeScreen';
import ReminderFreeCustomScreen from '@/screens/ReminderFreeCustomScreen';

export type OnboardingStackParamList = {
  ReminderInitial: undefined;
  ReminderSelectDay: undefined;
  ReminderSelectTime: undefined;
  ReminderFixCustomTime: undefined;
  ReminderFreeCustom: undefined;
  PushSetting: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="ReminderInitial">
      <Stack.Screen
        name="ReminderInitial"
        component={ReminderInitialScreen}
        options={{ title: I18n.t('onboarding.reminderInitial') }}
      />
      <Stack.Screen
        name="ReminderSelectDay"
        component={ReminderSelectDayScreen}
        options={{ title: I18n.t('onboarding.reminderSelectDay') }}
      />
      <Stack.Screen
        name="ReminderSelectTime"
        component={ReminderSelectTimeScreen}
        options={{ title: I18n.t('onboarding.reminderSelectTime') }}
      />
      <Stack.Screen
        name="ReminderFixCustomTime"
        component={ReminderFixCustomTimeScreen}
        options={{ title: I18n.t('onboarding.reminderFixCustomTime') }}
      />
      <Stack.Screen
        name="ReminderFreeCustom"
        component={ReminderFreeCustomScreen}
        options={{ title: I18n.t('onboarding.reminderFreeCustom') }}
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
