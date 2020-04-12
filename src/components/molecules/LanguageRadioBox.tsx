import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { mainColor, primaryColor, fontSizeM } from '../../styles/Common';
import { RadioBox } from '../atoms';
import I18n from '../../utils/I18n';

interface Props {
  label: string;
  checkedJa: boolean;
  onPressJa: () => void;
  onPressEn: () => void;
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
  },
  radioBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 32,
  },
  radioBoxText: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingLeft: 8,
  },
});

const LanguageRadioBox: React.FC<Props> = ({
  label,
  checkedJa,
  onPressJa,
  onPressEn,
}: Props): JSX.Element => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.radioBoxWrapper}>
        <TouchableWithoutFeedback style={styles.radioBox} onPress={onPressJa}>
          <RadioBox checked={checkedJa} color={mainColor} />
          <Text style={styles.radioBoxText}>
            {I18n.t('languageRadioBox.ja')}
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={styles.radioBox} onPress={onPressEn}>
          <RadioBox checked={!checkedJa} color={mainColor} />
          <Text style={styles.radioBoxText}>
            {I18n.t('languageRadioBox.en')}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default LanguageRadioBox;
