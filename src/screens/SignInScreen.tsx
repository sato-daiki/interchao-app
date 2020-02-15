import React, { useState } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
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
 * 概要：ログイン画面
 */
const SignInScreen: React.FC<Props & DispatchProps & OwnProps> = ({
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

  const onEndEditingEmail = async (): Promise<void> | void => {};

  const onEndEditingPassword = (): void => {};

  const clearErrorMessage = (): void => {};

  const errorSet = (error: any): void => {};

  const onPressSubmit = async (): Promise<void> => {};

  const onPressFacebook = async (): Promise<void> => {};

  const onPressGoolge = async (): Promise<void> => {};

  const onPressForget = () => {};

  return (
    <SignInUpForm
      isSignUp={false}
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
      onPressForget={onPressForget}
    />
  );
};

export default SignInScreen;
