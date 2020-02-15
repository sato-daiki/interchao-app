import React, { useState } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { emailSignUp, goolgeSignUp, facebookSignUp } from '../utils/auth';
import {
  emailValidate,
  emaillExistCheck,
  emailInputError,
} from '../utils/inputCheck';

import { User } from '../types/user';
import SignInUpForm from '../components/organisms/SignInUpForm';

interface OwnProps {
  navigation: NavigationStackProp;
}

export interface Props {
  user: User;
}

export interface DispatchProps {
  setUser: (user: User) => void;
}

/**
 * 概要：アカウント登録画面
 */
const SignUpScreen: React.FC<Props & DispatchProps & OwnProps> = ({
  navigation,
  setUser,
}): JSX.Element => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const [isEmailCheckOk, setIsEmailCheckOk] = useState(false);
  const [isPasswordCheckOk, setIsPasswordCheckOk] = useState(false);

  const [email, setEmail] = useState('daiki0520daiki0520@yahoo.co.jp');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

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

  const onPressSubmit = async (): Promise<void> => {
    setIsSubmitLoading(true);
    clearErrorMessage();
    const firebaseUser = await emailSignUp(email, password, errorSet);
    if (firebaseUser && firebaseUser.user) {
      setUser({
        id: firebaseUser.user.uid,
        email: firebaseUser.user.email,
      });
    }

    navigation.navigate('SelectLanguage');
    setIsSubmitLoading(false);
  };

  const onPressFacebook = async (): Promise<void> => {
    setIsFacebookLoading(true);
    const user = await facebookSignUp();
    setIsFacebookLoading(false);
  };

  const onPressGoolge = async (): Promise<void> => {
    setIsGoogleLoading(true);
    await goolgeSignUp();
    setIsGoogleLoading(false);
  };

  return (
    <SignInUpForm
      isSignUp
      isEmailLoading={isEmailLoading}
      isSubmitLoading={isSubmitLoading}
      isFacebookLoading={isFacebookLoading}
      isGoogleLoading={isGoogleLoading}
      isEmailCheckOk={isEmailCheckOk}
      isPasswordCheckOk={isPasswordCheckOk}
      email={email}
      password={password}
      errorEmail={errorEmail}
      errorPassword={errorPassword}
      onChangeTextEmail={(text: string): void => setEmail(text)}
      onChangePassword={(text: string): void => setPassword(text)}
      onEndEditingEmail={onEndEditingEmail}
      onEndEditingPassword={onEndEditingPassword}
      onPressSubmit={onPressSubmit}
      onPressFacebook={onPressFacebook}
      onPressGoolge={onPressGoolge}
    />
  );
};

export default SignUpScreen;
