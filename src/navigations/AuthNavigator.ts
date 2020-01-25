import { createStackNavigator } from 'react-navigation-stack';

/* screens */
import AuthLoadingScreenContainer from '../containers/AuthLoadingScreenContainer';
import InitializeScreen from '../screens/InitializeScreen';

export default createStackNavigator({
  AuthLoading: {
    screen: AuthLoadingScreenContainer,
  },
  Initialize: {
    screen: InitializeScreen,
  },
});