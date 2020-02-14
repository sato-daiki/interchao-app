import { Platform } from 'react-native';
import { NavigationStackOptions } from 'react-navigation-stack';
import { primaryColor, mainColor, fontSizeL } from '../styles/Common';

export const DefaultNavigationOptions: NavigationStackOptions = {
  headerTitleStyle: {
    color: primaryColor,
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 16,
  },
  headerStyle: {
    height: Platform.OS === 'ios' ? 44 : 54,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  headerBackTitleStyle: { display: 'none' },
  headerTintColor: mainColor,
};

export const DefaultTabOptions = {
  tabBarOptions: {
    activeTintColor: mainColor,
    inactiveTintColor: primaryColor,
    tabStyle: {
      backgroundColor: '#fff',
    },
  },
};

export const DefaultNavButtonOptions = {
  color: mainColor,
  containerViewStyle: { marginLeft: 16, marginRight: 16 },
  buttonStyle: { padding: 8 },
  fontSize: fontSizeL,
  transparent: true,
};
