import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

/* screens */
import MyDiaryListScreenContainer from '../containers/MyDiaryListScreenContainer';
import DraftDiaryListScreenContainer from '../containers/DraftDiaryListScreenContainer';
import { mainColor } from '../styles/Common';
import PostDiaryScreen from '../screens/PostDiaryScreen';
import PostDiaryScreenContainer from '../containers/PostDiaryScreenContainer';
import TeachDiaryListScreen from '../screens/TeachDiaryListScreen';
import MyDiaryScreen from '../screens/MyDiaryScreen';
import UserDiaryScreen from '../screens/UserDiaryScreen';
import MyPageScreenContainer from '../containers/MyPageScreenContainer';
import UserProfileScreen from '../screens/UserProfileScreen';
import MyProfileEditScreenContainer from '../containers/MyProfileEditScreenContainer';
import SettingScreen from '../screens/SettingScreen';
import NoticeScreen from '../screens/NoticeScreen';
import PremiumScreen from '../screens/PremiumScreen';
import FavoriteUserListScreen from '../screens/FavoriteUserListScreen';
import EditEmailScreen from '../screens/EditEmailScreen';
import EditPasswordScreen from '../screens/EditPasswordScreen';
import RegisterEmailPasswordScreen from '../screens/RegisterEmailPasswordScreen';

/* components */
const ModalPostDiaryNavigator = createStackNavigator({
  ModalPostDiary: { screen: PostDiaryScreenContainer },
});

const ModalMyProfileEditNavigator = createStackNavigator({
  MyProfileEdit: { screen: MyProfileEditScreenContainer },
});

const MyDiaryTabStack = createStackNavigator(
  {
    MyDiaryList: {
      screen: MyDiaryListScreenContainer,
    },
    DraftDiaryList: {
      screen: DraftDiaryListScreenContainer,
    },
    MyDiary: {
      screen: MyDiaryScreen,
    },
    MyPage: {
      screen: MyPageScreenContainer,
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
    EditEmail: {
      screen: EditEmailScreen,
    },
    EditPassword: {
      screen: EditPasswordScreen,
    },
    RegisterEmailPassword: {
      screen: RegisterEmailPasswordScreen,
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
    MoealMyProfileEdit: {
      screen: ModalMyProfileEditNavigator,
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);
