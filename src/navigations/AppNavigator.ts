import {
  createAppContainer,
  createSwitchNavigator,
  NavigationContainer,
} from 'react-navigation';

import AuthLoadingScreenContainer from '../containers/AuthLoadingScreenContainer';

/* navigator */
import { createAuthTabNavigator } from './AuthNavigator';
import { createMainTabNavigator } from './MainTabNavigator';

export const createAppNavigator = (
  isDesktopOrLaptopDevice: boolean
): NavigationContainer => {
  return createAppContainer(
    createSwitchNavigator(
      {
        AuthLoading: {
          screen: AuthLoadingScreenContainer,
          navigationOptions: { header: null },
        },
        Auth: createAuthTabNavigator(),
        MainTab: createMainTabNavigator(isDesktopOrLaptopDevice),
      },
      {
        initialRouteName: 'AuthLoading',
      }
    )
  );
};
