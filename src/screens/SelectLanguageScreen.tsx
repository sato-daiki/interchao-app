import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import SubmitButton from '../components/atoms/SubmitButton';
import { primaryColor, fontSizeL } from '../styles/Common';
import Space from '../components/atoms/Space';
import { User } from '../types/user';
import LanguageRadioBox from '../components/molecules/LanguageRadioBox';

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
});

/**
 * 概要：学びたい言語とネイティブの言語の登録
 */
const SelectLanguageScreen: React.FC<Props & DispatchProps> = ({
  navigation,
  user,
  setUser,
}): JSX.Element => {
  const [isCheckedJa, setIsCheckedJa] = useState(false);

  const onPressNext = (): void => {
    setUser({
      ...user,
      learnLanguage: isCheckedJa ? 'ja' : 'en',
      nativeLanguage: isCheckedJa ? 'en' : 'ja',
    });
    navigation.navigate('InputUserName');
  };

  return (
    <View style={styles.contaner}>
      <Text style={styles.title}>言語を選択してください</Text>
      <LanguageRadioBox
        label="学びたい言語"
        checkedJa={isCheckedJa}
        onPressJa={(): void => setIsCheckedJa(true)}
        onPressEn={(): void => setIsCheckedJa(false)}
      />
      <Space size={16} />
      <LanguageRadioBox
        label="ネイティブ言語"
        checkedJa={!isCheckedJa}
        onPressJa={(): void => setIsCheckedJa(false)}
        onPressEn={(): void => setIsCheckedJa(true)}
      />
      <Space size={32} />
      <SubmitButton title="次へ" onPress={onPressNext} />
    </View>
  );
};

// SelectLanguageScreen.navigationOptions = () => {
//   return {
//     ...DefaultNavigationOptions,
//     title: '相談',
//   };
// };

export default SelectLanguageScreen;
