import React from 'react';
import {
  DefaultAuthLayoutOptions,
  DefaultNavigationOptions,
} from '@/constants/NavigationOptions';
import ReminderSelectTimeScreenContainer from '@/containers/ReminderSelectTimeScreenContainer';
import PushSettingScreenContainer from '@/containers/PushSettingScreenContainer';
import ReminderInitialScreen from '@/screens/ReminderInitialScreen';
import ReminderSelectDayScreen from '@/screens/ReminderSelectDayScreen';
import { CheckedDay } from '@/screens/ReminderSelectTimeScreen';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import I18n from '@/utils/I18n';
import { RootStackParamList } from './RootNavigator';

export type OnboardingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

export type OnboardingStackParamList = {
  ReminderInitial: undefined;
  ReminderSelectTime: { caller: 'Onboarding' };
  ReminderSelectDay: {
    checkedDays: CheckedDay[];
    onChangeCheckedDays: (checkedDays: any) => void;
  };
  PushSetting: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = (): JSX.Element => {
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
