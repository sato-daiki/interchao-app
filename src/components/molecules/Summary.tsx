import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizeM, primaryColor } from '../../styles/Common';
import I18n from '../../utils/I18n';
import RichText from '../organisms/RichText';
import { Language } from '../../types';

interface Props {
  summary: string;
  nativeLanguage: Language;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  label: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    color: primaryColor,
    paddingBottom: 8,
  },
  value: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.1,
  },
});

const Summary = ({ summary, nativeLanguage }: Props): JSX.Element => (
  <View style={styles.container}>
    <Text style={styles.label}>{I18n.t('correcting.summary')}</Text>
    <RichText
      style={styles.value}
      text={summary}
      nativeLanguage={nativeLanguage}
    />
  </View>
);

export default Summary;
