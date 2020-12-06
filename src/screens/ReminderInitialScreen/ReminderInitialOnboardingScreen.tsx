import React, { useCallback } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import ReminderInitial from '@/components/organisms/ReminderInitial';
import { LinkText, Space, SubmitButton } from '@/components/atoms';

import I18n from '@/utils/I18n';
import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';

type ScreenType = StackScreenProps<
  OnboardingStackParamList,
  'ReminderInitialOnboarding'
>;

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
}) => {
  const onPressSubmit = useCallback(() => {
    navigation.navigate('ReminderSelectTimeOnboarding');
  }, [navigation]);

  const onPressSkip = useCallback(() => {
    navigation.navigate('PushSetting');
  }, [navigation]);

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
