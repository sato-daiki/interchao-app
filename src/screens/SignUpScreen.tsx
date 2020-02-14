import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Alert } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import { Space, SubmitButton } from '../components/atoms';
import { CheckTextInput } from '../components/molecules';
import {
  emailSignUp,
  goolgeSignUp,
  phoneSignUp,
  facebookSignUp,
} from '../utils/auth';
import {
  emailValidate,
  emaillExistCheck,
  emailInputError,
} from '../utils/inputCheck';
import {
  primaryColor,
  fontSizeM,
  fontSizeS,
  green,
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
 * 概要：アカウント登録画面
 */
const SignUpScreen: React.FC<Props & DispatchProps & OwnProps> = ({
  user,
  navigation,
  setUser,
}): JSX.Element => {
  const [isNextButtonLoading, setIsNextButtonLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const [isEmailCheckOk, setIsEmailCheckOk] = useState(false);
  const [isPasswordCheckOk, setIsPasswordCheckOk] = useState(false);

  const [email, setEmail] = useState('daiki0520daiki0520@yahoo.co.jp');
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

  const onEndEditingEmail = async (): Promise<void> | void => {
    if (email.length === 0) {
      setIsEmailCheckOk(false);
      setErrorEmail('');
      return;
    }

    if (emailValidate(email)) {
      setIsEmailCheckOk(false);
      setErrorEmail('メールアドレスの形式が正しくありません');
      return;
    }

    setIsEmailLoading(true);
    const res = await emaillExistCheck(email);
    if (res) {
      setIsEmailCheckOk(false);
      setErrorEmail('このメールアドレスはすでに登録されています');
    } else {
      setIsEmailCheckOk(true);
      setErrorEmail('');
    }
    setIsEmailLoading(false);
  };

  const onEndEditingPassword = (): void => {
    if (password.length === 0) {
      setIsPasswordCheckOk(false);
      setErrorPassword('');
    } else if (password.length > 0 && password.length < 6) {
      setIsPasswordCheckOk(false);
      setErrorPassword('パスワードは6桁以上で入力してください');
    } else {
      setIsPasswordCheckOk(true);
      setErrorPassword('');
    }
  };

  const clearErrorMessage = (): void => {
    setErrorEmail('');
    setErrorPassword('');
  };

  const errorSet = (error: any): void => {
    emailInputError(error, setErrorPassword, setErrorEmail, clearErrorMessage);
  };

  const onPressNext = async (): Promise<void> => {
    setIsNextButtonLoading(true);
    clearErrorMessage();
    const firebaseUser = await emailSignUp(email, password, errorSet);
    if (firebaseUser && firebaseUser.user) {
      setUser({
        id: firebaseUser.user.uid,
        email: firebaseUser.user.email,
      });
    }

    navigation.navigate('SelectLanguage');
    setIsNextButtonLoading(false);
  };

  const onPressFacebookSignIn = async (): Promise<void> => {
    const user = await facebookSignUp();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>メールアドレス</Text>
      <CheckTextInput
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
        isLoading={isEmailLoading}
        isCheckOk={isEmailCheckOk}
        errorMessage={errorEmail}
      />
      <Space size={16} />
      <Text style={styles.label}>パスワード（６ケタ以上）</Text>
      <CheckTextInput
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
        isCheckOk={isPasswordCheckOk}
        errorMessage={errorPassword}
      />

      <Space size={32} />
      <SubmitButton
        title="次へ"
        onPress={onPressNext}
        isLoading={isNextButtonLoading}
        disable={!(isEmailCheckOk && isPasswordCheckOk)}
      />
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
