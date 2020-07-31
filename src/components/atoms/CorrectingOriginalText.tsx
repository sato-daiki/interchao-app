import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { fontSizeM, primaryColor, softRed } from '../../styles/Common';
import { Diff } from '../../types';

interface Props {
  original: string;
  diffs: Diff[];
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.1,
    marginRight: 38,
  },
  removed: {
    fontSize: fontSizeM,
    color: softRed,
    textDecorationLine: 'line-through',
  },
});

const CorrectingOriginalText: React.FC<Props> = ({ original, diffs }) => {
  // 修正なしの場合
  if (diffs.length === 0) {
    return <Text style={styles.text}>{original}</Text>;
  }

  const diffText = diffs.map((part: Diff) => {
    if (part.removed) {
      return <Text style={styles.removed}>{part.value}</Text>;
    } else if (part.added) {
      return null;
    }
    return <Text>{part.value}</Text>;
  });
  return <Text style={styles.text}>{diffText}</Text>;
};

export default CorrectingOriginalText;
