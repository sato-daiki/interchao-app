import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  emailInputError,
  emailValidate,
  emaillExistCheck,
} from '../utils/common';
import firebase from '../constants/firebase';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { CheckTextInput } from '../components/molecules';
import { Space, SubmitButton, LoadingModal } from '../components/atoms';
import {
  primaryColor,
  fontSizeM,
  fontSizeL,
  subTextColor,
} from '../styles/Common';
import I18n from '../utils/I18n';

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
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    paddingBottom: 16,
    lineHeight: fontSizeL * 1.3,
  },
  subText: {
    color: subTextColor,
    fontSize: fontSizeM,
    paddingBottom: 16,
    lineHeight: fontSizeM * 1.3,
  },
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 6,
  },
});

const RegisterEmailPasswordScreen: ScreenType = ({
  navigation,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
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

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      clearErrorMessage();
      try {
        const { currentUser } = firebase.auth();
        if (!currentUser) {
          return;
        }
        setIsLoading(true);
        await currentUser.updateEmail(email);
        await currentUser.updatePassword(password);

        setIsLoading(false);
        navigation.navigate('MyPage');
      } catch (err) {
        emailInputError(
          err,
          setErrorPassword,
          setErrorEmail,
          clearErrorMessage
        );
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    f();
  }, [email, navigation, password]);

  const onEndEditingEmail = useCallback(() => {
    const f = async (): Promise<void> => {
      if (email.length === 0) {
        setIsEmailCheckOk(false);
        setErrorEmail('');
        return;
      }

      if (emailValidate(email)) {
        setIsEmailCheckOk(false);
        setErrorEmail(I18n.t('errorMessage.invalidEmail'));
        return;
      }

      setIsEmailLoading(true);
      const res = await emaillExistCheck(email);

      if (res) {
        setIsEmailCheckOk(false);
        setErrorEmail(I18n.t('errorMessage.emailAlreadyInUse'));
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
      setErrorPassword(I18n.t('errorMessage.weakPassword'));
    } else {
      setIsPasswordCheckOk(true);
      setErrorPassword('');
    }
  }, [password, setIsPasswordCheckOk, setErrorPassword]);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.main}>
        <LoadingModal visible={isLoading} />
        <Text style={styles.title}>
          {I18n.t('registerEmailPassword.title')}
        </Text>
        <Text style={styles.subText}>
          {I18n.t('registerEmailPassword.subText')}
        </Text>
        <Text style={styles.label}>
          {I18n.t('registerEmailPassword.email')}
        </Text>
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
        <Text style={styles.label}>
          {I18n.t('registerEmailPassword.password')}
        </Text>
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
          title={I18n.t('common.register')}
          onPress={onPressSubmit}
          disable={!isEmailCheckOk}
        />
        <Space size={16} />
      </View>
    </KeyboardAwareScrollView>
  );
};

RegisterEmailPasswordScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('registerEmailPassword.headerTitle'),
  };
};

export default RegisterEmailPasswordScreen;
