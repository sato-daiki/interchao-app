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
  DefaultNavigationOptions,
  DefaultAuthLayoutOptions,
} from '@/constants/NavigationOptions';
import I18n from '@/utils/I18n';
import { CountryCode } from '@/types';
import { maxMain } from '@/styles/Common';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './RootNavigator';

export type AuthNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Auth'
>;

export type CreateAccountStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Auth'>,
  AuthNavigationProp
>;

export type AuthStackParamList = {
  Initialize: { lang?: string } | undefined;
  CreateAccount: { screen: keyof CreateAccountStackParamList };
  notfound: undefined;
};

export type CreateAccountStackParamList = {
  SelectLanguage: undefined;
  EditCountry: {
    nationalityCode: CountryCode | undefined;
    setNationalityCode: (nationalityCode: CountryCode) => void;
  };
  InputUserName: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForegetPassword: undefined;
};

const CreateAccountStack = createStackNavigator<CreateAccountStackParamList>();
export const CreateAccountNavigator = (): JSX.Element => {
  return (
    <CreateAccountStack.Navigator
      initialRouteName="SelectLanguage"
      screenOptions={{
        ...DefaultNavigationOptions,
      }}
    >
      <CreateAccountStack.Screen
        name="SelectLanguage"
        component={SelectLanguageScreenContainer}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('selectLanguage.headerTitle'),
        }}
      />
      <CreateAccountStack.Screen
        name="EditCountry"
        component={EditCountryScreen}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('profileNationality.nationality'),
        }}
      />
      <CreateAccountStack.Screen
        name="InputUserName"
        component={InputUserNameScreenContainer}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('inputUserName.headerTitle'),
        }}
      />
      <CreateAccountStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('signIn.headerTitle'),
        }}
      />
      <CreateAccountStack.Screen
        name="SignUp"
        component={SignUpScreenContainer}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('signUp.headerTitle'),
        }}
      />
      <CreateAccountStack.Screen
        name="ForegetPassword"
        component={ForegetPasswordScreen}
        options={{
          ...DefaultAuthLayoutOptions,
          title: I18n.t('foregetPassword.headerTitle'),
        }}
      />
    </CreateAccountStack.Navigator>
  );
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="Initialize"
      headerMode="none"
      mode="modal"
      screenOptions={{
        cardStyle: {
          backgroundColor: '#FFFFFF',
          marginHorizontal: 'auto',
          flex: 1,
          width: '100%',
          maxWidth: maxMain,
        },
      }}
    >
      <Stack.Screen
        name="Initialize"
        component={InitializeScreen}
        options={{ headerShown: false, title: 'Interchao' }}
      />
      <Stack.Screen name="CreateAccount" component={CreateAccountNavigator} />
      <Stack.Screen
        name="notfound"
        component={NotFoundScreen}
        options={{ headerShown: false, title: '404 NOT FOUND' }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
