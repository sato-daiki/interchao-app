import React, { useState, useEffect, useCallback } from 'react';
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
import { User } from '../types/user';
import { Profile, UserReview } from '../types';
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
import I18n from '../utils/I18n';

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

  const clearErrorMessage = useCallback((): void => {
    setErrorEmail('');
    setErrorPassword('');
  }, []);

  const createUser = useCallback(
    async (credentUser: firebase.User): Promise<void> => {
      const userInfo = {
        premium: false,
        diaryPosted: false,
        tutorialPostDiary: false,
        tutorialTeachDiaryList: false,
        tutorialCorrectiong: false,
        points: 100,
        expoPushToken: null,
        correctingObjectID: null,
        notificationCorrection: true,
        notificationReview: true,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      } as User;

      const profileInfo = {
        name: null,
        userName: profile.userName,
        photoUrl: null,
        pro: false,
        learnLanguage: profile.learnLanguage,
        nativeLanguage: profile.nativeLanguage,
        introduction: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      } as Profile;

      const userReviewInfo = {
        ratingSum: 0,
        reviewNum: 0,
        score: 0.0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      } as UserReview;

      const batch = firebase.firestore().batch();
      batch.set(firebase.firestore().doc(`users/${credentUser.uid}`), userInfo);
      batch.set(
        firebase.firestore().doc(`profiles/${credentUser.uid}`),
        profileInfo
      );
      batch.set(
        firebase.firestore().doc(`userReviews/${credentUser.uid}`),
        userReviewInfo
      );
      batch.commit();
    },
    [profile.learnLanguage, profile.nativeLanguage, profile.userName]
  );

  const onPressSkip = useCallback(() => {
    const f = async (): Promise<void> => {
      setIsLoading(true);
      clearErrorMessage();
      try {
        const credent = await firebase.auth().signInAnonymously();
        if (credent.user) {
          createUser(credent.user);
          track(events.CREATED_USER, { loginMethod: 'anonymously' });
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
  }, [clearErrorMessage, createUser]);

  useEffect(() => {
    navigation.setParams({ onPressSkip });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onPressSkip]);

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
  }, [clearErrorMessage, createUser, email, password]);

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

        <Text style={styles.title}>{I18n.t('signUp.title')}</Text>
        <Text style={styles.subText}>{I18n.t('signUp.subText')}</Text>
        <Text style={styles.label}>{I18n.t('signUp.email')}</Text>
        <CheckTextInput
          autoFocus
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
        <Text style={styles.label}>{I18n.t('signUp.password')}</Text>
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
          disable={!(isEmailCheckOk && isPasswordCheckOk)}
        />
        <Space size={16} />
      </View>
    </KeyboardAwareScrollView>
  );
};

SignUpScreen.navigationOptions = ({ navigation }): NavigationStackOptions => {
  const onPressSkip = navigation.getParam('onPressSkip');
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('signUp.headerTitle'),
    headerRight: (): JSX.Element => (
      <HeaderText title={I18n.t('common.skip')} onPress={onPressSkip} />
    ),
  };
};

export default SignUpScreen;
