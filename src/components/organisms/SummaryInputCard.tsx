import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  offWhite,
} from '../../styles/Common';
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
  title: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    color: primaryColor,
    paddingBottom: 16,
    lineHeight: fontSizeM * 1.3,
  },
  line: {
    alignSelf: 'center',
    width: '100%',
    marginHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 16,
  },
  textInput: {
    lineHeight: fontSizeM * 1.3,
    fontSize: fontSizeM,
    color: primaryColor,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: offWhite,
    borderRadius: 6,
    borderColor: borderLightColor,
    flexWrap: 'wrap',
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
