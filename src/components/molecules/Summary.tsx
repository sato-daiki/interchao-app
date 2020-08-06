import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizeM, primaryColor } from '../../styles/Common';
import I18n from '../../utils/I18n';

interface Props {
  summary: string;
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

const Summary = ({ summary }: Props): JSX.Element => (
  <View style={styles.container}>
    <Text style={styles.label}>{I18n.t('correcting.summary')}</Text>
    <Text style={styles.value}>{summary}</Text>
  </View>
);

export default Summary;
