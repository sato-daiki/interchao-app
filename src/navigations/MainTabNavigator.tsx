import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

/* screens */
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MyDiaryListScreen from '../screens/MyDiaryListScreen';
import YourDiaryListScreen from '../screens/YourDiaryListScreen';
import { mainColor } from '../styles/Common';

/* components */
// import TabIcon from '../components/molecules/TabIcon';

const MyDiaryTabStack = createStackNavigator(
  {
    MyDiaryList: {
      screen: MyDiaryListScreen,
    },
  },
  {
    initialRouteName: 'MyDiaryList',
    headerLayoutPreset: 'center',
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
    WriteDiary: {
      screen: YourDiaryListScreen,
      navigationOptions: {
        tabBarLabel: '日記を書く',
        tabBarIcon: ({ tintColor }: { tintColor: string }): JSX.Element => (
          <MaterialCommunityIcons name="pencil" size={25} color={tintColor} />
        ),
      },
    },
    YourDiary: {
      screen: YourDiaryListScreen,
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

export default createStackNavigator({
  Home: {
    screen: MainTab,
  },
});
