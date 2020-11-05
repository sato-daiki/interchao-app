import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackScreenProps } from '@react-navigation/stack';
import {
  LoadingModal,
  Space,
  SubmitButton,
  Hoverable,
} from '../components/atoms';
import { CheckTextInput } from '../components/molecules';
import { primaryColor, fontSizeM, linkBlue } from '../styles/Common';
import firebase from '../constants/firebase';
import { emailInputError, emailValidate } from '../utils/common';
import { track, events } from '../utils/Analytics';
import I18n from '../utils/I18n';
import { AuthStackParamList } from '../navigations/AuthNavigator';

type ScreenType = StackScreenProps<AuthStackParamList, 'SignIn'>;

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
  hoverLink: {
    borderBottomColor: linkBlue,
    borderBottomWidth: 1,
  },
});

/**
 * 概要：ログイン画面
 */
const SignInScreen: React.FC<ScreenType> = ({ navigation }) => {
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

  const onPressLogin = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    clearErrorMessage();
    try {
      const credent = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (credent.user) {
        track(events.SIGN_IN);
        // const user = await getUser(credent.user.uid);
        // const profile = await getProfile(credent.user.uid);
        // setUser(user);
        // setProfile(profile);
        // navigation.navigate('MainTab');
      }
    } catch (err) {
      emailInputError(err, setErrorPassword, setErrorEmail, clearErrorMessage);
      setIsLoading(false);
    }
  }, [email, password]);

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
          <Hoverable onPress={onPressForget} hoverStyle={styles.hoverLink}>
            <Text style={styles.linkText}>{I18n.t('signIn.link')}</Text>
          </Hoverable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;
