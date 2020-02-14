import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Alert } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import { Space, SubmitButton, ErrorTextInput } from '../components/atoms';
import {
  emailSignUp,
  goolgeSignUp,
  phoneSignUp,
  facebookSignUp,
} from '../utils/auth';
import { emailValidate } from '../utils/inputCheck';
import {
  primaryColor,
  fontSizeM,
  fontSizeS,
  offWhite,
  borderLightColor,
  subTextColor,
} from '../styles/Common';
import { User } from '../types/user';

interface OwnProps {
  navigation: NavigationStackProp;
}

export interface Props {
  user: User;
}

export interface DispatchProps {
  setUser: (user: User) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 6,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  subText: {
    textAlign: 'center',
    color: subTextColor,
    fontSize: fontSizeS,
    paddingHorizontal: 16,
  },
});

/**
 * 概要：ログインしていないユーザの立ち上げ画面
 */
const SignUpScreen: React.FC<Props & DispatchProps & OwnProps> = ({
  user,
  navigation,
  setUser,
}): JSX.Element => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  // const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);

  // const onPressSignUp = (): void => {
  //   emailSignUp(email, password);
  // };

  const onPressGoolgeSignUp = async (): Promise<void> => {
    await goolgeSignUp();
  };

  const onEndEditingEmail = (): void => {
    if (email.length === 0) {
      setErrorEmail('');
    } else if (emailValidate(email)) {
      setErrorEmail('メールアドレスの形式が正しくありません');
    } else {
      setErrorEmail('');
    }
  };

  const onEndEditingPassword = (): void => {
    if (password.length > 0 && password.length < 6) {
      setErrorPassword('パスワードは6桁以上で入力してください');
    } else {
      setErrorPassword('');
    }
  };

  const clearErrorMessage = (): void => {
    setErrorEmail('');
    setErrorPassword('');
  };

  const errorSet = (error: any): void => {
    const errorCode = error.code;
    const errorMessage = error.message;

    switch (errorCode) {
      case 'auth/weak-password':
        setErrorPassword('パスワードが弱いです');
        break;
      case 'auth/invalid-email':
        setErrorEmail('メールアドレスの形式が正しくありません');
        break;
      case 'auth/email-already-in-use':
        setErrorEmail('このメールアドレスはすでに登録されています');
        break;
      case 'auth/network-request-failed':
        Alert.alert(
          'エラー',
          'ネットワークエラーです。電波のいい箇所で再度お試しください'
        );
        clearErrorMessage();
        break;
      default:
        Alert.alert('エラー', 'エラーが発生しました。', error);
        clearErrorMessage();
    }
  };

  const onPressNext = async (): Promise<void> => {
    clearErrorMessage();
    const newUser = await emailSignUp(email, password, errorSet);
    setUser(newUser);
  };

  const onPressFacebookSignIn = async (): Promise<void> => {
    const user = await facebookSignUp();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>メールアドレス</Text>
      <ErrorTextInput
        value={email}
        onChangeText={(text: string): void => setEmail(text)}
        onEndEditing={onEndEditingEmail}
        maxLength={50}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        returnKeyType="done"
        errorMessage={errorEmail}
      />
      <Space size={16} />
      <Text style={styles.label}>パスワード（６ケタ以上）</Text>
      <ErrorTextInput
        value={password}
        onChangeText={(text: string): void => setPassword(text)}
        onEndEditing={onEndEditingPassword}
        maxLength={20}
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        secureTextEntry
        returnKeyType="done"
        errorMessage={errorPassword}
      />

      <Space size={32} />
      <SubmitButton title="次へ" onPress={onPressNext} />
      <Space size={32} />
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.subText}>もしくは</Text>
        <View style={styles.line} />
      </View>
      <Space size={32} />
      <SubmitButton title="Facebook Login" onPress={onPressFacebookSignIn} />
      <Space size={16} />
      <SubmitButton title="GoogleSignUp" onPress={onPressGoolgeSignUp} />
    </View>
  );
};

export default SignUpScreen;
