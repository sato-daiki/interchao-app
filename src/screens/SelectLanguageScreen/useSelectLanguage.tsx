import { useState, useEffect, useCallback } from 'react';
import * as Localization from 'expo-localization';
import { Language, CountryCode, Profile } from '@/types';
import { logAnalytics, events } from '@/utils/Analytics';

import { checkSelectLanguage } from '@/utils/diary';
import { SelectLanguageNavigationProp } from './interface';

interface Props {
  navigation: SelectLanguageNavigationProp;
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

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
  // if (code === 'zh') {
  //   return 'zh';
  // }
  // if (code === 'ko') {
  //   return 'ko';
  // }
  return 'en';
};

const initCountryCode = (code: string): CountryCode | undefined => {
  if (code === 'ja') {
    return 'JP';
  }
  // if (code === 'zh') {
  //   return 'CN';
  // }
  // if (code === 'ko') {
  //   return 'KR';
  // }
  return undefined;
};

export const useSelectLanguage = ({
  navigation,
  profile,
  setProfile,
}: Props) => {
  const code = Localization.locale.split('-')[0];
  const [learnLanguage, setLearnLanguage] = useState<Language>(
    initLearnLanguage(code),
  );
  const [nativeLanguage, setNativeLanguage] = useState<Language>(
    initNativeLanguage(code),
  );
  const [spokenLanguages, setSpokenLanguages] = useState<Language[]>([]);
  // 初期値はiPhoneの設定を取得して設定しておく
  const [nationalityCode, setNationalityCode] = useState<
    CountryCode | undefined
  >(initCountryCode(code));
  const [spokenVisible, setSpokenVisible] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onPressCloseError = useCallback((): void => {
    setErrorMessage('');
    setIsModalError(false);
  }, []);

  useEffect((): void => {
    logAnalytics(events.OPENED_SELECT_LANGUAGE);
  }, []);

  const onPressNext = useCallback((): void => {
    const checked = checkSelectLanguage(
      nationalityCode,
      learnLanguage,
      nativeLanguage,
      spokenLanguages,
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
  }, [
    learnLanguage,
    nationalityCode,
    nativeLanguage,
    navigation,
    profile,
    setProfile,
    spokenLanguages,
  ]);

  const onPressSpokenLanguages = useCallback(
    (value: Language | undefined): void => {
      if (value) {
        setSpokenLanguages([...spokenLanguages, value]);
      }
      setSpokenVisible(false);
    },
    [spokenLanguages],
  );

  const onOpenCountry = useCallback((): void => {
    navigation.navigate('EditCountry', {
      nationalityCode,
      setNationalityCode: (c: CountryCode): void => setNationalityCode(c),
    });
  }, [nationalityCode, navigation]);

  const onPressCloseSpoken = useCallback((): void => {
    setSpokenVisible(false);
  }, []);

  const onPressLearnLanguage = useCallback((value: Language): void => {
    setLearnLanguage(value);
  }, []);

  const onPressNativeLanguage = useCallback((value: Language): void => {
    setNativeLanguage(value);
  }, []);

  const onPressDeleteSpokenLanguages = useCallback(
    (item: Language): void => {
      setSpokenLanguages(spokenLanguages.filter((s) => s !== item));
    },
    [spokenLanguages],
  );

  const onPressAdd = useCallback((): void => {
    setSpokenVisible(true);
  }, []);

  return {
    nationalityCode,
    learnLanguage,
    nativeLanguage,
    spokenLanguages,
    isModalError,
    spokenVisible,
    errorMessage,
    onPressCloseError,
    onPressSpokenLanguages,
    onPressCloseSpoken,
    onPressLearnLanguage,
    onPressNativeLanguage,
    onOpenCountry,
    onPressDeleteSpokenLanguages,
    onPressAdd,
    onPressNext,
    setNationalityCode,
  };
};
