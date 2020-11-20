import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import I18n from '@/utils/I18n';
import ReminderInitialScreen from '@/screens/ReminderInitialScreen';
import PushSettingScreen from '@/screens/PushSettingScreen';
import ReminderSelectDayScreenContainer from '@/containers/ReminderSelectDayScreenContainer';
import ReminderSelectTimeScreenContainer from '@/containers/ReminderSelectTimeScreenContainer';
import ReminderFixCustomTimeScreen from '@/screens/ReminderFixCustomTimeScreen';
import ReminderFreeCustomScreen from '@/screens/ReminderFreeCustomScreen';
import {
  DefaultAuthLayoutOptions,
  DefaultNavigationOptions,
} from '@/constants/NavigationOptions';

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
        name="ReminderSelectDay"
        component={ReminderSelectDayScreenContainer}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('onboarding.reminderSelectDay'),
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
        name="ReminderFixCustomTime"
        component={ReminderFixCustomTimeScreen}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('onboarding.reminderFixCustomTime'),
        }}
      />
      <Stack.Screen
        name="ReminderFreeCustom"
        component={ReminderFreeCustomScreen}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('onboarding.reminderFreeCustom'),
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
