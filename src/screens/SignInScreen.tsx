import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { emailSignin, facebookSignin } from '../utils/auth';

type Props = {
  navigation: NavigationStackProp;
};

/**
 * 概要：ログイン画面
 */
const SignInScreen: React.FC<Props> = ({ navigation }: Props): JSX.Element => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onChangedEmail = (textEmail: string): void => {
    setEmail(textEmail);
  };

  const onChangedPassword = (textPassword: string): void => {
    setPassword(textPassword);
  };

  const onPressEmailSignIn = (): void => {
    emailSignin(email, password);
  };

  const onPressFacebookSignIn = async (): Promise<void> => {
    const user = await facebookSignin();
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
      <Button title="SignIn" onPress={onPressEmailSignIn} />
      <Text
        onPress={(): void => {
          navigation.navigate('SignUp');
        }}
      >
        SignUp
      </Text>
      <Button title="Facebook Login" onPress={onPressFacebookSignIn} />
    </View>
  );
};

export default SignInScreen;
