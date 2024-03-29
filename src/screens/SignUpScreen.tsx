import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';

import { CheckTextInput } from '@/components/molecules';
import {
  Space,
  SubmitButton,
  LoadingModal,
  HeaderText,
} from '@/components/atoms';

import {
  AuthNavigationProp,
  AuthStackParamList,
} from '@/navigations/AuthNavigator';
import firebase from '@/constants/firebase';
import { AppReviewState, Profile, User } from '@/types';
import {
  primaryColor,
  fontSizeM,
  subTextColor,
  fontSizeL,
} from '@/styles/Common';
import { logAnalytics, events } from '@/utils/Analytics';
import {
  emailInputError,
  emailValidate,
  emaillExistCheck,
} from '@/utils/common';
import I18n from '@/utils/I18n';
import { CompositeNavigationProp } from '@react-navigation/native';

export interface Props {
  profile: Profile;
}

type LoginMethod = 'anonymously' | 'email';

interface DispatchProps {
  signIn: (uid: string) => void;
  setUser: (user: User) => void;
  setProfile: (profile: Profile) => void;
}
type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList, 'SignUp'>,
  AuthNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
} & Props &
  DispatchProps;

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
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
  },
  subText: {
    color: subTextColor,
    fontSize: fontSizeM,
    paddingBottom: 16,
    lineHeight: fontSizeM * 1.3,
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
  },
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 6,
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
  },
});

/**
 * 概要：アカウント登録画面
 */
const SignUpScreen: React.FC<ScreenType> = ({
  navigation,
  profile,
  signIn,
  setUser,
  setProfile,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const [isEmailCheckOk, setIsEmailCheckOk] = useState(false);
  const [isPasswordCheckOk, setIsPasswordCheckOk] = useState(false);

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  useEffect((): void => {
    logAnalytics(events.OPENED_SIGN_UP);
  }, []);

  const clearErrorMessage = useCallback((): void => {
    setErrorEmail('');
    setErrorPassword('');
  }, []);

  const createUser = useCallback(
    async (
      credentUser: firebase.User,
      loginMethod: LoginMethod,
    ): Promise<void> => {
      const appReviewState: AppReviewState = 'yet';

      const userInfo = {
        diaryPosted: false,
        tutorialPostDiary: false,
        tutorialTeachDiaryList: false,
        tutorialCorrectiong: false,
        onboarding: false,
        points: 30,
        expoPushToken: null,
        correctingObjectID: null,
        correctingCorrectedNum: null,
        notificationCorrection: true,
        notificationReview: true,
        // notificationReminderNextDay: false,
        // notificationReminderThreeDays: false,
        // notificationReminderOneWeek: false,
        // notificationReminderOneMonth: false,
        // notificationReminderThreeMonths: false,
        mailCorrection: true,
        mailOperation: true,
        // mailReminderNextDay: true,
        // mailReminderThreeDays: false,
        // mailReminderOneWeek: true,
        // mailReminderOneMonth: true,
        // mailReminderThreeMonths: false,
        themeDiaries: null,
        appReviewState,
        runningDays: 0,
        runningWeeks: 0,
        lastDiaryPostedAt: null,
        lastModalAppSuggestionAt: null,
        lastModalNotficationSettingAt: null,
        lastWatchAdAt: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      const profileInfo = {
        name: null,
        userName: profile.userName,
        photoUrl: null,
        learnLanguage: profile.learnLanguage,
        nativeLanguage: profile.nativeLanguage,
        spokenLanguages: profile.spokenLanguages || null,
        nationalityCode: profile.nationalityCode,
        introduction: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      const userReviewInfo = {
        ratingSum: 0,
        reviewNum: 0,
        score: 0.0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      const batch = firebase.firestore().batch();
      batch.set(firebase.firestore().doc(`users/${credentUser.uid}`), userInfo);
      batch.set(
        firebase.firestore().doc(`profiles/${credentUser.uid}`),
        profileInfo,
      );
      batch.set(
        firebase.firestore().doc(`userReviews/${credentUser.uid}`),
        userReviewInfo,
      );
      await batch.commit();
      signIn(credentUser.uid);
      setUser({ ...userInfo, uid: credentUser.uid });
      setProfile({ ...profileInfo, uid: credentUser.uid });
      logAnalytics(events.CREATED_USER);
    },
    [
      profile.learnLanguage,
      profile.nationalityCode,
      profile.nativeLanguage,
      profile.spokenLanguages,
      profile.userName,
      setProfile,
      setUser,
      signIn,
    ],
  );

  const onPressSkip = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    clearErrorMessage();
    try {
      const credent = await firebase.auth().signInAnonymously();
      if (credent.user) {
        createUser(credent.user, 'anonymously');
      }
    } catch (err: any) {
      emailInputError(err, setErrorPassword, setErrorEmail, clearErrorMessage);
      setIsLoading(false);
    }
  }, [clearErrorMessage, createUser]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderText text={I18n.t('common.skip')} onPress={onPressSkip} />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressSubmit = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    clearErrorMessage();
    try {
      const credent = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (credent.user) {
        createUser(credent.user, 'email');
      }
    } catch (err: any) {
      emailInputError(err, setErrorPassword, setErrorEmail, clearErrorMessage);
      setIsLoading(false);
    }
  }, [clearErrorMessage, createUser, email, password]);

  const onBlurEmail = useCallback(async (): Promise<void> => {
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
  }, [email, setIsEmailCheckOk, setErrorEmail, setIsEmailLoading]);

  const onBlurPassword = useCallback(() => {
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
        <LoadingModal
          visible={isLoading}
          // text="画面が切り替わらない場合はリロードしてください"
        />

        <Text style={styles.title}>{I18n.t('signUp.title')}</Text>
        <Text style={styles.subText}>{I18n.t('signUp.subText')}</Text>
        <Text style={styles.label}>{I18n.t('signUp.email')}</Text>
        <CheckTextInput
          autoFocus
          value={email}
          onChangeText={(text: string): void => setEmail(text)}
          onBlur={onBlurEmail}
          maxLength={50}
          placeholder='Email'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          returnKeyType='done'
          isLoading={isEmailLoading}
          isCheckOk={isEmailCheckOk}
          errorMessage={errorEmail}
        />
        <Space size={16} />
        <Text style={styles.label}>{I18n.t('signUp.password')}</Text>
        <CheckTextInput
          value={password}
          onChangeText={(text: string): void => setPassword(text)}
          onBlur={onBlurPassword}
          maxLength={20}
          placeholder='Password'
          autoCapitalize='none'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          secureTextEntry
          returnKeyType='done'
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

export default SignUpScreen;
