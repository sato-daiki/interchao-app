import React, { useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import { CountryCode } from 'react-native-country-picker-modal';

import { Hoverable, CountryNameWithFlag } from '@/components/atoms';

import { fontSizeM, subTextColor } from '@/styles/Common';
import I18n from '@/utils/I18n';
import { SelectLanguageNavigationProp } from '@/screens/SelectLanguageScreen/interface';

interface Props {
  nationalityCode?: CountryCode;
  setNationalityCode: (c: CountryCode) => void;
  navigation: SelectLanguageNavigationProp;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    color: subTextColor,
    fontSize: fontSizeM,
    marginLeft: 40,
  },
});

const SelectLanguageWeb: React.FC<Props> = ({
  nationalityCode,
  setNationalityCode,
  navigation,
}) => {
  const onOpenCountry = useCallback((): void => {
    navigation.navigate('EditCountry', {
      nationalityCode,
      setNationalityCode: (c: CountryCode): void => setNationalityCode(c),
    });
  }, [nationalityCode, navigation, setNationalityCode]);

  return (
    <>
      <Hoverable style={styles.row} onPress={onOpenCountry}>
        {nationalityCode ? (
          <CountryNameWithFlag nationalityCode={nationalityCode} />
        ) : (
          <Text>{I18n.t('selectLanguage.placeholder')}</Text>
        )}
        {nationalityCode ? (
          <Text style={styles.change}>{I18n.t('selectLanguage.change')}</Text>
        ) : null}
      </Hoverable>
    </>
  );
};

export default SelectLanguageWeb;
