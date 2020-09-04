import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
/* screens */
import InitializeWebScreen from '../screens/InitializeWebScreen';
import InitializeNativeScreen from '../screens/InitializeNativeScreen';
import SignUpScreenContainer from '../containers/SignUpScreenContainer';
import SignInScreen from '../screens/SignInScreen';
import SelectLanguageScreenContainer from '../containers/SelectLanguageScreenContainer';
import InputUserNameScreenContainer from '../containers/InputUserNameScreenContainer';
import ForegetPasswordScreen from '../screens/ForegetPasswordScreen';
import {
  DefaultNavigationOptions,
  DefaultAuthLayoutOptions,
} from '../constants/NavigationOptions';
import I18n from '../utils/I18n';
import { HeaderRight } from '../components/atoms';

export type AuthStackParamList = {
  Initialize: undefined;
  SelectLanguage: undefined;
  InputUserName: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForegetPassword: undefined;
};

// modalにしないとwebの時背景が白くならない
// const ModalAuthNavigator = createStackNavigator(routeConfigMap);

const Stack = createStackNavigator<AuthStackParamList>();

export const createAuthTabNavigator = () => {
  // if (Platform.OS === 'web') {
  //   return createStackNavigator(
  //     {
  //       Initialize: {
  //         screen: InitializeWebScreen,
  //       },
  //       ModalAuth: {
  //         screen: ModalAuthNavigator,
  //       },
  //     },
  //     {
  //       headerMode: 'none',
  //       mode: 'modal',
  //       defaultNavigationOptions: {
  //         cardStyle: {
  //           backgroundColor: '#FFFFFF',
  //         },
  //       },
  //     }
  //   );
  // }
  // return createStackNavigator({
  //   Initialize: {
  //     screen: InitializeNativeScreen,
  //   },
  //   ...routeConfigMap,
  // });
};

const AuthNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="Initialize"
      screenOptions={{
        ...DefaultNavigationOptions,
        ...DefaultAuthLayoutOptions,
      }}
    >
      <Stack.Screen
        name="Initialize"
        component={InitializeNativeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectLanguage"
        component={SelectLanguageScreenContainer}
        options={{
          title: I18n.t('selectLanguage.headerTitle'),
          // TODO: Web直す必要あり
        }}
      />
      <Stack.Screen
        name="InputUserName"
        component={InputUserNameScreenContainer}
        options={{
          title: I18n.t('inputUserName.headerTitle'),
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          title: I18n.t('signIn.headerTitle'),
          // TODO: Web直す必要あり
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreenContainer}
        options={{
          title: I18n.t('signUp.headerTitle'),
        }}
      />
      <Stack.Screen
        name="ForegetPassword"
        component={ForegetPasswordScreen}
        options={{
          title: I18n.t('foregetPassword.headerTitle'),
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
