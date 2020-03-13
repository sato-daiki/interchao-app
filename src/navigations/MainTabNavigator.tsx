import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/* screens */
import MyDiaryListScreenContainer from '../containers/MyDiaryListScreenContainer';
import DraftDiaryListScreenContainer from '../containers/DraftDiaryListScreenContainer';
import { mainColor } from '../styles/Common';
import PostDiaryScreen from '../screens/PostDiaryScreen';
import PostDiaryScreenContainer from '../containers/PostDiaryScreenContainer';
import TeachDiaryListScreenContainer from '../containers/TeachDiaryListScreenContainer';
import MyDiaryScreenContainer from '../containers/MyDiaryScreenContainer';
import TeachDiaryScreenContainer from '../containers/TeachDiaryScreenContainer';
import MyPageScreenContainer from '../containers/MyPageScreenContainer';
import UserProfileScreen from '../screens/UserProfileScreen';
import EditMyProfileScreenContainer from '../containers/EditMyProfileScreenContainer';
import SettingScreen from '../screens/SettingScreen';
import NoticeScreen from '../screens/NoticeScreen';
import PremiumScreen from '../screens/PremiumScreen';
import FavoriteUserListScreen from '../screens/FavoriteUserListScreen';
import EditEmailScreen from '../screens/EditEmailScreen';
import EditPasswordScreen from '../screens/EditPasswordScreen';
import RegisterEmailPasswordScreen from '../screens/RegisterEmailPasswordScreen';
import EditUserNameScreenContainer from '../containers/EditUserNameScreenContainer';
import PostDraftDiaryScreenContainer from '../containers/PostDraftDiaryScreenContainer';

/* components */
const ModalPostDiaryNavigator = createStackNavigator({
  ModalPostDiary: { screen: PostDiaryScreenContainer },
});

const ModalPostDraftDiaryNavigator = createStackNavigator({
  PostDraftDiary: { screen: PostDraftDiaryScreenContainer },
});

const ModalEditMyProfileNavigator = createStackNavigator(
  {
    EditMyProfile: { screen: EditMyProfileScreenContainer },
    EditUserName: { screen: EditUserNameScreenContainer },
  },
  {
    initialRouteName: 'EditMyProfile',
  }
);

const MyDiaryTabStack = createStackNavigator(
  {
    MyDiaryList: {
      screen: MyDiaryListScreenContainer,
    },
    DraftDiaryList: {
      screen: DraftDiaryListScreenContainer,
    },
    MyDiary: {
      screen: MyDiaryScreenContainer,
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
      screen: TeachDiaryListScreenContainer,
    },
    TeachDiary: {
      screen: TeachDiaryScreenContainer,
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
    ModalEditMyProfile: {
      screen: ModalEditMyProfileNavigator,
    },
    ModalPostDraftDiary: {
      screen: ModalPostDraftDiaryNavigator,
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);
