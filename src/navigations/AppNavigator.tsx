import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthLoadingScreenContainer from '../containers/AuthLoadingScreenContainer';

const AppNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <AuthLoadingScreenContainer />
    </NavigationContainer>
  );
};

export default AppNavigator;
