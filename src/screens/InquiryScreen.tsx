import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-gesture-handler';
import { Space, SubmitButton, LoadingModal } from '../components/atoms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import firebase from '../constants/firebase';
import { Profile, Inquiry as InquiryType } from '../types';
import I18n from '../utils/I18n';
import { emailValidate } from '../utils/common';
import {
  primaryColor,
  fontSizeM,
  fontSizeL,
  borderLightColor,
  offWhite,
} from '../styles/Common';
import { alert } from '../utils/ErrorAlert';
import { ModalConfirm } from '../components/organisms';

export interface Props {
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
  },
  main: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: fontSizeM,
    color: primaryColor,
    marginBottom: 8,
  },
  textInput: {
    width: '100%',
    fontSize: fontSizeM,
    color: primaryColor,
    paddingLeft: 16,
    paddingRight: 46,
    paddingVertical: 14,
    textAlignVertical: 'top',
    backgroundColor: offWhite,
    borderRadius: 6,
    borderColor: borderLightColor,
    marginBottom: 16,
  },
  message: {
    height: 300,
    paddingTop: 16,
  },
  successContainer: {
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  thanksTitle: {
    textAlign: 'center',
    fontSize: fontSizeL,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 8,
  },
  thanksText: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
    marginBottom: 32,
  },
});

/**
 * 添削中
 */
const InquiryScreen: ScreenType = ({ navigation, profile }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isModalError, setIsModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const { currentUser } = firebase.auth();
    if (currentUser && currentUser.email) {
      setEmail(currentUser.email);
    }
  }, []);

  const checkValidate = useCallback((): boolean => {
    if (email.length === 0) {
      setErrorMessage(I18n.t('errorMessage.emptyEmail'));
      setIsModalError(true);
      return false;
    }

    if (message.length === 0) {
      setErrorMessage(I18n.t('errorMessage.emptyMessage'));
      setIsModalError(true);
      return false;
    }

    if (emailValidate(email)) {
      setErrorMessage(I18n.t('errorMessage.invalidEmail'));
      setIsModalError(true);
      return false;
    }
    return true;
  }, [email, message.length]);

  const onPressSend = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isLoading) return;
      if (!checkValidate()) return;

      setIsLoading(true);
      setIsSuccess(false);

      try {
        await firebase
          .firestore()
          .collection(`inquiries`)
          .add({
            uid: profile.uid,
            userName: profile.userName,
            nativeLanguage: profile.nativeLanguage,
            email,
            message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          } as InquiryType);
        setIsLoading(false);
        setIsSuccess(true);
      } catch (err) {
        alert({ err });
        setIsLoading(false);
        setIsSuccess(false);
      }
    };
    f();
  }, [checkValidate, email, isLoading, message, profile]);

  const onPressCloseError = (): void => {
    setErrorMessage('');
    setIsModalError(false);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <LoadingModal visible={isLoading} />
      <ModalConfirm
        visible={isModalError}
        title={I18n.t('common.error')}
        message={errorMessage}
        mainButtonText={I18n.t('common.close')}
        onPressMain={onPressCloseError}
      />
      {!isSuccess ? (
        <View style={styles.main}>
          <Text style={styles.label}>{I18n.t('inquiry.email')}</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={(text: string): void => setEmail(text)}
            maxLength={50}
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType="done"
          />
          <Text style={styles.label}>{I18n.t('inquiry.message')}</Text>
          <TextInput
            style={[styles.textInput, styles.message]}
            multiline
            value={message}
            onChangeText={(text: string): void => setMessage(text)}
            maxLength={500}
            placeholder="Enter your message"
            spellCheck
            autoCorrect
            underlineColorAndroid="transparent"
            returnKeyType="done"
          />
          <Space size={32} />
          <SubmitButton
            title={I18n.t('common.sending')}
            onPress={onPressSend}
          />
        </View>
      ) : (
        <View style={styles.successContainer}>
          <Text style={styles.thanksTitle}>{I18n.t('inquiry.title')}</Text>
          <Text style={styles.thanksText}>{I18n.t('inquiry.thanks')}</Text>
          <SubmitButton
            title={I18n.t('common.back')}
            onPress={(): void => {
              navigation.goBack();
            }}
          />
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

InquiryScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('inquiry.headerTitle'),
  };
};

export default InquiryScreen;
