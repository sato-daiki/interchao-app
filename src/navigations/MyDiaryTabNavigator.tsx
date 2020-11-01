import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import I18n from '../utils/I18n';

/* screens */
import MyDiaryListScreenContainer from '../containers/MyDiaryListScreenContainer';
import DraftDiaryListScreenContainer from '../containers/DraftDiaryListScreenContainer';
import MyDiaryScreenContainer from '../containers/MyDiaryScreenContainer';
import MyDiarySerchScreenContainer from '../containers/MyDiarySearchScreenContainer';
import {
  DefaultNavigationOptions,
  DefaultSearchBarOptions,
} from '../constants/NavigationOptions';
import { createCommonNavigator, CommonStackParamList } from './CommonNavigator';
import {
  HomeBottomParamList,
  HomeBottomNavigationProp,
} from './HomeBottomTabNavigator';
import WebViewScreen from '../screens/WebViewScreen';

export type MyDiaryTabNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeBottomParamList, 'MyDiaryTab'>,
  HomeBottomNavigationProp
>;

export type MyDiaryTabStackParamList = {
  MyDiaryList: undefined;
  MyDiarySearch: undefined;
  MyDiary: { objectID: string; userName: string };
  RecommendedMethod: { url: string };
} & CommonStackParamList;

const MyDiaryTabStack = createStackNavigator<MyDiaryTabStackParamList>();

const MyDiaryTabNavigator = (): JSX.Element => {
  return (
    <MyDiaryTabStack.Navigator
      initialRouteName="MyDiaryList"
      screenOptions={DefaultNavigationOptions}
    >
      <MyDiaryTabStack.Screen
        name="MyDiaryList"
        component={MyDiaryListScreenContainer}
        options={{
          ...DefaultSearchBarOptions,
          title: I18n.t('myDiaryList.headerTitle'),
        }}
      />
      <MyDiaryTabStack.Screen
        name="MyDiarySearch"
        component={MyDiarySerchScreenContainer}
        options={{
          headerShown: false,
          title: I18n.t('myDiaryList.searchText'),
        }}
      />
      <MyDiaryTabStack.Screen
        name="MyDiary"
        component={MyDiaryScreenContainer}
      />
      <MyDiaryTabStack.Screen
        name="RecommendedMethod"
        component={WebViewScreen}
        options={{ title: I18n.t('myDiary.recommend') }}
      />
      {createCommonNavigator()}
    </MyDiaryTabStack.Navigator>
  );
};

export default MyDiaryTabNavigator;
