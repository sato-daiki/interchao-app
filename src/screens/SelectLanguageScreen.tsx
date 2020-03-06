import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import SubmitButton from '../components/atoms/SubmitButton';
import { primaryColor, fontSizeL } from '../styles/Common';
import Space from '../components/atoms/Space';
import LanguageRadioBox from '../components/molecules/LanguageRadioBox';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { Profile } from '../types';

interface Props {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

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
const SelectLanguageScreen: ScreenType = ({
  navigation,
  profile,
  setProfile,
}): JSX.Element => {
  const [isCheckedJa, setIsCheckedJa] = useState(false);

  const onPressNext = (): void => {
    setProfile({
      ...profile,
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

SelectLanguageScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: '言語の選択',
  };
};

export default SelectLanguageScreen;
