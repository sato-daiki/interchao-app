import { createStackNavigator } from 'react-navigation-stack';

/* screens */
import InitializeScreen from '../screens/InitializeScreen';
import SignUpScreenContainer from '../containers/SignUpScreenContainer';
import SignInScreen from '../screens/SignInScreen';
import SelectLanguageScreenContainer from '../containers/SelectLanguageScreenContainer';
import ResendEmailScreen from '../screens/ResendEmailScreen';
import InputUserNameScreenContainer from '../containers/InputUserNameScreenContainer';
import ForegetPasswordScreen from '../screens/ForegetPasswordScreen';

export default createStackNavigator({
  Initialize: {
    screen: InitializeScreen,
  },
  SignUp: {
    screen: SignUpScreenContainer,
  },
  SignIn: {
    screen: SignInScreen,
  },
  SelectLanguage: {
    screen: SelectLanguageScreenContainer,
  },
  InputUserName: {
    screen: InputUserNameScreenContainer,
  },
  ResendEmail: {
    screen: ResendEmailScreen,
  },
  ForegetPassword: {
    screen: ForegetPasswordScreen,
  },
});
