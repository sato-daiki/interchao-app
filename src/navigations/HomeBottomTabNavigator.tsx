import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { mainColor } from '../styles/Common';
import I18n from '../utils/I18n';
import { TabIcon, TabLabel } from '../components/molecules';
import PostDiaryScreenContainer from '../containers/PostDiaryScreenContainer';
import MyDiaryTabNavigator from './MyDiaryTabNavigator';
import TeachDiaryTabNavigator from './TeachDiaryTabNavigator';
import MyPageTabNavigator from './MyPageTabNavigator';
import { MainStackParamList } from './MainNavigator';

export type HomeBottomNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Home'
>;

export type HomeBottomParamList = {
  MyDiaryTab: undefined;
  PostDiaryTab: undefined;
  TeachDiaryTab: undefined;
  MyPageTab: undefined;
};
const HomeBottom = createBottomTabNavigator<HomeBottomParamList>();
const HomeBottomTabNavigator = (): JSX.Element => {
  return (
    <HomeBottom.Navigator tabBarOptions={{ activeTintColor: mainColor }}>
      <HomeBottom.Screen
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
      <HomeBottom.Screen
        name="PostDiaryTab"
        component={PostDiaryScreenContainer}
        options={{
          tabBarLabel: I18n.t('mainTab.postDiary'),
          tabBarIcon: ({ color }: { color: string }): JSX.Element => (
            <MaterialCommunityIcons name="pencil" size={25} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            navigation.navigate('ModalPostDiary');
          },
        })}
      />
      <HomeBottom.Screen
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
      <HomeBottom.Screen
        name="MyPageTab"
        component={MyPageTabNavigator}
        options={{
          tabBarLabel: I18n.t('mainTab.myPage'),
          tabBarIcon: ({ color }: { color: string }): JSX.Element => (
            <MaterialIcons name="person" size={25} color={color} />
          ),
        }}
      />
    </HomeBottom.Navigator>
  );
};

export default HomeBottomTabNavigator;
