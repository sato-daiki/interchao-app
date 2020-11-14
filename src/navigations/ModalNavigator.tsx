import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import {
  DefaultNavigationOptions,
  DefaultModalLayoutOptions,
} from '@/constants/NavigationOptions';
import I18n from '@/utils/I18n';
import { CountryCode, Diary, ThemeCategory, ThemeSubcategory } from '@/types';

/* screens */
import ReviewScreenContainer from '@/containers/ReviewScreenContainer';
import PostDiaryScreenContainer from '@/containers/PostDiaryScreenContainer';
import EditMyProfileScreenContainer from '@/containers/EditMyProfileScreenContainer';
import EditUserNameScreenContainer from '@/containers/EditUserNameScreenContainer';
import PostDraftDiaryScreenContainer from '@/containers/PostDraftDiaryScreenContainer';
import CorrectingScreenContainer from '@/containers/CorrectingScreenContainer';
import SelectDiaryTypeScreen from '@/screens/SelectDiaryTypeScreen';
import AboutScreen from '@/screens/About';
import RecordScreenContainer from '@/containers/RecordScreenContainer';
import EditCountryScreen from '@/screens/EditCountryScreen';
import EditMyDiaryListScreenContainer from '@/containers/EditMyDiaryListScreenContainer';
import SelectThemeSubcategoryScreenContainer from '@/containers/SelectThemeSubcategoryScreenContainer';
import { CallerThemeGuide } from '@/screens/SelectThemeSubcategoryScreen/interface';
// @ts-ignore
import ThemeGuideScreen from '@/screens/ThemeGuideScreen';
import { MainStackParamList } from './MainNavigator';

export type ModalEditMyDiaryListStackParamList = {
  EditMyDiaryList: undefined;
};
export type ModalThemeGuideStackParamList = {
  ThemeGuide: {
    themeCategory: ThemeCategory;
    themeSubcategory: ThemeSubcategory;
    caller: CallerThemeGuide;
  };
};
export type ModalSelectDiaryTypeStackParamList = {
  SelectDiaryType: undefined;
  // SelectCategory: undefined; // 大カテゴリー
  SelectThemeSubcategory: undefined; // 小カテゴリー
};
export type ModalPostDiaryStackParamList = {
  PostDiary: {
    themeCategory?: ThemeCategory;
    themeSubcategory?: ThemeSubcategory;
  };
};
export type ModalPostDiaryWebStackParamList = {
  PostDiaryWeb: {
    themeCategory?: ThemeCategory;
    themeSubcategory?: ThemeSubcategory;
  };
};
export type ModalPostDraftDiaryStackParamList = {
  PostDraftDiary: {
    item: Diary;
    objectID: string;
    themeCategory?: ThemeCategory;
    themeSubcategory?: ThemeSubcategory;
  };
};
export type ModalPostDraftDiaryWebStackParamList = {
  PostDraftDiaryWeb: {
    item: Diary;
    objectID: string;
    themeCategory?: ThemeCategory;
    themeSubcategory?: ThemeSubcategory;
  };
};
export type ModalEditMyProfileStackParamList = {
  EditMyProfile: undefined;
  EditUserName: { userName: string; setUserName: (text: string) => void };
  EditCountry: {
    nationalityCode: CountryCode | undefined;
    setNationalityCode: (nationalityCode: CountryCode) => void;
  };
};
export type ModalReviewStackParamList = {
  Review: {
    objectID: string;
    correctedNum: number;
    userName: string;
  };
};
export type ModalCorrectingStackParamList = {
  Correcting: { objectID: string; userName: string };
};
export type ModalRecordStackParamList = {
  Record: { objectID: string };
};
export type ModalAboutStackParamList = {
  About: undefined;
};

export type ModalEditMyDiaryListStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalEditMyDiaryList'
>;
export type ModalSelectDiaryTypeStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalSelectDiaryType'
>;
export type ModalThemeGuideStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalThemeGuide'
>;
export type ModalPostDiaryStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalPostDiary'
>;
export type ModalPostDiaryWebStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalPostDiaryWeb'
>;
export type ModalPostDraftDiaryStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalPostDraftDiary'
>;
export type ModalPostDraftDiaryWebStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalPostDraftDiaryWeb'
>;
export type ModalEditMyProfileStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalEditMyProfile'
>;
export type ModalReviewStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalReview'
>;
export type ModalCorrectingStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalCorrecting'
>;
export type ModaRecordStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalRecord'
>;
export type ModalAboutStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalAbout'
>;

const ModalEditMyDiaryListStack = createStackNavigator<
  ModalEditMyDiaryListStackParamList
>();
const ModalSelectDiaryTypeStack = createStackNavigator<
  ModalSelectDiaryTypeStackParamList
>();
const ModalThemeGuideStack = createStackNavigator<
  ModalThemeGuideStackParamList
>();
const ModalPostDiaryStack = createStackNavigator<
  ModalPostDiaryStackParamList
>();
const ModalPostDiaryWebStack = createStackNavigator<
  ModalPostDiaryWebStackParamList
>();
const ModalPostDraftDiaryStack = createStackNavigator<
  ModalPostDraftDiaryStackParamList
>();
const ModalPostDraftDiaryWebStack = createStackNavigator<
  ModalPostDraftDiaryWebStackParamList
>();
const ModalReviewStack = createStackNavigator<ModalReviewStackParamList>();
const ModalEditMyProfileStack = createStackNavigator<
  ModalEditMyProfileStackParamList
