import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

/* screens */
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MyDiaryListScreen from '../screens/MyDiaryListScreen';
import DraftDiaryListScreen from '../screens/DraftDiaryListScreen';
import { mainColor } from '../styles/Common';
import PostDiaryScreen from '../screens/PostDiaryScreen';
import TeachDiaryListScreen from '../screens/TeachDiaryListScreen';
import MyDiaryScreen from '../screens/MyDiaryScreen';
import UserDiaryScreen from '../screens/UserDiaryScreen';
import MyPageScreen from '../screens/MyPageScreen';
import UserPageScreen from '../screens/UserPageScreen';
import MyProfileEditScreen from '../screens/MyProfileEditScreen';

/* components */
const ModalPostDiaryNavigator = createStackNavigator({
  ModalPostDiary: { screen: PostDiaryScreen },
});

const MyDiaryTabStack = createStackNavigator(
  {
    MyDiaryList: {
      screen: MyDiaryListScreen,
    },
    DraftDiaryList: {
      screen: DraftDiaryListScreen,
    },
    DiaryDetail: {
      screen: MyDiaryScreen,
    },
    MyPage: {
      screen: MyPageScreen,
    },
    MyProfileEdit: {
      screen: MyProfileEditScreen,
    },
  },
  {
    initialRouteName: 'MyProfileEdit',
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
    UserPage: {
      screen: UserPageScreen,
    },
  },
  {
    initialRouteName: 'UserPage',
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
