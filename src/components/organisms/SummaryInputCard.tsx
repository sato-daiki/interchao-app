import React, { useState, useCallback } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { primaryColor } from '../../styles/Common';
import { Space } from '../atoms';
import { CommentButton, SummaryInput } from '../molecules';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  onPressSubmit: (summary: string) => void;
  onPressClose: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: primaryColor,
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 9,
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
});

const SummaryInputCard: React.FC<Props> = ({
  containerStyle,
  onPressSubmit,
  onPressClose,
}) => {
  const [summary, setSummary] = useState(''); // まとめの続き

  const onPressCancel = useCallback(() => {
    onPressClose();
    setSummary('');
  }, [onPressClose]);

  const onPressAdd = useCallback(() => {
    onPressSubmit(summary);
    setSummary('');
  }, [onPressSubmit, summary]);

  return (
    <View style={[styles.container, containerStyle]}>
      <SummaryInput
        summary={summary}
        onChangeText={(text): void => setSummary(text)}
      />
      <Space size={16} />
      <CommentButton onPressAdd={onPressAdd} onPressCancel={onPressCancel} />
    </View>
  );
};

export default SummaryInputCard;
