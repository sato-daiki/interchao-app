import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackScreenProps,
  StackNavigationProp,
} from '@react-navigation/stack';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { mainColor } from '../styles/Common';
import I18n from '../utils/I18n';
import { TabIcon, TabLabel } from '../components/molecules';

/* screens */
import MyDiaryListScreenContainer from '../containers/MyDiaryListScreenContainer';
import DraftDiaryListScreen from '../screens/DraftDiaryListScreen';
import PostDiaryScreen from '../screens/PostDiaryScreen';
import ReviewScreenContainer from '../containers/ReviewScreenContainer';
import PostDiaryScreenContainer from '../containers/PostDiaryScreenContainer';
import TeachDiaryListScreenContainer from '../containers/TeachDiaryListScreenContainer';
import MyDiaryScreenContainer from '../containers/MyDiaryScreenContainer';
import TeachDiaryScreenContainer from '../containers/TeachDiaryScreenContainer';
import MyPageScreenContainer from '../containers/MyPageScreenContainer';
import UserProfileScreen from '../screens/UserProfileScreen';
import EditMyProfileScreenContainer from '../containers/EditMyProfileScreenContainer';
import SettingScreen from '../screens/SettingScreen';
import NoticeScreenContainer from '../containers/NoticeScreenContainer';
import EditEmailScreen from '../screens/EditEmailScreen';
import EditPasswordScreen from '../screens/EditPasswordScreen';
import RegisterEmailPasswordScreen from '../screens/RegisterEmailPasswordScreen';
import EditUserNameScreenContainer from '../containers/EditUserNameScreenContainer';
import PostDraftDiaryScreenContainer from '../containers/PostDraftDiaryScreenContainer';
import CorrectingScreenContainer from '../containers/CorrectingScreenContainer';
import DeleteAcountScreen from '../screens/DeleteAcountScreen';
import ForegetPasswordScreen from '../screens/ForegetPasswordScreen';
import MyDiarySerchScreen from '../screens/MyDiarySearchScreen';
import TeachDiarySearchScreenContainer from '../containers/TeachDiarySearchScreenContainer';
import ReviewListScreenContainer from '../containers/ReviewListScreenContainer';
import TutorialListScreenContainer from '../containers/TutorialListScreenContainer';
import InquiryScreenContainer from '../containers/InquiryScreenContainer';
import UserDiaryScreenContainer from '../containers/UserDiaryScreenContainer';
import createSidebarNavigator from './SidebarTabNavigator';
import {
  DefaultNavigationOptions,
  DefaultSearchBarOptions,
  DefaultDiaryOptions,
  DefaultModalLayoutOptions,
} from '../constants/NavigationOptions';
import { Diary } from '../types';

export type ModalPostDiaryStackParamList = {
  ModalPostDiary: undefined;
};
const ModalPostDiaryStack = createStackNavigator<
  ModalPostDiaryStackParamList
>();
const ModalPostDiaryNavigator = (): JSX.Element => {
  return (
    <ModalPostDiaryStack.Navigator
      screenOptions={{
        ...DefaultNavigationOptions,
        ...DefaultModalLayoutOptions,
      }}
    >
      <ModalPostDiaryStack.Screen
        name="ModalPostDiary"
        component={PostDiaryScreenContainer}
        options={{ title: I18n.t('postDiary.headerTitle') }}
      />
    </ModalPostDiaryStack.Navigator>
  );
};

export type ModalPostDraftDiaryStackParamList = {
  PostDraftDiary: { item: Diary };
};
const ModalPostDraftDiaryStack = createStackNavigator();
const ModalPostDraftDiaryNavigator = (): JSX.Element => {
  return (
    <ModalPostDraftDiaryStack.Navigator
      screenOptions={{
        ...DefaultNavigationOptions,
        ...DefaultModalLayoutOptions,
      }}
    >
      <ModalPostDraftDiaryStack.Screen
        name="PostDraftDiary"
        component={PostDraftDiaryScreenContainer}
        options={{ title: I18n.t('postDraftDiary.headerTitle') }}
      />
    </ModalPostDraftDiaryStack.Navigator>
  );
};

export type ModalReviewStackParamList = {
  Review: { objectID: string; correctedNum: number };
};
const ModalReviewStack = createStackNavigator<ModalReviewStackParamList>();
const ModalReviewNavigator = (): JSX.Element => {
  return (
    <ModalReviewStack.Navigator
      screenOptions={{
        ...DefaultNavigationOptions,
        ...DefaultModalLayoutOptions,
      }}
    >
      <ModalReviewStack.Screen
        name="Review"
        component={ReviewScreenContainer}
        options={{ title: I18n.t('review.headerTitle') }}
      />
    </ModalReviewStack.Navigator>
  );
};

