import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import I18n from '../../utils/I18n';
import { fontSizeM, subTextColor } from '../../styles/Common';
import { AutoHeightTextInput } from '../atoms';

interface Props {
  summary: string;
  onHideKeyboard: () => void;
  onChangeText: (text: string) => void;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingLeft: 16,
  },
  label: {
    fontSize: fontSizeM,
    color: subTextColor,
    marginLeft: 2,
    marginBottom: 8,
  },
  textInputSummary: {
    marginRight: 16,
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
      <AutoHeightTextInput
        style={styles.textInputSummary}
        placeholder={I18n.t('commentCard.optional')}
        value={summary}
        onChangeText={onChangeText}
        onBlur={onHideKeyboard}
      />
    </View>
  );
};

export default CorrectingSummaryWeb;
