import { createStackNavigator } from 'react-navigation-stack';

/* screens */
import AuthLoadingScreenContainer from '../containers/AuthLoadingScreenContainer';
import InitializeScreen from '../screens/InitializeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import MyPageScreen from '../screens/MyPageScreen';
import YourProfileScreen from '../screens/YourProfileScreen';
import VerificationCodeScreen from '../screens/VerificationCodeScreen';
import ResendEmailScreen from '../screens/ResendEmailScreen';
import InputUserNameScreen from '../screens/InputUserNameScreen';

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
  VerificationCode: {
    screen: VerificationCodeScreen,
  },
  ResendEmail: {
    screen: ResendEmailScreen,
  },
  InputUserName: {
    screen: InputUserNameScreen,
  },
});
