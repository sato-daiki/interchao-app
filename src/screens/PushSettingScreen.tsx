import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';

import I18n from '@/utils/I18n';

type ScreenType = StackScreenProps<OnboardingStackParamList, 'PushSetting'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const PushSettingScreen: React.FC<ScreenType> = ({ navigation }) => {
  return <View style={styles.container} />;
};

export default PushSettingScreen;
