import React, { useState, useEffect } from 'react';
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
import { track, events } from '../utils/Analytics';
import I18n from '../utils/I18n';

export interface Props {
  profile: Profile;
}

interface DispatchProps {
  setProfile: (profile: Profile) => void;
}

type ScreenType = React.ComponentType<
  Props & DispatchProps & NavigationStackScreenProps
> & {
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

  useEffect((): void => {
    track(events.OPENED_SELECT_LANGUAGE);
  }, []);

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
      <Text style={styles.title}>{I18n.t('selectLanguage.title')}</Text>
      <LanguageRadioBox
        label={I18n.t('selectLanguage.learn')}
        checkedJa={isCheckedJa}
        onPressJa={(): void => setIsCheckedJa(true)}
        onPressEn={(): void => setIsCheckedJa(false)}
      />
      <Space size={16} />
      <LanguageRadioBox
        label={I18n.t('selectLanguage.native')}
        checkedJa={!isCheckedJa}
        onPressJa={(): void => setIsCheckedJa(false)}
        onPressEn={(): void => setIsCheckedJa(true)}
      />
      <Space size={32} />
      <SubmitButton title={I18n.t('common.next')} onPress={onPressNext} />
    </View>
  );
};

SelectLanguageScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('selectLanguage.headerTitle'),
  };
};

export default SelectLanguageScreen;
