import { createStackNavigator } from 'react-navigation-stack';

/* screens */
import AuthLoadingScreenContainer from '../containers/AuthLoadingScreenContainer';
import InitializeScreen from '../screens/InitializeScreen';
import SignUp from '../containers/SignUpScreenContainer';
import SelectLanguage from '../containers/SelectLanguageScreenContainer';
import SignInScreen from '../screens/SignInScreen';
import VerificationCodeScreen from '../screens/VerificationCodeScreen';
import ResendEmailScreen from '../screens/ResendEmailScreen';
import InputUserName from '../containers/InputUserNameScreenContainer';

export default createStackNavigator({
  Initialize: {
    screen: InitializeScreen,
  },
  SignIn: {
    screen: SignInScreen,
  },
  SignUp: {
    screen: SignUp,
  },
  SelectLanguage: {
    screen: SelectLanguage,
  },
  VerificationCode: {
    screen: VerificationCodeScreen,
  },
  ResendEmail: {
    screen: ResendEmailScreen,
  },
  InputUserName: {
    screen: InputUserName,
  },
});
