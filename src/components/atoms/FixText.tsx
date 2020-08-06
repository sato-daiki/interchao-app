import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { fontSizeM, green } from '../../styles/Common';
import { Diff } from '../../types';

interface Props {
  diffs: Diff[];
}

const styles = StyleSheet.create({
  added: {
    fontSize: fontSizeM,
    color: green,
  },
});

const FixText: React.FC<Props> = ({ diffs }: Props) => {
  const diffText = diffs.map((part: Diff, id: number) => {
    if (part.added) {
      return (
        <Text key={id} style={styles.added}>
          {part.value}
        </Text>
      );
    } else if (part.removed) {
      return null;
    }
    return <Text key={id}>{part.value}</Text>;
  });
  return <>{diffText}</>;
};

export default FixText;
