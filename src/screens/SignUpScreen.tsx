import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import {
  emailInputError,
  emailValidate,
  emaillExistCheck,
} from '../utils/InputCheck';
import firebase from '../constants/firebase';
import { User } from '../types/user';
import { Profile } from '../types';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { CheckTextInput } from '../components/molecules';
import {
  Space,
  SubmitButton,
  HeaderText,
  LoadingModal,
} from '../components/atoms';
import {
  primaryColor,
  fontSizeM,
  subTextColor,
  fontSizeL,
} from '../styles/Common';
import { track, events } from '../utils/Analytics';

interface Props {
  user: User;
  profile: Profile;
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
    paddingTop: 32,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    paddingBottom: 16,
  },
  subText: {
    color: subTextColor,
    fontSize: fontSizeM,
    paddingBottom: 16,
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
const SignUpScreen: ScreenType = ({ navigation, profile }): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const [isEmailCheckOk, setIsEmailCheckOk] = useState(false);
  const [isPasswordCheckOk, setIsPasswordCheckOk] = useState(false);

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  useEffect((): void => {
    track(events.OPENED_SIGN_UP);
  }, []);

  const clearErrorMessage = (): void => {
    setErrorEmail('');
    setErrorPassword('');
  };

  const createUser = async (credentUser: firebase.User): Promise<void> => {
    const userInfo = {
      premium: false,
      confirmDiary: false,
      confirmReview: false,
      points: 100,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

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

    const batch = firebase.firestore().batch();
    batch.set(firebase.firestore().doc(`users/${credentUser.uid}`), userInfo);
    batch.set(
      firebase.firestore().doc(`profiles/${credentUser.uid}`),
      profileInfo
    );
    batch.commit();
  };

  const onPressSkip = useCallback(() => {
    const f = async (): Promise<void> => {
      setIsLoading(true);
      clearErrorMessage();
      try {
        const credent = await firebase.auth().signInAnonymously();
        if (credent.user) {
          await createUser(credent.user);
          track(events.CREATED_USER, { loginMethod: 'anonymously' });
        }
      } catch (error) {
        emailInputError(
          error,
          setErrorPassword,
          setErrorEmail,
          clearErrorMessage
        );
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    f();
  }, [clearErrorMessage, createUser]);

  useEffect(() => {
    navigation.setParams({ onPressSkip });
  }, []);

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      setIsLoading(true);
      clearErrorMessage();
      try {
        const credent = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (credent.user) {
          await createUser(credent.user);

          track(events.CREATED_USER, { loginMethod: 'email' });
          setIsLoading(false);
        }
      } catch (error) {
        emailInputError(
          error,
          setErrorPassword,
          setErrorEmail,
          clearErrorMessage
        );
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    f();
  }, [clearErrorMessage, createUser]);

  const onEndEditingEmail = useCallback(() => {
    const f = async (): Promise<void> => {
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
    f();
  }, [email, setIsEmailCheckOk, setErrorEmail, setIsEmailLoading]);

  const onEndEditingPassword = useCallback(() => {
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
  }, [password, setIsPasswordCheckOk, setErrorPassword]);

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <Text style={styles.title}>
        メールアドレスとパスワードを入力してください
      </Text>
      <Text style={styles.subText}>
        機種変更時などのデータの引き継ぎに必要になります。あとでも登録できます。
      </Text>
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
