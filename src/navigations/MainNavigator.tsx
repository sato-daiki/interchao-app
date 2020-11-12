import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { SubcatergoryInfo } from '@/screens/SelectSubcategoryScreen/interface';
import HomeBottomTabNavigator, {
  HomeBottomParamList,
} from './HomeBottomTabNavigator';

import { Diary } from '../types';
import {
  ModalEditMyDiaryListNavigator,
  ModalPostDiaryNavigator,
  ModalPostDraftDiaryNavigator,
  ModalEditMyProfileNavigator,
  ModalReviewNavigator,
  ModalCorrectingNavigator,
  ModalEditMyDiaryListStackParamList,
  ModalPostDiaryStackParamList,
  ModalPostDiaryWebStackParamList,
  ModalPostDraftDiaryStackParamList,
  ModalPostDraftDiaryWebStackParamList,
  ModalEditMyProfileStackParamList,
  ModalCorrectingStackParamList,
  ModalReviewStackParamList,
  ModalAboutNavigator,
  ModalAboutStackParamList,
  ModalRecordNavigator,
  ModalRecordStackParamList,
  ModalPostDiaryWebNavigator,
  ModalPostDraftDiaryWebNavigator,
  ModalSelectPostTypeStackParamList,
  ModalSelectPostTypeNavigator,
} from './ModalNavigator';
import { MyDiaryTabStackParamList } from './MyDiaryTabNavigator';
import { TeachDiaryTabStackParamList } from './TeachDiaryTabNavigator';
import { maxMain } from '../styles/Common';
import { RootStackParamList } from './RootNavigator';

export type MainNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>;

export type MainStackParamList = {
  Home: {
    screen: keyof HomeBottomParamList;
    params: {
      screen:
        | keyof MyDiaryTabStackParamList
        | keyof TeachDiaryTabStackParamList;
    };
  };
  ModalEditMyDiaryList: {
    screen: keyof ModalEditMyDiaryListStackParamList;
  };
  ModalSelectPostType: {
    screen: keyof ModalSelectPostTypeStackParamList;
  };
  ModalPostDiary: {
    screen: keyof ModalPostDiaryStackParamList;
    params?: { subcatergoryInfo?: SubcatergoryInfo };
  };
  ModalPostDiaryWeb: { screen: keyof ModalPostDiaryWebStackParamList };
  ModalPostDraftDiary: {
    screen: keyof ModalPostDraftDiaryStackParamList;
    params: { item: Diary; objectID: string };
  };
  ModalPostDraftDiaryWeb: {
    screen: keyof ModalPostDraftDiaryWebStackParamList;
    params: { item: Diary; objectID: string };
  };
  ModalEditMyProfile: { screen: keyof ModalEditMyProfileStackParamList };
  ModalCorrecting: {
    screen: keyof ModalCorrectingStackParamList;
    params: { objectID: string; userName: string };
  };
  ModalReview: {
    screen: keyof ModalReviewStackParamList;
    params: {
      objectID: string;
      correctedNum: number;
      userName: string;
    };
  };
  ModalRecord: {
    screen: keyof ModalRecordStackParamList;
    params: { objectID: string };
  };
  ModalAbout: { screen: keyof ModalAboutStackParamList };
  // NotFound: undefined;
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
          marginHorizontal: 'auto',
          flex: 1,
          width: '100%',
          maxWidth: maxMain,
        },
      }}
    >
      <MainStack.Screen name="Home" component={HomeBottomTabNavigator} />
      <MainStack.Screen
        name="ModalEditMyDiaryList"
        component={ModalEditMyDiaryListNavigator}
      />
      <MainStack.Screen
        name="ModalSelectPostType"
        component={ModalSelectPostTypeNavigator}
      />
      <MainStack.Screen
        name="ModalPostDiary"
        component={ModalPostDiaryNavigator}
      />
      <MainStack.Screen
        name="ModalPostDiaryWeb"
        component={ModalPostDiaryWebNavigator}
      />
      <MainStack.Screen
        name="ModalPostDraftDiary"
        component={ModalPostDraftDiaryNavigator}
      />
      <MainStack.Screen
        name="ModalPostDraftDiaryWeb"
        component={ModalPostDraftDiaryWebNavigator}
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
      <MainStack.Screen name="ModalRecord" component={ModalRecordNavigator} />
      <MainStack.Screen name="ModalAbout" component={ModalAboutNavigator} />
      {/* <MainStack.Screen name="NotFound" component={NotFoundScreen} /> */}
    </MainStack.Navigator>
  );
};

export default MainNavigator;
