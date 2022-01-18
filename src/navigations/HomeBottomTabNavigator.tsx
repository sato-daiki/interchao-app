import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { mainColor, maxLayoutChange } from '../styles/Common';
import I18n from '../utils/I18n';
import { TabIcon, TabLabel } from '../components/molecules';
import PostDiaryScreenContainer from '../containers/PostDiaryScreenContainer';
import MyDiaryTabNavigator, {
  MyDiaryTabStackParamList,
} from './MyDiaryTabNavigator';
import TeachDiaryTabNavigator, {
  TeachDiaryTabStackParamList,
} from './TeachDiaryTabNavigator';
import PointTabNavigator from './PointTabNavigator';
import MyPageTabNavigator from './MyPageTabNavigator';
import { MainStackParamList, MainNavigationProp } from './MainNavigator';
import CustomDrawerContent from '../components/web/organisms/CustomDrawerContent';
import { DrawerLabel } from '../components/web/molecules';

export type HomeBottomNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'Home'>,
  MainNavigationProp
>;

export type HomeBottomParamList = {
  MyDiaryTab: { screen: keyof MyDiaryTabStackParamList };
  PostDiaryTab: undefined;
  TeachDiaryTab: { screen: keyof TeachDiaryTabStackParamList };
  PointTab: undefined;
  MyPageTab: undefined;
};

const styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: undefined,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HomeBottomTabNavigator = (): JSX.Element => {
  const isDesktopOrLaptopDevice = useMediaQuery({
    minDeviceWidth: 1224,
  });
  const isMaxLayoutChange = useMediaQuery({ minWidth: maxLayoutChange });

  if (isDesktopOrLaptopDevice) {
    const drawerStyle = { width: isMaxLayoutChange ? 240 : 80 };

    const Drawer = createDrawerNavigator<HomeBottomParamList>();

    return (
      <Drawer.Navigator
        initialRouteName="MyDiaryTab"
        drawerType="permanent"
        drawerStyle={drawerStyle}
        drawerContent={(props): JSX.Element => (
          <CustomDrawerContent
            isMaxLayoutChange={isMaxLayoutChange}
            {...props}
          />
        )}
        drawerContentOptions={{
          activeTintColor: mainColor,
          itemStyle: styles.itemStyle,
        }}
      >
        <Drawer.Screen
          name="MyDiaryTab"
          component={MyDiaryTabNavigator}
          options={{
            drawerLabel: ({ color }: { color: string }): JSX.Element => (
              <DrawerLabel
                isMaxLayoutChange={isMaxLayoutChange}
                tabName="MyDiaryTab"
                color={color}
                text={isMaxLayoutChange ? I18n.t('mainTab.myDiary') : null}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="TeachDiaryTab"
          component={TeachDiaryTabNavigator}
          options={{
            drawerLabel: ({ color }: { color: string }): JSX.Element => (
              <DrawerLabel
                isMaxLayoutChange={isMaxLayoutChange}
                tabName="TeachDiaryTab"
                color={color}
                text={isMaxLayoutChange ? I18n.t('mainTab.teachDiary') : null}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="MyPageTab"
          component={MyPageTabNavigator}
          options={{
            drawerLabel: ({ color }: { color: string }): JSX.Element => (
              <DrawerLabel
                isMaxLayoutChange={isMaxLayoutChange}
                tabName="MyPageTab"
                color={color}
                text={isMaxLayoutChange ? I18n.t('mainTab.myPage') : null}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }

  const HomeBottom = createBottomTabNavigator<HomeBottomParamList>();
  return (
    <HomeBottom.Navigator
      tabBarOptions={{ activeTintColor: mainColor, keyboardHidesTabBar: true }}
    >
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
        listeners={({
          navigation,
        }: {
          navigation: HomeBottomNavigationProp;
        }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            navigation.navigate('ModalSelectDiaryType', {
              screen: 'SelectDiaryType',
            });
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
        name="PointTab"
        component={PointTabNavigator}
        options={{
          tabBarLabel: I18n.t('mainTab.myPage'),
          tabBarIcon: ({ color }: { color: string }): JSX.Element => (
            <MaterialIcons name="person" size={25} color={color} />
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
