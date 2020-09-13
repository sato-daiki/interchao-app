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
import NotFoundScreen from '../screens/NotFoundScreen';

export type AuthStackParamList = {
  Initialize: undefined;
  SelectLanguage: undefined;
  InputUserName: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForegetPassword: undefined;
  notfound: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="Initialize"
      screenOptions={{
        ...DefaultNavigationOptions,
      }}
    >
      <Stack.Screen
        name="Initialize"
        component={
          Platform.OS === 'web' ? InitializeWebScreen : InitializeNativeScreen
        }
        options={{ headerShown: false, title: 'Interchao' }}
      />
      <Stack.Screen
        name="SelectLanguage"
        component={SelectLanguageScreenContainer}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('selectLanguage.headerTitle'),
        }}
      />
      <Stack.Screen
        name="InputUserName"
        component={InputUserNameScreenContainer}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('inputUserName.headerTitle'),
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('signIn.headerTitle'),
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreenContainer}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('signUp.headerTitle'),
        }}
      />
      <Stack.Screen
        name="ForegetPassword"
        component={ForegetPasswordScreen}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('foregetPassword.headerTitle'),
        }}
      />
      <Stack.Screen
        name="notfound"
        component={NotFoundScreen}
        options={{ headerShown: false, title: '404 NOT FOUND' }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
