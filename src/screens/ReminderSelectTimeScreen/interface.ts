import { ReminderSelectTimeProps } from '@/components/organisms/ReminderSelectTime/ReminderSelectTime';
import { MyPageTabStackParamList } from '@/navigations/MyPageTabNavigator';
import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';
import { CustomTimeInfo, FixDay, FixTimeInfo, User } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

export type ReminderSelectTimeOnboardingNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'ReminderSelectTimeOnboarding'
>;

export type ReminderSelectTimeOnboardingScreenType = {
  navigation: ReminderSelectTimeOnboardingNavigationProp;
} & Props &
  DispatchProps;

export type ReminderSelectTimeSettingNavigationProp = StackNavigationProp<
  MyPageTabStackParamList,
  'ReminderSelectTimeSetting'
>;

export type ReminderSelectTimeSettingScreenType = {
  navigation: ReminderSelectTimeSettingNavigationProp;
} & Props &
  DispatchProps;

export type DefaultInfo = Pick<
  ReminderSelectTimeProps,
  | 'defaultReminderType'
  | 'defaultNotificationStart'
  | 'defaultNotificationEnd'
  | 'defaultFixDays'
  | 'defaultFixTimeInfo'
  | 'defaultCuctomTimeInfos'
>;

export const initFixDays: FixDay[] = [...Array(7)].map((_, i) => {
  return {
    day: i,
    checked: true,
  };
});

export const initFixTimeInfo: FixTimeInfo = {
  timeStart: new Date(2000, 1, 1, 20, 0, 0),
  timeEnd: new Date(2000, 1, 1, 21, 0, 0),
  isFocus: false,
};

export const initCuctomTimeInfos: CustomTimeInfo[] = [...Array(7)].map(
  (_, i) => {
    return {
      day: i,
      checked: true,
      timeStart: new Date(2000, 1, 1, 20, 0, 0),
      timeEnd: new Date(2000, 1, 1, 21, 0, 0),
      isFocus: false,
    };
  }
);
