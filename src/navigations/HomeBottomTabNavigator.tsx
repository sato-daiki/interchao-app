import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
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
import { createSideTabNavigator } from './SideTabNavigator';

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

const HomeBottomTabNavigator = (): JSX.Element => {
  const isDesktopOrLaptopDevice = useMediaQuery({
    minDeviceWidth: 1224,
  });

  if (isDesktopOrLaptopDevice) {
    const HomeSide = createSideTabNavigator<HomeBottomParamList>();

    return (
      <HomeSide.Navigator initialRouteName="MyDiaryTab">
        <HomeSide.Screen name="MyDiaryTab" component={MyDiaryTabNavigator} />
        <HomeSide.Screen
          name="TeachDiaryTab"
          component={TeachDiaryTabNavigator}
        />
        <HomeSide.Screen name="MyPageTab" component={MyPageTabNavigator} />
      </HomeSide.Navigator>
    );
  }

  const HomeBottom = createBottomTabNavigator<HomeBottomParamList>();
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
            navigation.navigate('ModalPostDiary', { screen: 'PostDiary' });
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
