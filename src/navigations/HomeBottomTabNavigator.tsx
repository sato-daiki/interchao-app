import React from 'react';
import { Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { mainColor, maxLayoutChange, fontSizeM } from '../styles/Common';
import I18n from '../utils/I18n';
import { TabIcon, TabLabel } from '../components/molecules';
import PostDiaryScreenContainer from '../containers/PostDiaryScreenContainer';
import MyDiaryTabNavigator, {
  MyDiaryTabStackParamList,
} from './MyDiaryTabNavigator';
import TeachDiaryTabNavigator from './TeachDiaryTabNavigator';
import MyPageTabNavigator from './MyPageTabNavigator';
import { MainStackParamList } from './MainNavigator';
import CustomDrawerContent from '../components/web/organisms/CustomDrawerContent';

export type HomeBottomNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Home'
>;

export type HomeBottomParamList = {
  MyDiaryTab: { screen: keyof MyDiaryTabStackParamList };
  PostDiaryTab: undefined;
  TeachDiaryTab: undefined;
  MyPageTab: undefined;
};

const styles = StyleSheet.create({
  drawerLabelContainr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerLabelText: {
    marginLeft: 12,
    fontSize: fontSizeM,
    fontWeight: 'bold',
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
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
        )}
      >
        <Drawer.Screen
          name="MyDiaryTab"
          component={MyDiaryTabNavigator}
          options={{
            drawerLabel: ({ color }: { color: string }): JSX.Element => (
              <View style={styles.drawerLabelContainr}>
                <TabIcon
                  name="book-open"
                  size={25}
                  color={color}
                  badgeMode="myDiary"
                />
                <Text style={[styles.drawerLabelText, { color }]}>
                  {isMaxLayoutChange ? I18n.t('mainTab.myDiary') : null}
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="TeachDiaryTab"
          component={TeachDiaryTabNavigator}
          options={{
            drawerLabel: ({ color }: { color: string }): JSX.Element => (
              <View style={styles.drawerLabelContainr}>
                <MaterialCommunityIcons
                  name="spellcheck"
                  size={25}
                  color={color}
                />
                <Text style={[styles.drawerLabelText, { color }]}>
                  {isMaxLayoutChange ? I18n.t('mainTab.teachDiary') : ''}
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="MyPageTab"
          component={MyPageTabNavigator}
          options={{
            drawerLabel: ({ color }: { color: string }): JSX.Element => (
              <View style={styles.drawerLabelContainr}>
                <MaterialIcons name="person" size={25} color={color} />
                <Text style={[styles.drawerLabelText, { color }]}>
                  {isMaxLayoutChange ? I18n.t('mainTab.myPage') : ''}
                </Text>
              </View>
            ),
          }}
        />
      </Drawer.Navigator>
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