export type ModalCorrectingStackParamList = {
  Correcting: { objectID: string };
};
const ModalCorrectingStack = createStackNavigator<
  ModalCorrectingStackParamList
>();
const ModalCorrectingNavigator = (): JSX.Element => {
  return (
    <ModalCorrectingStack.Navigator
      screenOptions={{
        ...DefaultNavigationOptions,
        ...DefaultModalLayoutOptions,
        gestureEnabled: false,
      }}
    >
      <ModalCorrectingStack.Screen
        name="Correcting"
        component={CorrectingScreenContainer}
        options={{ title: I18n.t('correcting.headerTitle') }}
      />
    </ModalCorrectingStack.Navigator>
  );
};

export type ModalEditMyProfileStackParamList = {
  EditMyProfile: undefined;
  EditUserName: { userName: string; setUserName: (text: string) => void };
};
const ModalEditMyProfileStack = createStackNavigator<
  ModalEditMyProfileStackParamList
>();
const ModalEditMyProfileNavigator = (): JSX.Element => {
  return (
    <ModalEditMyProfileStack.Navigator
      initialRouteName="EditMyProfile"
      screenOptions={{
        ...DefaultNavigationOptions,
        ...DefaultModalLayoutOptions,
      }}
    >
      <ModalEditMyProfileStack.Screen
        name="EditMyProfile"
        component={EditMyProfileScreenContainer}
        options={{ title: I18n.t('editMyProfile.headerTitle') }}
      />
      <ModalEditMyProfileStack.Screen
        name="EditUserName"
        component={EditUserNameScreenContainer}
        options={{ title: I18n.t('editUserName.headerTitle') }}
      />
    </ModalEditMyProfileStack.Navigator>
  );
};

export type CommonStackParamList = {
  UserProfile: { uid: string };
  UserDiary: { objectID: string };
  ReviewList: { uid: string };
};
const CommonStack = createStackNavigator<CommonStackParamList>();
const CommonNavigator = (): JSX.Element => {
  return (
    <CommonStack.Navigator screenOptions={DefaultNavigationOptions}>
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
    </CommonStack.Navigator>
  );
};

