import React, { useCallback } from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { fontSizeL, fontSizeM, primaryColor } from '@/styles/Common';
import { LinkText, Space, SubmitButton } from '@/components/atoms';

import { Notification } from '@/images';
import { setPushotifications } from '@/utils/Notification';
import { User } from '@/types';
import I18n from '@/utils/I18n';
import {
  OnboardingNavigationProp,
  OnboardingStackParamList,
} from '@/navigations/OnboardingNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';
import firebase from '@/constants/firebase';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
  completedOnboarding: () => void;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<OnboardingStackParamList, 'PushSetting'>,
  OnboardingNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 64,
  },
  main: {
    flex: 1,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    paddingTop: 32,
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    textAlign: 'center',
  },
  linkContainer: {
    height: 100,
  },
  linkText: {
    textAlign: 'center',
  },
  img: {
    alignSelf: 'center',
    width: 120,
    height: 207,
  },
  imgContainer: {
    flex: 2,
    paddingTop: 16,
  },
});

const PushSettingScreen: React.FC<ScreenType> = ({
  user,
  setUser,
  completedOnboarding,
}) => {
  const updateOnboarding = useCallback(async () => {
    await firebase
      .firestore()
      .doc(`users/${user.uid}`)
      .update({
        onboarding: true,
        updated: firebase.firestore.FieldValue.serverTimestamp(),
      });
  }, [user.uid]);

  const onPressSubmit = useCallback(async () => {
    const expoPushToken = await setPushotifications(user.uid);
    if (expoPushToken) {
      setUser({
        ...user,
        expoPushToken,
      });
    }
    await updateOnboarding();
    completedOnboarding();
  }, [completedOnboarding, setUser, updateOnboarding, user]);

  const onPressSkip = useCallback(async () => {
    await updateOnboarding();
    completedOnboarding();
  }, [completedOnboarding, updateOnboarding]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>{I18n.t('pushSetting.title')}</Text>
          <Text style={styles.description}>
            {I18n.t('pushSetting.description')}
          </Text>
        </View>
        <View style={styles.imgContainer}>
          <Image source={Notification} style={styles.img} />
        </View>
        <View style={styles.linkContainer}>
          <SubmitButton
            title={I18n.t('pushSetting.submit')}
            onPress={onPressSubmit}
          />
          <Space size={16} />
          <LinkText
            textStyle={styles.linkText}
            text={I18n.t('common.skip')}
            onPress={onPressSkip}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PushSettingScreen;
