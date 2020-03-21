import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { fontSizeM, primaryColor, subTextColor } from '../../styles/Common';
import { SubmitButton } from '../atoms';

const styles = StyleSheet.create({
  promptText: {
    paddingTop: 16,
    textAlign: 'center',
    color: primaryColor,
    fontSize: fontSizeM,
  },
  finText: {
    textAlign: 'center',
    color: subTextColor,
    fontSize: fontSizeM,
  },
});

interface Props {
  isReview: boolean;
  onPress: () => void;
}

const MyDiaryCorrectionFooter: React.FC<Props> = ({
  isReview,
  onPress,
}): JSX.Element => {
  if (isReview) {
    return <Text style={styles.finText}>この日記はレビュー済みです</Text>;
  }
  return (
    <>
      <SubmitButton title="添削のレビューをする" onPress={onPress} />
      <Text style={styles.promptText}>添削のお礼と評価をお願いします</Text>
    </>
  );
};

export default MyDiaryCorrectionFooter;
