import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import {
  emailSignUp,
  goolgeSignUp,
  phoneSignUp,
  facebookSignUp,
} from '../utils/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  textInput: {
    fontSize: 14,
    color: 'black',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    margin: 16,
  },
});

/**
 * 概要：ログインしていないユーザの立ち上げ画面
 */
const SignUpScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  navigation,
}): JSX.Element => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);

  // const onPressSignUp = (): void => {
  //   emailSignUp(email, password);
  // };

  const onPressGoolgeSignUp = async (): Promise<void> => {
    await goolgeSignUp();
  };

  const onPressPhoneSignUp = async (): Promise<void> => {
    const result = await phoneSignUp(phoneNumber);
    if (result) {
      setConfirmResult(result);
      navigation.navigate('VerificationCode', { confirmResult: result });
    } else {
      console.log('error');
    }
  };

  const onPressFacebookSignIn = async (): Promise<void> => {
    const user = await facebookSignUp();
    console.log(user);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={(text: string): void => setEmail(text)}
        editable
        maxLength={50}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="done"
      />
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={(text: string): void => setPassword(text)}
        editable
        maxLength={20}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
        returnKeyType="done"
      />
      <Button title="登録" onPress={(): void => emailSignUp(email, password)} />

      <TextInput
        style={styles.textInput}
        value={phoneNumber}
        onChangeText={(text: string): void => setPhoneNumber(text)}
        editable
        maxLength={50}
        placeholder="Phone"
        autoCapitalize="none"
        keyboardType="phone-pad"
        returnKeyType="done"
      />
      <Button title="PhoneSignUp" onPress={onPressPhoneSignUp} />

      <Button title="Facebook Login" onPress={onPressFacebookSignIn} />

      <Button title="GoogleSignUp" onPress={onPressGoolgeSignUp} />

      {/* {!user && confirmResult && renderVerificationCodeInput()} */}
      {/*

      <Text
        onPress={(): void => {
          navigation.navigate('SignIn');
        }}
      >
        SignIn
      </Text> */}
    </View>
  );
};

export default SignUpScreen;
