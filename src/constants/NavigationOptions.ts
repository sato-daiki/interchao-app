import { NavigationStackOptions } from 'react-navigation-stack';
import { primaryColor, fontSizeL } from '../styles/Common';

// eslint-disable-next-line import/prefer-default-export
export const DefaultNavigationOptions: NavigationStackOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTitleStyle: {
    fontWeight: '700',
    color: primaryColor,
    fontSize: fontSizeL,
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
