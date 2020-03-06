import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

/* screens */
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MyDiaryListScreenContainer from '../containers/MyDiaryListScreenContainer';
import DraftDiaryListScreen from '../screens/DraftDiaryListScreen';
import { mainColor } from '../styles/Common';
import PostDiaryScreen from '../screens/PostDiaryScreen';
import PostDiaryScreenContainer from '../containers/PostDiaryScreenContainer';
import TeachDiaryListScreen from '../screens/TeachDiaryListScreen';
import MyDiaryScreen from '../screens/MyDiaryScreen';
import UserDiaryScreen from '../screens/UserDiaryScreen';
import MyPageScreen from '../screens/MyPageScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import MyProfileEditScreen from '../screens/MyProfileEditScreen';
import SettingScreen from '../screens/SettingScreen';
import NoticeScreen from '../screens/NoticeScreen';
import PremiumScreen from '../screens/PremiumScreen';
import FavoriteUserListScreen from '../screens/FavoriteUserListScreen';

/* components */
const ModalPostDiaryNavigator = createStackNavigator({
  ModalPostDiary: { screen: PostDiaryScreenContainer },
});

const MyDiaryTabStack = createStackNavigator(
  {
    MyDiaryList: {
      screen: MyDiaryListScreenContainer,
    },
    DraftDiaryList: {
      screen: DraftDiaryListScreen,
    },
    MyDiary: {
      screen: MyDiaryScreen,
    },
    MyPage: {
      screen: MyPageScreen,
    },
    MyProfileEdit: {
      screen: MyProfileEditScreen,
    },
    Setting: {
      screen: SettingScreen,
    },
    Notice: {
      screen: NoticeScreen,
    },
    Premium: {
      screen: PremiumScreen,
    },
    FavoriteUserList: {
      screen: FavoriteUserListScreen,
    },
  },
  {
    initialRouteName: 'MyDiaryList',
  }
);

const TeachDiaryTabStack = createStackNavigator(
  {
    TeachDiaryList: {
      screen: TeachDiaryListScreen,
    },
    UserDiaryScreen: {
      screen: UserDiaryScreen,
    },
    UserProfile: {
      screen: UserProfileScreen,
    },
  },
  {
    initialRouteName: 'TeachDiaryList',
  }
);

const MainTab = createBottomTabNavigator(
  {
    MyDiary: {
      screen: MyDiaryTabStack,
      navigationOptions: {
        tabBarLabel: 'マイ日記',
        tabBarIcon: ({ tintColor }: { tintColor: string }): JSX.Element => (
          <MaterialCommunityIcons
            name="book-open"
            size={25}
            color={tintColor}
          />
        ),
      },
    },
    PostDiary: {
      screen: PostDiaryScreen,
      navigationOptions: {
        tabBarLabel: '日記を書く',
        tabBarIcon: ({ tintColor }: { tintColor: string }): JSX.Element => (
          <MaterialCommunityIcons name="pencil" size={25} color={tintColor} />
        ),
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate('ModalPostDiary'),
      },
    },
    TeachDiary: {
      screen: TeachDiaryTabStack,
      navigationOptions: {
        tabBarLabel: 'みんなの日記',
        tabBarIcon: ({ tintColor }: { tintColor: string }): JSX.Element => (
          <MaterialCommunityIcons
            name="account-multiple"
            size={25}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: mainColor,
    },
  }
);

export default createStackNavigator(
  {
    Home: {
      screen: MainTab,
    },
    ModalPostDiary: { screen: ModalPostDiaryNavigator },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);
