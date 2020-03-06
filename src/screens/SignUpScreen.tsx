import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { emailSignUp, anonymouslySignUp } from '../libs/auth';
import {
  emailValidate,
  emaillExistCheck,
  emailInputError,
} from '../utils/inputCheck';
import firebase from '../configs/firebase';
import { User } from '../types/user';
import { Profile } from '../types';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { CheckTextInput } from '../components/molecules';
import { Space, SubmitButton, HeaderText } from '../components/atoms';
import { primaryColor, fontSizeM } from '../styles/Common';

interface Props {
  user: User;
  profile: Profile;
  setUser: (user: User) => void;
  setProfile: (profile: Profile) => void;
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

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
});

/**
 * 概要：アカウント登録画面
 */
const SignUpScreen: ScreenType = ({
  navigation,
  profile,
  setUser,
  setProfile,
}): JSX.Element => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const [isEmailCheckOk, setIsEmailCheckOk] = useState(false);
  const [isPasswordCheckOk, setIsPasswordCheckOk] = useState(false);

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const clearErrorMessage = (): void => {
    setErrorEmail('');
    setErrorPassword('');
  };

  const errorSet = (error: any): void => {
    emailInputError(error, setErrorPassword, setErrorEmail, clearErrorMessage);
  };

  const onPressSkip = async (): Promise<void> => {
    setIsSubmitLoading(true);
    clearErrorMessage();
    const firebaseUser = await anonymouslySignUp();

    // userをfirestoreに初期登録
    if (firebaseUser) {
      const userInfo = {
        premium: false,
        confirmDiary: false,
        confirmReview: false,
        email: '',
        points: 100,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await firebase
        .firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .set(userInfo);

      // profileをfirestoreに初期登録
      const profileInfo = {
        name: '',
        userName: profile.userName,
        photoUrl: '',
        pro: false,
        learnLanguage: profile.learnLanguage,
        nativeLanguage: profile.nativeLanguage,
        introduction: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await firebase
        .firestore()
        .collection('profiles')
        .doc(firebaseUser.uid)
        .set(profileInfo);

      // reduxに登録
      setUser({ uid: firebaseUser.uid, ...userInfo });
      setProfile({ uid: firebaseUser.uid, ...profileInfo });
    }
    navigation.navigate('Home');
    setIsSubmitLoading(false);
  };

  useEffect(() => {
    navigation.setParams({ onPressSkip });
  }, []);

  const onEndEditingEmail = async (): Promise<void> => {
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

  const onPressSubmit = async (): Promise<void> => {
    setIsSubmitLoading(true);
    clearErrorMessage();
    const firebaseUser = await emailSignUp(email, password, errorSet);

    // userをfirestoreに初期登録
    if (firebaseUser) {
      const userInfo = {
        premium: false,
        confirmDiary: false,
        confirmReview: false,
        email: firebaseUser.email,
        points: 100,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await firebase
        .firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .set(userInfo);

      // profileをfirestoreに初期登録
      const profileInfo = {
        name: '',
        userName: profile.userName,
        photoUrl: '',
        pro: false,
        learnLanguage: profile.learnLanguage,
        nativeLanguage: profile.nativeLanguage,
        introduction: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await firebase
        .firestore()
        .collection('profiles')
        .doc(firebaseUser.uid)
        .set(profileInfo);

      // reduxに登録
      setUser({ uid: firebaseUser.uid, ...userInfo });
      setProfile({ uid: firebaseUser.uid, ...profileInfo });
    }
    navigation.navigate('Home');
    setIsSubmitLoading(false);
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
        title="登録"
        onPress={onPressSubmit}
        isLoading={isSubmitLoading}
        disable={!(isEmailCheckOk && isPasswordCheckOk)}
      />
      <Space size={16} />
    </View>
  );
};

SignUpScreen.navigationOptions = ({ navigation }): NavigationStackOptions => {
  const onPressSkip = navigation.getParam('onPressSkip');
  return {
    ...DefaultNavigationOptions,
    title: 'メールアドレス登録',
    headerRight: (): JSX.Element => (
      <HeaderText title="Skip" onPress={onPressSkip} />
    ),
  };
};

export default SignUpScreen;
