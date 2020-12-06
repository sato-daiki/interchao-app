import React, { useCallback, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';

import { Hoverable } from '@/components/atoms';

import { primaryColor, fontSizeM } from '@/styles/Common';
import I18n from '@/utils/I18n';

interface Props {
  nationalityCode?: CountryCode;
  setNationalityCode: (c: CountryCode) => void;
}

const styles = StyleSheet.create({
  pleaseText: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
});

const SelectLanguageNative: React.FC<Props> = ({
  nationalityCode,
  setNationalityCode,
}) => {
  const [countryVisible, setCountryVisible] = useState(false);

  const onOpenCountry = (): void => {
    setCountryVisible(true);
  };

  const onCloseCountry = useCallback((): void => {
    setCountryVisible(false);
  }, []);

  const onSelectCountry = useCallback(
    (country: Country): void => {
      setNationalityCode(country.cca2);
    },
    [setNationalityCode]
  );

  return (
    <>
      {!nationalityCode && (
        <Hoverable onPress={onOpenCountry}>
          <Text style={styles.pleaseText}>
            {I18n.t('selectLanguage.placeholder')}
          </Text>
        </Hoverable>
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
    </>
  );
};

export default SelectLanguageNative;
