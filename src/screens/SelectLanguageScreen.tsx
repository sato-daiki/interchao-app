import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { getName } from 'country-list';
import Flag from 'react-native-flags';
import * as Localization from 'expo-localization';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import SubmitButton from '../components/atoms/SubmitButton';
import {
  primaryColor,
  fontSizeL,
  fontSizeM,
  subTextColor,
} from '../styles/Common';
import Space from '../components/atoms/Space';
import LanguageRadioBox from '../components/molecules/LanguageRadioBox';
import { Profile, CountryCode, Language } from '../types';
import { track, events } from '../utils/Analytics';
import I18n from '../utils/I18n';
import ModalSpokenLanguages from '../components/organisms/ModalSpokenLanguages';
import {
  getLanguage,
  getTargetLanguages,
  getLanguageNum,
  checkSelectLanguage,
} from '../utils/diary';
import DefaultLayout from '../components/template/DefaultLayout';
import { ModalConfirm } from '../components/organisms';
import ModalCountryPicker from '../components/web/organisms/ModalCountryPicker';
import { AuthStackParamList } from '../navigations/AuthNavigator';

export interface Props {
  profile: Profile;
}

interface DispatchProps {
  setProfile: (profile: Profile) => void;
}

type ScreenType = StackScreenProps<AuthStackParamList, 'SelectLanguage'> &
  Props &
  DispatchProps;

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
    color: subTextColor,
    fontSize: fontSizeM,
    marginLeft: 40,
  },
  rowSpoken: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  spoken: {
    color: primaryColor,
    fontSize: fontSizeM,
    marginRight: 4,
  },
  trash: {
    width: 40,
    alignItems: 'center',
  },
  addText: {
    color: subTextColor,
    fontSize: fontSizeM,
    marginLeft: 2,
  },
  pleaseText: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
  nationality: {
    marginLeft: 8,
    color: primaryColor,
    fontSize: fontSizeM,
  },
});

const initLearnLanguage = (code: string): Language => {
  // We will get back a string like "en-US". We
  // return a string like "en" to match our language
  if (code === 'en') {
    return 'ja';
  }
  return 'en';
};

const initNativeLanguage = (code: string): Language => {
  if (code === 'ja') {
    return 'ja';
  }
  if (code === 'zh') {
    return 'zh';
  }
  if (code === 'ko') {
    return 'ko';
  }
  return 'en';
};

const initCountryCode = (code: string): CountryCode | undefined => {
  if (code === 'ja') {
    return 'JP';
  }
  if (code === 'zh') {
    return 'CN';
  }
  if (code === 'ko') {
    return 'KR';
  }
  return undefined;
};

/**
 * 概要：学びたい言語とネイティブの言語の登録
 */
