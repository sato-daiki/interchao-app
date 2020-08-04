import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontSizeM, primaryColor, softRed } from '../../styles/Common';
import { Diff } from '../../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  original: string;
  diffs?: Diff[] | null;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
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
  icon: {
    position: 'absolute',
    right: 0,
    top: 6,
    alignItems: 'center',
  },
});

const CorrectingOriginalText: React.FC<Props> = ({ original, diffs }) => {
  let diffText;
  // 修正なしの場合
  if (!diffs) {
    diffText = <Text style={styles.text}>{original}</Text>;
  } else {
    diffText = diffs.map((part: Diff, id: number) => {
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
  }

  return (
    <View style={styles.row}>
      <Text style={styles.text}>{diffText}</Text>
      <MaterialCommunityIcons
        style={styles.icon}
        size={20}
        color={softRed}
        name="close"
      />
    </View>
  );
};

export default CorrectingOriginalText;