>();
const ModalCorrectingStack = createStackNavigator<
  ModalCorrectingStackParamList
>();
const ModalRecordStack = createStackNavigator<ModalRecordStackParamList>();
const ModalAboutStack = createStackNavigator<ModalAboutStackParamList>();

export const ModalEditMyDiaryListNavigator = (): JSX.Element => {
  return (
    <ModalEditMyDiaryListStack.Navigator initialRouteName="EditMyDiaryList">
      <ModalEditMyDiaryListStack.Screen
        name="EditMyDiaryList"
        component={EditMyDiaryListScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('editMyDiaryList.headerTitle'),
        }}
      />
    </ModalEditMyDiaryListStack.Navigator>
  );
};
export const ModalSelectDiaryTypeNavigator = (): JSX.Element => {
  return (
    <ModalSelectDiaryTypeStack.Navigator initialRouteName="SelectDiaryType">
      <ModalSelectDiaryTypeStack.Screen
        name="SelectDiaryType"
        component={SelectDiaryTypeScreen}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('selectDiaryType.headerTitle'),
        }}
      />
      <ModalSelectDiaryTypeStack.Screen
        name="SelectThemeSubcategory"
        component={SelectThemeSubcategoryScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('selectThemeSubcategory.headerTitle'),
        }}
      />
    </ModalSelectDiaryTypeStack.Navigator>
  );
};
export const ModalThemeGuideNavigator = (): JSX.Element => {
  return (
    <ModalThemeGuideStack.Navigator
      initialRouteName="ThemeGuide"
      headerMode="none"
    >
      <ModalThemeGuideStack.Screen
        name="ThemeGuide"
        component={ThemeGuideScreen}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
        }}
      />
    </ModalThemeGuideStack.Navigator>
  );
};
export const ModalPostDiaryNavigator = (): JSX.Element => {
  return (
    <ModalPostDiaryStack.Navigator initialRouteName="PostDiary">
      <ModalPostDiaryStack.Screen
        name="PostDiary"
        component={PostDiaryScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('postDiary.headerTitle'),
        }}
      />
    </ModalPostDiaryStack.Navigator>
  );
};

export const ModalPostDiaryWebNavigator = (): JSX.Element => {
  return (
    <ModalPostDiaryWebStack.Navigator initialRouteName="PostDiaryWeb">
      <ModalPostDiaryWebStack.Screen
        name="PostDiaryWeb"
        component={PostDiaryScreenContainer}
        options={{ title: 'Interchao' }}
      />
    </ModalPostDiaryWebStack.Navigator>
  );
};

export const ModalPostDraftDiaryNavigator = (): JSX.Element => {
  return (
    <ModalPostDraftDiaryStack.Navigator initialRouteName="PostDraftDiary">
      <ModalPostDraftDiaryStack.Screen
        name="PostDraftDiary"
        component={PostDraftDiaryScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('postDraftDiary.headerTitle'),
        }}
      />
    </ModalPostDraftDiaryStack.Navigator>
  );
};

export const ModalPostDraftDiaryWebNavigator = (): JSX.Element => {
  return (
    <ModalPostDraftDiaryWebStack.Navigator initialRouteName="PostDraftDiaryWeb">
      <ModalPostDraftDiaryWebStack.Screen
        name="PostDraftDiaryWeb"
        component={PostDraftDiaryScreenContainer}
        options={{ title: 'Interchao' }}
      />
    </ModalPostDraftDiaryWebStack.Navigator>
  );
};

export const ModalReviewNavigator = (): JSX.Element => {
  return (
    <ModalReviewStack.Navigator initialRouteName="Review">
      <ModalReviewStack.Screen
        name="Review"
        component={ReviewScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('review.headerTitle'),
        }}
      />
    </ModalReviewStack.Navigator>
  );
};

export const ModalEditMyProfileNavigator = (): JSX.Element => {
  return (
    <ModalEditMyProfileStack.Navigator
      initialRouteName="EditMyProfile"
      screenOptions={{
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <ModalEditMyProfileStack.Screen
        name="EditMyProfile"
        component={EditMyProfileScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('editMyProfile.headerTitle'),
        }}
      />
      <ModalEditMyProfileStack.Screen
        name="EditUserName"
        component={EditUserNameScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('editUserName.headerTitle'),
        }}
      />
      <ModalEditMyProfileStack.Screen
        name="EditCountry"
        component={EditCountryScreen}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('profileNationality.nationality'),
        }}
      />
    </ModalEditMyProfileStack.Navigator>
  );
};

export const ModalCorrectingNavigator = (): JSX.Element => {
  return (
    <ModalCorrectingStack.Navigator initialRouteName="Correcting">
      <ModalCorrectingStack.Screen
        name="Correcting"
        component={CorrectingScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('correcting.headerTitle'),
        }}
      />
    </ModalCorrectingStack.Navigator>
  );
};

export const ModalRecordNavigator = (): JSX.Element => {
  return (
    <ModalRecordStack.Navigator initialRouteName="Record">
      <ModalRecordStack.Screen
        name="Record"
        component={RecordScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('record.headerTitle'),
        }}
      />
    </ModalRecordStack.Navigator>
  );
};

export const ModalAboutNavigator = (): JSX.Element => {
  return (
    <ModalAboutStack.Navigator initialRouteName="About">
      <ModalAboutStack.Screen
        name="About"
        component={AboutScreen}
        options={{
          ...DefaultNavigationOptions,
          title: I18n.t('setting.about'),
        }}
      />
    </ModalAboutStack.Navigator>
  );
};
