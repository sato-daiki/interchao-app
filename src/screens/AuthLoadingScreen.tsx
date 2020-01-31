import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import firebase from 'firebase';

/**
 * 概要：初期ローデンング
 */
const AuthLoadingScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  navigation,
}): JSX.Element => {
  const goToNavigation = user => {
    if (user) {
      navigation.navigate('SignUp');
      // navigation.navigate('MyPage');
    } else {
      navigation.navigate('SignUp');
    }
  };

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(goToNavigation);
  };

  useEffect(() => {
    checkIfLoggedIn();
  });

  return <View />;
};

export default AuthLoadingScreen;
