import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { emailInputError, emailValidate } from '../utils/InputCheck';
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
import ModalSendEmail from '../components/organisms/ModalSendEmail';
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

const ForegetPasswordScreen: ScreenType = ({ navigation }): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const clearErrorMessage = (): void => {
    setErrorEmail('');
  };

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      clearErrorMessage();
      try {
        setIsLoading(true);
        await firebase.auth().sendPasswordResetEmail(email);
        setIsModal(true);
      } catch (err) {
        emailInputError(err, _ => {}, setErrorEmail, clearErrorMessage);
      }
      setIsLoading(false);
    };
    f();
  }, [email]);

  const onEndEditingEmail = useCallback(() => {
    const f = async (): Promise<void> => {
      if (email.length === 0) {
        setErrorEmail('');
        return;
      }
      if (emailValidate(email)) {
        setErrorEmail(I18n.t('errorMessage.invalidEmail'));
      }
      setErrorEmail('');
    };
    f();
  }, [email, setErrorEmail]);

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <ModalSendEmail
        visible={isModal}
        onPressClose={(): boolean => navigation.goBack()}
      />
      <Text style={styles.title}>{I18n.t('foregetPassword.title')}</Text>
      <Text style={styles.subText}>{I18n.t('foregetPassword.subText')}</Text>
      <Text style={styles.label}>{I18n.t('foregetPassword.email')}</Text>
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
      <Space size={32} />
      <SubmitButton
        title={I18n.t('common.sending')}
        onPress={onPressSubmit}
        disable={errorEmail !== '' || email === ''}
      />
      <Space size={16} />
    </View>
  );
};

ForegetPasswordScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('foregetPassword.headerTitle'),
  };
};

export default ForegetPasswordScreen;
