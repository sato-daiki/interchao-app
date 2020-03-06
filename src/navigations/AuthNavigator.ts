import { createStackNavigator } from 'react-navigation-stack';

/* screens */
import InitializeScreen from '../screens/InitializeScreen';
import SignUpScreenContainer from '../containers/SignUpScreenContainer';
import SignInScreenContainer from '../containers/SignInScreenContainer';
import SelectLanguageScreenContainer from '../containers/SelectLanguageScreenContainer';
import ResendEmailScreen from '../screens/ResendEmailScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import InputUserNameScreenContainer from '../containers/InputUserNameScreenContainer';

export default createStackNavigator({
  Initialize: {
    screen: InitializeScreen,
  },
  SignIn: {
    screen: SignInScreenContainer,
  },
  SignUp: {
    screen: SignUpScreenContainer,
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
