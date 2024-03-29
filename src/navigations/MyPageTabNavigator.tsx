import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import ReminderSelectDayScreen from '@/screens/ReminderSelectDayScreen';
import { CustomTimeInfo, FixDay } from '@/types';
import ReminderSelectTimeSettingScreenContainer from '@/containers/ReminderSelectTimeSettingScreenContainer';
import ReminderInitialSettingScreen from '@/screens/ReminderInitialScreen/ReminderInitialSettingScreen';
import I18n from '../utils/I18n';

/* screens */
import MyPageScreenContainer from '../containers/MyPageScreenContainer';
import SettingScreenContainer from '../containers/SettingScreenContainer';
import NoticeScreenContainer from '../containers/NoticeScreenContainer';
import EditEmailScreen from '../screens/EditEmailScreen';
import EditPasswordScreen from '../screens/EditPasswordScreen';
import RegisterEmailPasswordScreen from '../screens/RegisterEmailPasswordScreen';
import DeleteAcountScreenContainer from '../containers/DeleteAcountScreenContainer';
import ForegetPasswordScreen from '../screens/ForegetPasswordScreen';
import TutorialListScreenContainer from '../containers/TutorialListScreenContainer';
import InquiryScreenContainer from '../containers/InquiryScreenContainer';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { CommonStackParamList, createCommonNavigator } from './CommonNavigator';
import { HomeBottomParamList, HomeBottomNavigationProp } from './HomeBottomTabNavigator';

export type MyPageTabNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeBottomParamList, 'MyPageTab'>,
  HomeBottomNavigationProp
>;

export type MyPageTabStackParamList = {
  MyPage: undefined;
  Setting: undefined;
  TutorialList: undefined;
  Notice: undefined;
  Inquiry: undefined;
  EditEmail: undefined;
  EditPassword: undefined;
  RegisterEmailPassword: undefined;
  DeleteAcount: undefined;
  ForegetPassword: undefined;
  ReminderInitialSetting: undefined;
  ReminderSelectTimeSetting: undefined;
  ReminderSelectDay: {
    checkedDays: FixDay[] | CustomTimeInfo[];
    onChangeCheckedDays: (checkedDays: FixDay[] | CustomTimeInfo[]) => void;
  };
} & CommonStackParamList;

const MyPageTabStack = createStackNavigator<MyPageTabStackParamList>();

const MyPageTabNavigator = () => {
  return (
    <MyPageTabStack.Navigator initialRouteName='MyPage' screenOptions={DefaultNavigationOptions}>
      <MyPageTabStack.Screen
        name='MyPage'
        component={MyPageScreenContainer}
        options={{ title: I18n.t('myPage.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='Setting'
        component={SettingScreenContainer}
        options={{ title: I18n.t('setting.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='TutorialList'
        component={TutorialListScreenContainer}
        options={{ title: I18n.t('tutorialList.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='Notice'
        component={NoticeScreenContainer}
        options={{ title: I18n.t('notice.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='Inquiry'
        component={InquiryScreenContainer}
        options={{ title: I18n.t('inquiry.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='EditEmail'
        component={EditEmailScreen}
        options={{ title: I18n.t('editEmail.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='EditPassword'
        component={EditPasswordScreen}
        options={{ title: I18n.t('editPassword.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='RegisterEmailPassword'
        component={RegisterEmailPasswordScreen}
        options={{ title: I18n.t('registerEmailPassword.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='DeleteAcount'
        component={DeleteAcountScreenContainer}
        options={{ title: I18n.t('deleteAcount.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='ForegetPassword'
        component={ForegetPasswordScreen}
        options={{ title: I18n.t('foregetPassword.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='ReminderInitialSetting'
        component={ReminderInitialSettingScreen}
        options={{
          title: I18n.t('onboarding.reminderInitial'),
        }}
      />
      <MyPageTabStack.Screen
        name='ReminderSelectTimeSetting'
        component={ReminderSelectTimeSettingScreenContainer}
        options={{
          title: I18n.t('onboarding.reminderSelectTime'),
        }}
      />
      <MyPageTabStack.Screen
        name='ReminderSelectDay'
        component={ReminderSelectDayScreen}
        options={{
          title: I18n.t('onboarding.reminderSelectDay'),
        }}
      />
      {createCommonNavigator()}
    </MyPageTabStack.Navigator>
  );
};

export default MyPageTabNavigator;
