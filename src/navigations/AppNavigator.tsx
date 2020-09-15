import React from 'react';
import * as Linking from 'expo-linking';

import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import AuthLoadingScreenContainer from '../containers/AuthLoadingScreenContainer';
import { getConfig } from './root';

const prefix = Linking.makeUrl('/');

const linking = {
  prefixes: [prefix],
  config: getConfig(),
} as LinkingOptions;

const AppNavigator = (): JSX.Element => {
  return (
    <NavigationContainer linking={linking}>
      <AuthLoadingScreenContainer />
    </NavigationContainer>
  );
};

export default AppNavigator;