const SelectLanguageScreen: React.FC<ScreenType> = ({
  navigation,
  profile,
  setProfile,
}) => {
  const code = Localization.locale.split('-')[0];
  const [learnLanguage, setLearnLanguage] = useState<Language>(
    initLearnLanguage(code)
  );
  const [nativeLanguage, setNativeLanguage] = useState<Language>(
    initNativeLanguage(code)
  );
  const [spokenLanguages, setSpokenLanguages] = useState<Language[]>([]);
  // 初期値はiPhoneの設定を取得して設定しておく
  const [nationalityCode, setNationalityCode] = useState<
    CountryCode | undefined
  >(initCountryCode(code));
  const [countryVisible, setCountryVisible] = useState(false);
  const [spokenVisible, setSpokenVisible] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // TODO: web
  useEffect(() => {
    navigation.setOptions({
      headerShown: !(Platform.OS === 'web' && countryVisible),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryVisible]);

  const onPressCloseError = (): void => {
    setErrorMessage('');
    setIsModalError(false);
  };

  useEffect((): void => {
    track(events.OPENED_SELECT_LANGUAGE);
  }, []);

  const onPressNext = (): void => {
    const checked = checkSelectLanguage(
      nationalityCode,
      learnLanguage,
      nativeLanguage,
      spokenLanguages
    );
    if (!checked.result) {
      setErrorMessage(checked.errorMessage);
      setIsModalError(true);
      return;
    }

    setProfile({
      ...profile,
      learnLanguage,
      nativeLanguage,
      spokenLanguages,
      nationalityCode,
    });
    navigation.navigate('InputUserName');
  };

  const onPressSpokenLanguages = (value: Language | undefined): void => {
    if (value) {
      setSpokenLanguages([...spokenLanguages, value]);
    }
    setSpokenVisible(false);
  };

  const onCloseCountry = (): void => {
    setCountryVisible(false);
  };

  const onOpenCountry = (): void => {
    setCountryVisible(true);
  };

  const onSelectCountry = (country: Country): void => {
    setNationalityCode(country.cca2);
  };

  if (Platform.OS === 'web' && countryVisible) {
    return (
      <ModalCountryPicker
        visible={countryVisible}
        nationalityCode={nationalityCode}
        onSelect={onSelectCountry}
        onClose={onCloseCountry}
        onOpen={onOpenCountry}
      />
    );
  }

  return (
    <DefaultLayout>
      <View style={styles.contaner}>
        <ModalConfirm
          visible={isModalError}
          title={I18n.t('common.error')}
          message={errorMessage}
          mainButtonText={I18n.t('common.close')}
          onPressMain={onPressCloseError}
        />
        <ModalSpokenLanguages
          visible={spokenVisible}
          languages={getTargetLanguages(
            learnLanguage,
            nativeLanguage,
            spokenLanguages
          )}
          onPressSubmit={onPressSpokenLanguages}
          onPressClose={(): void => setSpokenVisible(false)}
        />
        <Text style={styles.title}>{I18n.t('selectLanguage.title')}</Text>
        <LanguageRadioBox
          label={I18n.t('selectLanguage.learn')}
          value={learnLanguage}
          onPress={(value: Language): void => setLearnLanguage(value)}
        />
        <Space size={16} />
        <LanguageRadioBox
          label={I18n.t('selectLanguage.native')}
          value={nativeLanguage}
          onPress={(value: Language): void => setNativeLanguage(value)}
        />
        <Space size={16} />
        <Text style={styles.label}>{I18n.t('selectLanguage.spoken')}</Text>
        <Space size={8} />
        {spokenLanguages.map(item => (
          <View style={styles.rowSpoken} key={item}>
            <Text style={styles.spoken}>{getLanguage(item)}</Text>
            <TouchableOpacity
              style={styles.trash}
              onPress={(): void => {
                setSpokenLanguages(spokenLanguages.filter(s => s !== item));
              }}
            >
              <MaterialCommunityIcons
                size={20}
                color={primaryColor}
                name="trash-can-outline"
              />
            </TouchableOpacity>
          </View>
        ))}
        {spokenLanguages.length < getLanguageNum() - 2 ? (
          <TouchableOpacity
            style={styles.row}
            onPress={(): void => setSpokenVisible(true)}
          >
            <MaterialCommunityIcons
              size={24}
              color={subTextColor}
              name="plus"
            />
            <Text style={styles.addText}>{I18n.t('selectLanguage.add')}</Text>
          </TouchableOpacity>
        ) : null}
        <Space size={24} />
        <Text style={styles.label}>{I18n.t('selectLanguage.nationality')}</Text>
        {Platform.OS === 'web' ? (
          <TouchableOpacity onPress={onOpenCountry}>
            {nationalityCode ? (
              <View style={styles.row}>
                <Flag code={nationalityCode} size={24} />
                <Text style={styles.nationality}>
                  {getName(nationalityCode)}
                </Text>
                <Text style={styles.change}>
                  {I18n.t('selectLanguage.change')}
                </Text>
              </View>
            ) : (
              <Text style={styles.pleaseText}>
                {I18n.t('selectLanguage.placeholder')}
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.row}>
            {nationalityCode ? null : (
              <TouchableOpacity onPress={onOpenCountry}>
                <Text style={styles.pleaseText}>
                  {I18n.t('selectLanguage.placeholder')}
                </Text>
              </TouchableOpacity>
            )}

            <CountryPicker
              // @ts-ignore
              countryCode={nationalityCode}
              placeholder=""
              withFilter
              withFlag
              withCountryNameButton
              withEmoji
              withModal
              withAlphaFilter
              onSelect={onSelectCountry}
              onClose={onCloseCountry}
              onOpen={onOpenCountry}
              visible={countryVisible}
            />

            {nationalityCode ? (
              <Text style={styles.change} onPress={onOpenCountry}>
                {I18n.t('selectLanguage.change')}
              </Text>
            ) : null}
          </View>
        )}
        <Space size={32} />
        <SubmitButton title={I18n.t('common.next')} onPress={onPressNext} />
      </View>
    </DefaultLayout>
  );
};

export default SelectLanguageScreen;