export type MyDiaryTabStackParamList = {
  MyDiaryList: undefined;
  MyDiarySearch: undefined;
  DraftDiaryList: undefined;
  MyDiary: { objectID: string };
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
        options={DefaultSearchBarOptions}
      />
      <MyDiaryTabStack.Screen
        name="MyDiarySearch"
        component={MyDiarySerchScreen}
        options={{ headerShown: false }}
      />
      <MyDiaryTabStack.Screen
        name="DraftDiaryList"
        component={DraftDiaryListScreen}
        options={{ title: I18n.t('draftDiary.headerTitle') }}
      />
      <MyDiaryTabStack.Screen
        name="MyDiary"
        component={MyDiaryScreenContainer}
        options={DefaultDiaryOptions}
      />
      {/* 動作確認 */}
      {CommonNavigator()}
    </MyDiaryTabStack.Navigator>
  );
};

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
    </TeachDiaryTabStack.Navigator>
  );
};

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
} & CommonStackParamList;
const MyPageTabStack = createStackNavigator<MyPageTabStackParamList>();
const MyPageTabNavigator = (): JSX.Element => {
  return (
    <MyPageTabStack.Navigator
      initialRouteName="MyPage"
      screenOptions={DefaultNavigationOptions}
    >
      <MyPageTabStack.Screen
        name="MyPage"
        component={MyPageScreenContainer}
        options={{ title: I18n.t('myPage.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ title: I18n.t('setting.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name="TutorialList"
        component={TutorialListScreenContainer}
        options={{ title: I18n.t('tutorialList.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name="Notice"
        component={NoticeScreenContainer}
        options={{ title: I18n.t('notice.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name="Inquiry"
        component={InquiryScreenContainer}
        options={{ title: I18n.t('inquiry.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name="EditEmail"
        component={EditEmailScreen}
        options={{ title: I18n.t('editEmail.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name="EditPassword"
        component={EditPasswordScreen}
        options={{ title: I18n.t('editPassword.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name="RegisterEmailPassword"
        component={RegisterEmailPasswordScreen}
        options={{ title: I18n.t('registerEmailPassword.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name="DeleteAcount"
        component={DeleteAcountScreen}
        options={{ title: I18n.t('deleteAcount.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name="ForegetPassword"
        component={ForegetPasswordScreen}
        options={{ title: I18n.t('foregetPassword.headerTitle') }}
      />
    </MyPageTabStack.Navigator>
  );
};

export type ModalStackParamList = {
  ModalPostDiary: undefined;
  ModalEditMyProfile: undefined;
  ModalPostDraftDiary: undefined;
  ModalCorrecting: undefined;
  ModalReview: undefined;
};
const ModalStack = createStackNavigator<ModalStackParamList>();
const ModalNavigator = (): JSX.Element => {
  return (
    <ModalStack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <ModalStack.Screen
        name="ModalPostDiary"
        component={ModalPostDiaryNavigator}
      />
      <ModalStack.Screen
        name="ModalEditMyProfile"
        component={ModalEditMyProfileNavigator}
      />
      <ModalStack.Screen
        name="ModalPostDraftDiary"
        component={ModalPostDraftDiaryNavigator}
      />
      <ModalStack.Screen
        name="ModalCorrecting"
        component={ModalCorrectingNavigator}
      />
      <ModalStack.Screen name="ModalReview" component={ModalReviewNavigator} />
    </ModalStack.Navigator>
  );
};

// export type DraftDiaryListType = CompositeNavigationProp<
//   StackNavigationProp<MyDiaryTabStackParamList, 'DraftDiaryList'>,
//   MyDiaryTabType
// >;
// export type MyDiaryTabType = CompositeNavigationProp<
//   BottomTabNavigationProp<HomeTabParamList, 'MyDiaryTab'>,
//   StackNavigationProp<MainTabStackParamList>
// >;
// export type bb = Nested3NavigatorParams<'DraftDiaryList'>;
// export type cc = Nested2NavigatorParams<MyDiaryTabStackParamList>;

// type Nested3NavigatorParams<Nested2NavigatorParams> = {
//   [K in keyof Nested2NavigatorParams]: undefined extends Nested2NavigatorParams[K]
//     ? { screen: K; params?: Nested2NavigatorParams[K] }
//     : { screen: K; params: Nested2NavigatorParams[K] };
// }[keyof Nested2NavigatorParams];

// type Nested2NavigatorParams<NestedNavigatorParams> = {
//   [K in keyof NestedNavigatorParams]: undefined extends NestedNavigatorParams[K]
//     ? { screen: K; params?: NestedNavigatorParams[K] }
//     : { screen: K; params: NestedNavigatorParams[K] };
// }[keyof NestedNavigatorParams];

// type aaa = NestedNavigatorParams<HomeTabParamList>;

// type NestedNavigatorParams<MainTabStackParamList> = {
//   [K in keyof MainTabStackParamList]: undefined extends MainTabStackParamList[K]
//     ? { screen: K; params?: MainTabStackParamList[K] }
//     : { screen: K; params: MainTabStackParamList[K] };
// }[keyof MainTabStackParamList];

export type HomeTabParamList = {
  MyDiaryTab: undefined;
  PostDiaryTab: undefined;
  TeachDiaryTab: undefined;
  MyPageTab: undefined;
};
const HomeTab = createBottomTabNavigator<HomeTabParamList>();
const HomeTabNavigator = (): JSX.Element => {
  return (
    <HomeTab.Navigator tabBarOptions={{ activeTintColor: mainColor }}>
      <HomeTab.Screen
        name="MyDiaryTab"
        component={MyDiaryTabNavigator}
        options={{
          tabBarLabel: I18n.t('mainTab.myDiary'),
          tabBarIcon: ({ color }: { color: string }): JSX.Element => (
            <TabIcon
              name="book-open"
              size={25}
              color={color}
              badgeMode="myDiary"
            />
          ),
        }}
      />
      <HomeTab.Screen
        name="PostDiaryTab"
        component={PostDiaryScreen}
        options={{
          tabBarLabel: I18n.t('mainTab.postDiary'),
          tabBarIcon: ({ color }: { color: string }): JSX.Element => (
            <MaterialCommunityIcons name="pencil" size={25} color={color} />
          ),
          // tabBarButton: (): void => {
          //   // navigation.navigate('ModalPostDiary');
          // },
        }}
      />
      <HomeTab.Screen
        name="TeachDiaryTab"
        component={TeachDiaryTabNavigator}
        options={{
          tabBarLabel: ({ color }: { color: string }): JSX.Element => (
            <TabLabel color={color} />
          ),
          tabBarIcon: ({ color }: { color: string }): JSX.Element => (
            <MaterialCommunityIcons name="spellcheck" size={25} color={color} />
          ),
        }}
      />
      <HomeTab.Screen
        name="MyPageTab"
        component={MyPageTabNavigator}
        options={{
          tabBarLabel: I18n.t('mainTab.myPage'),
          tabBarIcon: ({ color }: { color: string }): JSX.Element => (
            <MaterialIcons name="person" size={25} color={color} />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
};

export type MainTabStackParamList = {
  Home: undefined;
  Modal: undefined;
};
const MainTabStack = createStackNavigator<MainTabStackParamList>();
const MainTabNavigator = (): JSX.Element => {
  return (
    <MainTabStack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <MainTabStack.Screen name="Home" component={HomeTabNavigator} />
      <MainTabStack.Screen name="Modal" component={ModalNavigator} />
    </MainTabStack.Navigator>
  );
};

export default MainTabNavigator;
