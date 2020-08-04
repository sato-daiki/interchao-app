import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { primaryColor, fontSizeM, green } from '../../styles/Common';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Diff } from '../../types';

interface Props {
  fix: string | null;
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
  added: {
    fontSize: fontSizeM,
    color: green,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 6,
    alignItems: 'center',
  },
});

const CorrectingFixText: React.FC<Props> = ({ fix, diffs }) => {
  let diffText;
  // 修正なしの場合
  if (!diffs) {
    diffText = <Text style={styles.text}>{fix}</Text>;
  } else {
    diffText = diffs.map((part: Diff, id: number) => {
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
  }

  return (
    <View style={styles.row}>
      <Text style={styles.text}>{diffText}</Text>
      <MaterialCommunityIcons
        style={styles.icon}
        size={20}
        color={green}
        name="check"
      />
    </View>
  );
};

export default CorrectingFixText;
