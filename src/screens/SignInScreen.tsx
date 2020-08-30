import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  LoadingModal,
  Space,
  SubmitButton,
  HeaderLeft,
} from '../components/atoms';
import { CheckTextInput } from '../components/molecules';
import {
  DefaultNavigationOptions,
  DefaultAuthLayoutOptions,
} from '../constants/NavigationOptions';
import { primaryColor, fontSizeM, linkBlue } from '../styles/Common';
import firebase from '../constants/firebase';
import { emailInputError, emailValidate } from '../utils/common';
import { track, events } from '../utils/Analytics';
import I18n from '../utils/I18n';
import DefaultLayout from '../components/template/DefaultLayout';

type ScreenType = React.ComponentType<NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  main: {
    flex: 1,
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
    track(events.OPENED_SIGN_IN);
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
          track(events.SIGN_IN);
          navigation.navigate('MainTab');
        }
      } catch (err) {
        emailInputError(
          err,
          setErrorPassword,
          setErrorEmail,
          clearErrorMessage
        );
        setIsLoading(false);
      }
    };
    f();
  }, [email, navigation, password]);

  const onPressForget = useCallback(() => {
    navigation.navigate('ForegetPassword');
  }, [navigation]);

  const onBlurEmail = useCallback(() => {
    if (email.length === 0) {
      setErrorEmail('');
      return;
    }

    if (emailValidate(email)) {
      setErrorEmail(I18n.t('signIn.invalidEmail'));
    }
    setErrorEmail('');
  }, [email, setErrorEmail]);

  const onBlurPassword = useCallback(() => {
    setErrorPassword('');
  }, [setErrorPassword]);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <DefaultLayout>
        <View style={styles.main}>
          <LoadingModal visible={isLoading} />

          <Text style={styles.label}>{I18n.t('signIn.email')}</Text>
          <CheckTextInput
            autoFocus
            value={email}
            onChangeText={(text: string): void => setEmail(text)}
            onBlur={onBlurEmail}
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
          <Text style={styles.label}>{I18n.t('signIn.password')}</Text>
          <CheckTextInput
            value={password}
            onChangeText={(text: string): void => setPassword(text)}
            onBlur={onBlurPassword}
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
            title={I18n.t('signIn.login')}
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
            <Text style={styles.forgetText}>{I18n.t('signIn.forgetText')}</Text>
            <TouchableOpacity onPress={onPressForget}>
              <Text style={styles.linkText}>{I18n.t('signIn.link')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DefaultLayout>
    </KeyboardAwareScrollView>
  );
};

SignInScreen.navigationOptions = ({ navigation }): NavigationStackOptions => {
  const headerLeftOptions =
    Platform.OS === 'web'
      ? {
          headerLeft: (): JSX.Element => (
            <HeaderLeft
              text={I18n.t('common.close')}
              onPress={(): void => {
                navigation.navigate('Initialize');
              }}
            />
          ),
        }
      : {};

  return {
    ...DefaultNavigationOptions,
    ...DefaultAuthLayoutOptions,
    ...headerLeftOptions,
    title: I18n.t('signIn.headerTitle'),
  };
};

export default SignInScreen;
