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
  onPressReview: () => void;
}

const MyDiaryCorrectionFooter: React.FC<Props> = ({
  isReview,
  onPressReview,
}): JSX.Element => {
  if (isReview) {
    return (
      <>
        <SubmitButton title="添削のレビューをする" onPress={onPressReview} />
        <Text style={styles.promptText}>添削のお礼と評価をお願いします</Text>
      </>
    );
  }
  return <Text style={styles.finText}>この日記はレビュー済みです</Text>;
};

export default MyDiaryCorrectionFooter;
