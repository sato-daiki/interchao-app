import React, { useCallback } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { LinkText, Space, SubmitButton } from '@/components/atoms';

import I18n from '@/utils/I18n';
import { fontSizeL, fontSizeM, primaryColor } from '@/styles/Common';
import { Time } from '@/images';
import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';

type ScreenType = StackScreenProps<OnboardingStackParamList, 'ReminderInitial'>;

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
  linkContainer: {
    height: 100,
  },
  imgContainer: {
    flex: 2,
    paddingTop: 16,
  },
  img: {
    alignSelf: 'center',
    width: 120,
    height: 120,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    paddingBottom: 16,
    textAlign: 'center',
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    textAlign: 'center',
  },
  linkText: {
    textAlign: 'center',
  },
});

const ReminderInitialScreen: React.FC<ScreenType> = ({ navigation }) => {
  const onPressSubmit = useCallback(() => {
    navigation.navigate('ReminderSelectTime', { caller: 'Onboarding' });
  }, [navigation]);

  const onPressSkip = useCallback(() => {
    navigation.navigate('PushSetting');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>
            {I18n.t('onboarding.reminderInitial')}
          </Text>
          <Text style={styles.text}>{I18n.t('reminderInitial.text')}</Text>
        </View>
        <View style={styles.imgContainer}>
          <Image source={Time} style={styles.img} />
        </View>
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

export default ReminderInitialScreen;
