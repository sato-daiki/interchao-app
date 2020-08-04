import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
} from '../../styles/Common';
import I18n from '../../utils/I18n';
import { Diff } from '../../types';
import {
  CopyText,
  CorrectingOriginalText,
  CorrectingFixText,
  Space,
} from '../atoms';

interface Props {
  original: string;
  fix: string | null;
  detail: string | null;
  diffs?: Diff[] | null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  label: {
    fontSize: fontSizeM,
    color: subTextColor,
    marginTop: 16,
    marginBottom: 4,
  },
  detail: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.1,
  },
});

const CorrectionItem = ({
  original,
  fix,
  detail,
  diffs,
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <CorrectingOriginalText original={original} diffs={diffs} />
      <Space size={16} />
      <CorrectingFixText fix={fix} diffs={diffs} />
      {detail ? (
        <>
          <Text style={styles.label}>{I18n.t('commentCard.detail')}</Text>
          <CopyText style={styles.detail} text={detail} />
        </>
      ) : null}
    </View>
  );
};

export default CorrectionItem;
