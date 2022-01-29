import React, { useCallback } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import ReminderInitial from '@/components/organisms/ReminderInitial';
import { LinkText, Space, SubmitButton } from '@/components/atoms';

import I18n from '@/utils/I18n';
import firebase from '@/constants/firebase';
import { User } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
  completedOnboarding: () => void;
}

export type NavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'ReminderSelectTimeOnboarding'
>;

export type ScreenType = {
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
  linkContainer: {
    height: 100,
  },
  linkText: {
    textAlign: 'center',
  },
});

const ReminderInitialOnboardingScreen: React.FC<ScreenType> = ({
  navigation,
  user,
  completedOnboarding,
}) => {
  const onPressSubmit = useCallback(() => {
    navigation.navigate('ReminderSelectTimeOnboarding');
  }, [navigation]);

  const onPressSkip = useCallback(async () => {
    await firebase
      .firestore()
      .doc(`users/${user.uid}`)
      .update({
        onboarding: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    completedOnboarding();
  }, [completedOnboarding, user.uid]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ReminderInitial />
        <View style={styles.linkContainer}>
          <SubmitButton
            title={I18n.t('reminderInitial.submit')}
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

export default ReminderInitialOnboardingScreen;
