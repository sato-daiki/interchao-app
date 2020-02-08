import React from 'react';
import { View, Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

/**
 * 概要：ログインしていないユーザの立ち上げ画面
 */
const InitializeScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  navigation,
}): JSX.Element => {
  const onPressSignUp = (): void => {
    navigation.navigate('SignUp');
  };
  const onPressSignIn = (): void => {
    navigation.navigate('SignIn');
  };

  return (
    <View>
      <Button title="SignUp" onPress={onPressSignUp} />
      <Button title="SignIn" onPress={onPressSignIn} />
    </View>
  );
};

export default InitializeScreen;
