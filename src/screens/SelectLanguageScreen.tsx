import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { NavigationStackProp } from 'react-navigation-stack';
import SubmitButton from '../components/atoms/SubmitButton';
import { fontSizeM, primaryColor, fontSizeL } from '../styles/Common';
import Space from '../components/atoms/Space';
import { User, Language } from '../types/user';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';

export interface Props {
  user: User;
  navigation: NavigationStackProp;
}

export interface DispatchProps {
  setUser: (user: User) => void;
}

const styles = StyleSheet.create({
  contaner: {
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

  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 6,
  },
});

/**
 * 概要：学びたい言語とネイティブの言語の登録
 */
const SelectLanguageScreen: React.FC<Props & DispatchProps> = ({
  navigation,
  user,
  setUser,
}): JSX.Element => {
  const [learnLanguage, setLearnLanguage] = useState<Language>('ja');
  const [nativeLanguage, setNativeLanguage] = useState<Language>('en');

  const onPressNext = (): void => {
    setUser({
      ...user,
      learnLanguage,
      nativeLanguage,
    });
    navigation.navigate('InputUserName');
  };

  return (
    <View style={styles.contaner}>
      <Text style={styles.title}>言語を選択してください</Text>
      <Text style={styles.label}>学びたい言語</Text>
      <RNPickerSelect
        onValueChange={value => setLearnLanguage(value)}
        items={[
          { label: '英語', value: 'en' },
          { label: '日本語', value: 'ja' },
        ]}
      />
      <Space size={16} />
      <Text style={styles.label}>ネイティブ言語</Text>
      <RNPickerSelect
        onValueChange={value => setNativeLanguage(value)}
        items={[
          { label: '英語', value: 'en' },
          { label: '日本語', value: 'ja' },
        ]}
      />
      <Space size={32} />
      <SubmitButton title="登録" onPress={onPressNext} />
    </View>
  );
};

SelectLanguageScreen.navigationOptions = () => {
  return {
    ...DefaultNavigationOptions,
    title: '相談',
  };
};

export default SelectLanguageScreen;
