import { createStackNavigator } from 'react-navigation-stack';

/* screens */
import AuthLoadingScreenContainer from '../containers/AuthLoadingScreenContainer';
import InitializeScreen from '../screens/InitializeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import MyPageScreen from '../screens/MyPageScreen';

export default createStackNavigator({
  AuthLoading: {
    screen: AuthLoadingScreenContainer,
  },
  Initialize: {
    screen: InitializeScreen,
  },
  SignUp: {
    screen: SignUpScreen,
  },
  SignIn: {
    screen: SignInScreen,
  },
  MyPage: {
    screen: MyPageScreen,
  },
});
