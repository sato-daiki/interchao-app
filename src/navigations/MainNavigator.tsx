import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/* screens */
import ReviewScreenContainer from '../containers/ReviewScreenContainer';
import PostDiaryScreenContainer from '../containers/PostDiaryScreenContainer';
import EditMyProfileScreenContainer from '../containers/EditMyProfileScreenContainer';
import EditUserNameScreenContainer from '../containers/EditUserNameScreenContainer';
import PostDraftDiaryScreenContainer from '../containers/PostDraftDiaryScreenContainer';
import CorrectingScreenContainer from '../containers/CorrectingScreenContainer';
import {
  DefaultNavigationOptions,
  DefaultModalLayoutOptions,
} from '../constants/NavigationOptions';
import HomeBottomTabNavigator from './HomeBottomTabNavigator';
import I18n from '../utils/I18n';

import { Diary } from '../types';

export type MainStackParamList = {
  Home: undefined;
  ModalPostDiary: undefined;
  ModalEditMyProfile: undefined;
  ModalEditUserName: { userName: string; setUserName: (text: string) => void };
  ModalPostDraftDiary: { item: Diary };
  ModalCorrecting: { objectID: string };
  ModalReview: { objectID: string; correctedNum: number };
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainNavigator = (): JSX.Element => {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      // headerMode="none"
      mode="modal"
      screenOptions={{
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <MainStack.Screen
        name="Home"
        component={HomeBottomTabNavigator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ModalPostDiary"
        component={PostDiaryScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('postDiary.headerTitle'),
        }}
      />
      <MainStack.Screen
        name="ModalPostDraftDiary"
        component={PostDraftDiaryScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('postDraftDiary.headerTitle'),
        }}
      />
      <MainStack.Screen
        name="ModalReview"
        component={ReviewScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('review.headerTitle'),
        }}
      />
      <MainStack.Screen
        name="ModalEditMyProfile"
        component={EditMyProfileScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('editMyProfile.headerTitle'),
        }}
      />
      <MainStack.Screen
        name="ModalEditUserName"
        component={EditUserNameScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('editUserName.headerTitle'),
        }}
      />
      <MainStack.Screen
        name="ModalCorrecting"
        component={CorrectingScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('correcting.headerTitle'),
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
