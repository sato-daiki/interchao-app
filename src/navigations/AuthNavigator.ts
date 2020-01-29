import { createStackNavigator } from 'react-navigation-stack';

/* screens */
import AuthLoadingScreenContainer from '../containers/AuthLoadingScreenContainer';
import InitializeScreen from '../screens/InitializeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import MyPageScreen from '../screens/MyPageScreen';
import YourProfileScreen from '../screens/YourProfileScreen';

export default createStackNavigator({
  AuthLoading: {
    screen: AuthLoadingScreenContainer,
  },
  Initialize: {
    screen: InitializeScreen,
  },
  SignIn: {
    screen: SignInScreen,
  },
  SignUp: {
    screen: SignUpScreen,
  },
  MyPage: {
    screen: MyPageScreen,
  },
  YoroProfile: {
    screen: YourProfileScreen,
  },
});
