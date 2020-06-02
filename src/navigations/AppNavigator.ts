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
        navigationOptions: { header: null },
      },
      AuthNavigator,
      MainTabNavigator: {
        screen: MainTabNavigator,
        path: '',
      },
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

export default appContainer;
