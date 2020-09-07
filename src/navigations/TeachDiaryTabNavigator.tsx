import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

/* screens */
import { CompositeNavigationProp } from '@react-navigation/native';
import TeachDiaryListScreenContainer from '../containers/TeachDiaryListScreenContainer';
import TeachDiaryScreenContainer from '../containers/TeachDiaryScreenContainer';
import TeachDiarySearchScreenContainer from '../containers/TeachDiarySearchScreenContainer';
import {
  DefaultNavigationOptions,
  DefaultSearchBarOptions,
  DefaultDiaryOptions,
} from '../constants/NavigationOptions';
import { CommonStackParamList, createCommonNavigator } from './CommonNavigator';
import {
  HomeBottomParamList,
  HomeBottomNavigationProp,
} from './HomeBottomTabNavigator';

export type TeachDiaryTabNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeBottomParamList, 'TeachDiaryTab'>,
  HomeBottomNavigationProp
>;

export type TeachDiaryTabStackParamList = {
  TeachDiaryList: undefined;
  TeachDiarySearch: undefined;
  TeachDiary: { objectID: string };
  Common: undefined;
} & CommonStackParamList;

const TeachDiaryTabStack = createStackNavigator<TeachDiaryTabStackParamList>();

const TeachDiaryTabNavigator = (): JSX.Element => {
  return (
    <TeachDiaryTabStack.Navigator
      initialRouteName="TeachDiaryList"
      screenOptions={DefaultNavigationOptions}
    >
      <TeachDiaryTabStack.Screen
        name="TeachDiaryList"
        component={TeachDiaryListScreenContainer}
        options={DefaultSearchBarOptions}
      />
      <TeachDiaryTabStack.Screen
        name="TeachDiarySearch"
        component={TeachDiarySearchScreenContainer}
        options={{ headerShown: false }}
      />
      <TeachDiaryTabStack.Screen
        name="TeachDiary"
        component={TeachDiaryScreenContainer}
        options={DefaultDiaryOptions}
      />
      {createCommonNavigator()}
    </TeachDiaryTabStack.Navigator>
  );
};

export default TeachDiaryTabNavigator;
