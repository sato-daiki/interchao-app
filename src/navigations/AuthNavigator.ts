import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
/* screens */
import InitializeScreen from '../screens/InitializeScreen';
import SignUpScreenContainer from '../containers/SignUpScreenContainer';
import SignInScreen from '../screens/SignInScreen';
import SelectLanguageScreenContainer from '../containers/SelectLanguageScreenContainer';
import InputUserNameScreenContainer from '../containers/InputUserNameScreenContainer';
import ForegetPasswordScreen from '../screens/ForegetPasswordScreen';

const routeConfigMap = {
  SelectLanguage: {
    screen: SelectLanguageScreenContainer,
  },
  InputUserName: {
    screen: InputUserNameScreenContainer,
  },
  SignIn: {
    screen: SignInScreen,
  },
  SignUp: {
    screen: SignUpScreenContainer,
  },
  ForegetPassword: {
    screen: ForegetPasswordScreen,
  },
};
// modalにしないとwebの時背景が白くならない
const ModalAuthNavigator = createStackNavigator(routeConfigMap);

export const createAuthTabNavigator = () => {
  if (Platform.OS === 'web') {
    return createStackNavigator(
      {
        Initialize: {
          screen: InitializeScreen,
        },
        ModalAuth: {
          screen: ModalAuthNavigator,
        },
      },
      {
        headerMode: 'none',
        mode: 'modal',
        defaultNavigationOptions: {
          cardStyle: {
            backgroundColor: '#FFFFFF',
          },
        },
      }
    );
  }

  return createStackNavigator({
    Initialize: {
      screen: InitializeScreen,
    },
    ...routeConfigMap,
  });
};
