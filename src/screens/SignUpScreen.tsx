import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'expo';
import { emailSignup, goolgeSignUp, phoneSignUp } from '../utils/auth';
import firebase from '../configs/firebase';

type Props = {
  navigation: NavigationStackProp;
};

/**
 * 概要：ログインしていないユーザの立ち上げ画面
 */
const SignUpScreen: React.FC<Props> = ({ navigation }: Props): JSX.Element => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+81 70-2650-9668');
  const [confirmResult, setConfirmResult] = useState(null);

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

  // const onPressPhoneSignUp = (): void => {
  //   phoneSignUp();
  // };

  const onPressPhoneSignUp = async (): void => {
    const captchaUrl = `https://white-zebra-dev.firebaseapp.com/captcha.html?appurl=${Linking.makeUrl(
      ''
    )}`;

    let token = null;
    const listener = ({ url }) => {
      WebBrowser.dismissBrowser();
      const tokenEncoded = Linking.parse(url).queryParams.token;
      if (tokenEncoded) token = decodeURIComponent(tokenEncoded);
    };
    Linking.addEventListener('url', listener);
    await WebBrowser.openBrowserAsync(captchaUrl);
    Linking.removeEventListener('url', listener);
    if (token) {
      // fake firebase.auth.ApplicationVerifier
      const captchaVerifier = {
        type: 'recaptcha',
        verify: () => Promise.resolve(token),
      };
      try {
        const confirmationResult = await firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, captchaVerifier);
        setConfirmResult(confirmationResult);
        setMessage('sucsecc');
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const confirmCode = () => {
    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          setMessage('Code Confirmed!');
        })
        .catch(error => setMessage(`Code Confirm Error: ${error.message}`));
    }
  };

  const renderVerificationCodeInput = () => {
    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => setCodeInput(value)}
          placeholder="Code ... "
          value={codeInput}
        />
        <Button title="Confirm Code" color="#841584" onPress={confirmCode} />
      </View>
    );
  };

  const renderPhoneNumberInput = () => {
    return (
      <View style={{ padding: 25 }}>
        <TextInput
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          editable
          maxLength={50}
          placeholder="Phone"
          autoCapitalize="none"
          keyboardType="phone-pad"
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
        <Button title="PhoneSignUp" onPress={onPressPhoneSignUp} />
      </View>
    );
  };

  return (
    <View>
      {/* <TextInput
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
    */}

      {!user && !confirmResult && renderPhoneNumberInput()}

      {message ? (
        <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>
          {message}
        </Text>
      ) : null}

      {!user && confirmResult && renderVerificationCodeInput()}

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
