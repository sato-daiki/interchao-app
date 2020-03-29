import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { mainColor, primaryColor, fontSizeM } from '../../styles/Common';
import { RadioBox } from '../atoms';

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
          <Text style={styles.radioBoxText}>日本語</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={styles.radioBox} onPress={onPressEn}>
          <RadioBox checked={!checkedJa} color={mainColor} />
          <Text style={styles.radioBoxText}>英語</Text>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default LanguageRadioBox;
