import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { emailSignup, goolgeSignUp } from '../utils/auth';

type Props = {
  navigation: NavigationStackProp;
};

/**
 * 概要：ログインしていないユーザの立ち上げ画面
 */
const SignUpScreen: React.FC<Props> = ({ navigation }: Props): JSX.Element => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onChangedEmail = (textEmail: string): void => {
    setEmail(textEmail);
  };

  const onChangedPassword = (textPassword: string): void => {
    setPassword(textPassword);
  };

  const onPressSignUp = (): void => {
    emailSignup(email, password);
  };

  const onPressGoolgeSignUp = async () => {
    goolgeSignUp();
  };

  return (
    <View>
      <TextInput
        value={email}
        onChangeText={onChangedEmail}
        editable
        maxLength={50}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="done"
      />
      <TextInput
        value={password}
        onChangeText={onChangedPassword}
        editable
        maxLength={20}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
        returnKeyType="done"
      />
      <Button title="SignUp" onPress={onPressSignUp} />
      <Button title="GoogleSignUp" onPress={onPressGoolgeSignUp} />

      <Text
        onPress={(): void => {
          navigation.navigate('SignIn');
        }}
      >
        SignIn
      </Text>
    </View>
  );
};

export default SignUpScreen;
