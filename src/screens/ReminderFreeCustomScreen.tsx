import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';
import { LinkText, Space, SubmitButton } from '@/components/atoms';
import I18n from '@/utils/I18n';
import { fontSizeL, fontSizeM, primaryColor } from '@/styles/Common';

type ScreenType = StackScreenProps<
  OnboardingStackParamList,
  'ReminderFreeCustom'
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const ReminderFreeCustomScreen: React.FC<ScreenType> = ({ navigation }) => {
  const onPressSkip = useCallback(() => {
    navigation.navigate('PushSetting');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LinkText text={I18n.t('common.skip')} onPress={onPressSkip} />
    </View>
  );
};

export default ReminderFreeCustomScreen;
