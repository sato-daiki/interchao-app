import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import I18n from '../utils/I18n';

/* screens */
import PointScreenContainer from '../containers/PointScreenContainer';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import {
  HomeBottomParamList,
  HomeBottomNavigationProp,
} from './HomeBottomTabNavigator';

export type PointTabNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeBottomParamList, 'PointTab'>,
  HomeBottomNavigationProp
>;

export type PointTabStackParamList = {
  Point: undefined;
};

const PointTabStack = createStackNavigator<PointTabStackParamList>();

const PointTabNavigator = (): JSX.Element => {
  return (
    <PointTabStack.Navigator
      initialRouteName="Point"
      screenOptions={DefaultNavigationOptions}
    >
      <PointTabStack.Screen
        name="Point"
        component={PointScreenContainer}
        options={{ title: I18n.t('point.headerTitle') }}
      />
    </PointTabStack.Navigator>
  );
};

export default PointTabNavigator;
