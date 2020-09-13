import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeBottomTabNavigator, {
  HomeBottomParamList,
} from './HomeBottomTabNavigator';

import { Diary } from '../types';
import {
  ModalPostDiaryNavigator,
  ModalPostDraftDiaryNavigator,
  ModalEditMyProfileNavigator,
  ModalReviewNavigator,
  ModalCorrectingNavigator,
  ModalPostDiaryStackParamList,
  ModalPostDraftDiaryStackParamList,
  ModalEditMyProfileStackParamList,
  ModalCorrectingStackParamList,
  ModalReviewStackParamList,
} from './ModalNavigator';
import { MyDiaryTabStackParamList } from './MyDiaryTabNavigator';
import { TeachDiaryTabStackParamList } from './TeachDiaryTabNavigator';
import NotFoundScreen from '../screens/NotFoundScreen';

export type MainStackParamList = {
  Home: {
    screen: keyof HomeBottomParamList;
    params: {
      screen:
        | keyof MyDiaryTabStackParamList
        | keyof TeachDiaryTabStackParamList;
    };
  };
  ModalPostDiary: { screen: keyof ModalPostDiaryStackParamList };
  ModalPostDraftDiary: {
    screen: keyof ModalPostDraftDiaryStackParamList;
    params: { item: Diary; objectID: string };
  };
  ModalEditMyProfile: { screen: keyof ModalEditMyProfileStackParamList };
  ModalCorrecting: {
    screen: keyof ModalCorrectingStackParamList;
    params: { objectID: string; userName: string };
  };
  ModalReview: {
    screen: keyof ModalReviewStackParamList;
    params: { objectID: string; correctedNum: number; userName: string };
  };
  NotFound: undefined;
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
      <MainStack.Screen name="NotFound" component={NotFoundScreen} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
