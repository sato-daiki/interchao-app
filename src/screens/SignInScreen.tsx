import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingModal, Space, SubmitButton } from '../components/atoms';
import { CheckTextInput } from '../components/molecules';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { primaryColor, fontSizeM, linkBlue } from '../styles/Common';
import firebase from '../constants/firebase';
import { emailInputError, emailValidate } from '../utils/InputCheck';
import { setLogEvent, events } from '../utils/Analytics';

type ScreenType = React.ComponentType<NavigationStackScreenProps> & {
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
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 6,
  },
  forgetText: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
  linkText: {
    color: linkBlue,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

/**
 * 概要：ログイン画面
 */
const SignInScreen: ScreenType = ({ navigation }): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  useEffect((): void => {
    setLogEvent(events.OPENED_SIGN_IN);
  }, []);

  const clearErrorMessage = (): void => {
    setErrorEmail('');
    setErrorPassword('');
  };

  const onPressLogin = useCallback(() => {
    const f = async (): Promise<void> => {
      setIsLoading(true);
      clearErrorMessage();
      try {
        const credent = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (credent.user) {
          setLogEvent(events.SIGN_IN);
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
  }, [clearErrorMessage]);

  const onPressForget = useCallback(() => {
    navigation.navigate('ForegetPassword');
  }, [navigation]);

  const onEndEditingEmail = useCallback(() => {
    if (email.length === 0) {
      setErrorEmail('');
      return;
    }

    if (emailValidate(email)) {
      setErrorEmail('メールアドレスの形式が正しくありません');
    }
    setErrorEmail('');
  }, [email, setErrorEmail]);

  const onEndEditingPassword = useCallback(() => {
    setErrorPassword('');
  }, [setErrorPassword]);

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
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
        errorMessage={errorEmail}
      />
      <Space size={16} />
      <Text style={styles.label}>パスワード</Text>
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
        errorMessage={errorPassword}
      />
      <Space size={32} />
      <SubmitButton
        title="ログイン"
        onPress={onPressLogin}
        disable={
          errorEmail !== '' ||
          errorPassword !== '' ||
          email === '' ||
          password === ''
        }
      />
      <Space size={16} />
      <View style={styles.row}>
        <Text style={styles.forgetText}>パスワードをお忘れの方は</Text>
        <TouchableOpacity onPress={onPressForget}>
          <Text style={styles.linkText}>こちら</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

SignInScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: 'ログイン',
  };
};

export default SignInScreen;
