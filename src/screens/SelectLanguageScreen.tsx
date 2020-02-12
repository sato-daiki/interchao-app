import React, { useState } from 'react';
import { Picker, View, Text, StyleSheet } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import SubmitButton from '../components/atoms/SubmitButton';
import {
  fontSizeM,
  borderLightColor,
  primaryColor,
  offWhite,
  fontSizeL,
} from '../styles/Common';
import Space from '../components/atoms/Space';

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    paddingBottom: 16,
  },
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 6,
  },
});

const SelectLanguageScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  navigation,
}): JSX.Element => {
  const [language, setLanguage] = useState('ja');

  const onPressNext = (): void => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.contaner}>
      <Text style={styles.title}>言語を選択してください</Text>
      <Text style={styles.label}>学びたい言語</Text>

      <Text style={styles.label}>ネイティブ言語</Text>

      <Space size={32} />
      <SubmitButton title="次へ" onPress={onPressNext} />
    </View>
  );
};

export default SelectLanguageScreen;
