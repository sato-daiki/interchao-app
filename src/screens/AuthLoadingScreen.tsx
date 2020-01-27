import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

/**
 * 概要：初期ローデンング
 */
const AuthLoadingScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  navigation,
}): JSX.Element => {
  useEffect((): void => {
    navigation.navigate('SignUp');
  });
  return <View />;
};

export default AuthLoadingScreen;
