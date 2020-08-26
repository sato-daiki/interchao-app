import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import I18n from '../../utils/I18n';
import {
  fontSizeM,
  primaryColor,
  subTextColor,
  offWhite,
  borderLightColor,
} from '../../styles/Common';
import { AutoHeightTextInput } from '../atoms';

interface Props {
  summary: string;
  onHideKeyboard: () => void;
  onChangeText: (text: string) => void;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  label: {
    fontSize: fontSizeM,
    color: subTextColor,
    marginLeft: 2,
    marginBottom: 8,
  },
  textInputSummary: {
    lineHeight: fontSizeM * 1.1,
    fontSize: fontSizeM,
    color: primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginHorizontal: 16,
    marginVertical: 2,
    backgroundColor: offWhite,
    borderColor: borderLightColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
  },
});

const CorrectingSummaryWeb: React.FC<Props> = ({
  summary,
  onHideKeyboard,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{I18n.t('correcting.summary')}</Text>

      {/* PCは改行なし */}
      <AutoHeightTextInput
        style={styles.textInputSummary}
        placeholder={I18n.t('commentCard.optional')}
        value={summary}
        multiline
        blurOnSubmit
        autoCapitalize="none"
        spellCheck
        autoCorrect
        returnKeyType="done"
        underlineColorAndroid="transparent"
        scrollEnabled={false}
        onChangeText={onChangeText}
        onBlur={onHideKeyboard}
      />
    </View>
  );
};

export default CorrectingSummaryWeb;
