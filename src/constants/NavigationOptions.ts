import { NavigationStackOptions } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { primaryColor, fontSizeL, mainColor } from '../styles/Common';

// eslint-disable-next-line import/prefer-default-export
export const DefaultNavigationOptions: NavigationStackOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTitleStyle: {
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    color: primaryColor,
    fontSize: fontSizeL,
    marginHorizontal: Platform.OS === 'ios' ? 32 : 16,
    alignSelf: 'center',
  },
  headerBackTitleStyle: { display: 'none' },
  headerTintColor: primaryColor,
  headerRightContainerStyle: {
    paddingHorizontal: 16,
  },
  headerLeftContainerStyle: {
    paddingHorizontal: 16,
  },
};
