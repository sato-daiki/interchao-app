import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreenContainer from '../containers/AuthLoadingScreenContainer';

/* navigator */
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';

const appContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: {
        screen: AuthLoadingScreenContainer,
      },
      AuthNavigator,
      MainTabNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

export default appContainer;
