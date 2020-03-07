import { createStackNavigator } from 'react-navigation-stack';

/* screens */
import InitializeScreen from '../screens/InitializeScreen';
import SignUpScreenContainer from '../containers/SignUpScreenContainer';
import SignInScreen from '../screens/SignInScreen';
import SelectLanguageScreenContainer from '../containers/SelectLanguageScreenContainer';
import ResendEmailScreen from '../screens/ResendEmailScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import InputUserNameScreenContainer from '../containers/InputUserNameScreenContainer';

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
  ConfirmEmail: {
    screen: ConfirmEmailScreen,
  },
});
