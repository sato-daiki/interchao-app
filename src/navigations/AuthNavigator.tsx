import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

/* screens */
import SelectLanguageScreenContainer from '@/containers/SelectLanguageScreenContainer';
import InputUserNameScreenContainer from '@/containers/InputUserNameScreenContainer';
import SignUpScreenContainer from '@/containers/SignUpScreenContainer';
// @ts-ignore
import InitializeScreen from '@/screens/InitializeScreen/InitializeScreen';
import SignInScreen from '@/screens/SignInScreen';
import ForegetPasswordScreen from '@/screens/ForegetPasswordScreen';
import NotFoundScreen from '@/screens/NotFoundScreen';
import EditCountryScreen from '@/screens/EditCountryScreen';

import {
  DefaultAuthLayoutOptions,
  DefaultNavigationOptions,
} from '@/constants/NavigationOptions';
import I18n from '@/utils/I18n';
import { CountryCode } from '@/types';
import { RootStackParamList } from './RootNavigator';

export type AuthNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Auth'
>;

export type AuthStackParamList = {
  Initialize: { lang?: string } | undefined;
  SelectLanguage: undefined;
  EditCountry: {
    nationalityCode: CountryCode | undefined;
    setNationalityCode: (nationalityCode: CountryCode) => void;
  };
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
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Stack.Screen
        name="Initialize"
        component={InitializeScreen}
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
        name="EditCountry"
        component={EditCountryScreen}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('profileNationality.nationality'),
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
