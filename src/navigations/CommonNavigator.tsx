import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import I18n from '../utils/I18n';

/* screens */
import UserProfileScreen from '../screens/UserProfileScreen';
import ReviewListScreenContainer from '../containers/ReviewListScreenContainer';
import UserDiaryScreenContainer from '../containers/UserDiaryScreenContainer';
import {
  HomeBottomNavigationProp,
  HomeBottomParamList,
} from './HomeBottomTabNavigator';

export type CommonNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeBottomParamList>,
  HomeBottomNavigationProp
>;

export type CommonStackParamList = {
  UserProfile: { uid: string };
  UserDiary: { objectID: string };
  ReviewList: { uid: string };
};

const CommonStack = createStackNavigator<CommonStackParamList>();

export const createCommonNavigator = (): JSX.Element => {
  return (
    <>
      <CommonStack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{ title: I18n.t('userProfile.headerTitle') }}
      />
      <CommonStack.Screen
        name="UserDiary"
        component={UserDiaryScreenContainer}
        options={{ title: I18n.t('teachDiary.headerTitle') }}
      />
      <CommonStack.Screen
        name="ReviewList"
        component={ReviewListScreenContainer}
        options={{ title: I18n.t('teachDiary.headerTitle') }}
      />
    </>
  );
};
