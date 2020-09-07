import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeBottomTabNavigator from './HomeBottomTabNavigator';

import { Diary } from '../types';
import {
  ModalPostDiaryNavigator,
  ModalPostDraftDiaryNavigator,
  ModalEditMyProfileNavigator,
  ModalReviewNavigator,
  ModalCorrectingNavigator,
} from './ModalNavigator';

export type MainStackParamList = {
  Home: { screen: string; params: { screen: string } };
  ModalPostDiary: { screen: string };
  ModalPostDraftDiary: { screen: string; params: { item: Diary } };
  ModalEditMyProfile: { screen: string };
  ModalCorrecting: { screen: string; params: { objectID: string } };
  ModalReview: {
    screen: string;
    params: { objectID: string; correctedNum: number };
  };
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainNavigator = (): JSX.Element => {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      headerMode="none"
      mode="modal"
      screenOptions={{
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <MainStack.Screen name="Home" component={HomeBottomTabNavigator} />
      <MainStack.Screen
        name="ModalPostDiary"
        component={ModalPostDiaryNavigator}
      />
      <MainStack.Screen
        name="ModalPostDraftDiary"
        component={ModalPostDraftDiaryNavigator}
      />
      <MainStack.Screen name="ModalReview" component={ModalReviewNavigator} />
      <MainStack.Screen
        name="ModalEditMyProfile"
        component={ModalEditMyProfileNavigator}
      />
      <MainStack.Screen
        name="ModalCorrecting"
        component={ModalCorrectingNavigator}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
