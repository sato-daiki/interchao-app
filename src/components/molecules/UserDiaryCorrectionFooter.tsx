import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SubmitButton } from '../atoms';

interface Props {
  isReview: boolean;
  onPressCorrection: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

const UserDiaryCorrectionFooter: React.FC<Props> = ({
  isReview,
  onPressCorrection,
}): JSX.Element | null => {
  if (isReview) {
    return null;
  }
  return (
    <View style={styles.container}>
      <SubmitButton title="添削する" onPress={onPressCorrection} />
    </View>
  );
};

export default UserDiaryCorrectionFooter;
