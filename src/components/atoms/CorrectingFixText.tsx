import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { primaryColor, fontSizeM, green } from '../../styles/Common';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Diff } from '../../types';

interface Props {
  diffs: Diff[];
}

const styles = StyleSheet.create({
  row: {
    paddingTop: 8,
    flexDirection: 'row',
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.1,
    marginRight: 46,
  },
  added: {
    fontSize: fontSizeM,
    color: green,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
});

const CorrectingFixText: React.FC<Props> = ({ diffs }) => {
  // 修正なしの場合
  if (diffs.length === 0) {
    return null;
  }

  const diffText = diffs.map((part: Diff) => {
    if (part.added) {
      return <Text style={styles.added}>{part.value}</Text>;
    } else if (part.removed) {
      return null;
    }
    return <Text>{part.value}</Text>;
  });

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
