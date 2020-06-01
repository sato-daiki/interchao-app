import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import * as Localization from 'expo-localization';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import SubmitButton from '../components/atoms/SubmitButton';
import { primaryColor, fontSizeL, fontSizeM } from '../styles/Common';
import Space from '../components/atoms/Space';
import LanguageRadioBox from '../components/molecules/LanguageRadioBox';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { Profile, CountryCode } from '../types';
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
  label: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
    paddingBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    color: primaryColor,
    fontSize: fontSizeM,
    marginLeft: 40,
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
  const checkJapanese = (): boolean => {
    if (
      Localization.locale === 'ja' ||
      Localization.locale === 'ja-US' ||
      Localization.locale === 'ja-JP'
    ) {
      return true;
    }
    return false;
  };
  // 初期値はiPhoneの設定を取得して設定しておく
  const [isNativeJa, setIsNativeJa] = useState(checkJapanese());
  const [nationalityCode, setNationalityCode] = useState<
    CountryCode | undefined
  >(checkJapanese() ? 'JP' : undefined);
  const [visible, setVisible] = useState(false);
  useEffect((): void => {
    track(events.OPENED_SELECT_LANGUAGE);
  }, []);

  const onPressNext = (): void => {
    setProfile({
      ...profile,
      learnLanguage: isNativeJa ? 'en' : 'ja',
      nativeLanguage: isNativeJa ? 'ja' : 'en',
      nationalityCode,
    });
    navigation.navigate('InputUserName');
  };

  return (
    <View style={styles.contaner}>
      <Text style={styles.title}>{I18n.t('selectLanguage.title')}</Text>
      <LanguageRadioBox
        label={I18n.t('selectLanguage.learn')}
        isJa={!isNativeJa}
        onPressJa={(): void => setIsNativeJa(false)}
        onPressEn={(): void => setIsNativeJa(true)}
      />
      <Space size={16} />
      <LanguageRadioBox
        label={I18n.t('selectLanguage.native')}
        isJa={isNativeJa}
        onPressJa={(): void => setIsNativeJa(true)}
        onPressEn={(): void => setIsNativeJa(false)}
      />
      <Space size={16} />
      <Text style={styles.label}>{I18n.t('selectLanguage.nationality')}</Text>
      <View style={styles.row}>
        <CountryPicker
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          countryCode={nationalityCode}
          placeholder={I18n.t('selectLanguage.placeholder')}
          withFilter
          withFlag
          withCountryNameButton
          withEmoji
          withModal
          withAlphaFilter
          onSelect={(country: Country): void => {
            setNationalityCode(country.cca2);
          }}
          onClose={(): void => setVisible(false)}
          onOpen={(): void => setVisible(true)}
          visible={visible}
        />
        {nationalityCode ? (
          <Text style={styles.change} onPress={(): void => setVisible(true)}>
            {I18n.t('selectLanguage.change')}
          </Text>
        ) : null}
      </View>
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
