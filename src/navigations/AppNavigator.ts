import { createAppContainer, createSwitchNavigator } from 'react-navigation';

/* navigator */
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';

const appContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthNavigator,
      MainTabNavigator,
    },
    {
      initialRouteName: 'AuthNavigator',
    }
  )
);

export default appContainer;
