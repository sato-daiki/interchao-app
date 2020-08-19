import { NavigationStackOptions } from 'react-navigation-stack';
import { primaryColor, fontSizeL } from '../styles/Common';
import { getEachOS } from '../utils/common';

// eslint-disable-next-line import/prefer-default-export
export const DefaultNavigationOptions: NavigationStackOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTitleStyle: {
    textAlign: getEachOS({ ios: 'center', android: 'left', web: 'center' }),
    fontWeight: getEachOS({ ios: '700', android: '500', web: '700' }),
    color: primaryColor,
    fontSize: fontSizeL,
    marginHorizontal: getEachOS({ ios: 32, android: 0, web: 32 }),
    alignSelf: 'center',
  },
  headerTintColor: primaryColor,
  headerRightContainerStyle: {
    paddingHorizontal: 16,
  },
  headerLeftContainerStyle: {
    paddingHorizontal: getEachOS({ ios: 16, android: 0, web: 0 }),
  },
  headerBackTitleStyle: {
    display: 'none',
  },
};
