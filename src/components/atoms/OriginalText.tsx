import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { fontSizeM, softRed } from '../../styles/Common';
import { Diff } from '../../types';

interface Props {
  diffs: Diff[];
}

const styles = StyleSheet.create({
  removed: {
    fontSize: fontSizeM,
    color: softRed,
    textDecorationLine: 'line-through',
  },
});

const OriginalText: React.FC<Props> = ({ diffs }: Props) => {
  const diffText = diffs.map((part: Diff, id: number) => {
    if (part.removed) {
      return (
        <Text key={id} style={styles.removed}>
          {part.value}
        </Text>
      );
    } else if (part.added) {
      return null;
    }
    return <Text key={id}>{part.value}</Text>;
  });
  return <>{diffText}</>;
};

export default OriginalText;
