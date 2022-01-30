import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mainColor, primaryColor, fontSizeM } from '../../styles/Common';
import { RadioBox } from '../atoms';
import I18n from '../../utils/I18n';
import { Language } from '../../types';

interface Props {
  label: string;
  value: Language;
  onPress: (value: Language) => void;
}

const styles = StyleSheet.create({
  label: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
    paddingBottom: 6,
  },
  radioBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  radioBox: {
    marginRight: 8,
    marginBottom: 8,
  },
});

const LanguageRadioBox: React.FC<Props> = ({ label, value, onPress }: Props) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.radioBoxWrapper}>
        <View style={styles.radioBox}>
          <RadioBox
            checked={value === 'ja'}
            color={mainColor}
            text={I18n.t('language.ja')}
            onPress={(): void => onPress('ja')}
          />
        </View>
        <View style={styles.radioBox}>
          <RadioBox
            checked={value === 'en'}
            color={mainColor}
            text={I18n.t('language.en')}
            onPress={(): void => onPress('en')}
          />
        </View>
        <View style={styles.radioBox}>
          <RadioBox
            checked={value === 'zh'}
            color={mainColor}
            text={I18n.t('language.zh')}
            onPress={(): void => onPress('zh')}
          />
        </View>
        <View style={styles.radioBox}>
          <RadioBox
            checked={value === 'ko'}
            color={mainColor}
            text={I18n.t('language.ko')}
            onPress={(): void => onPress('ko')}
          />
        </View>
      </View>
    </>
  );
};

export default LanguageRadioBox;
