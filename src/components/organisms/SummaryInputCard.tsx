import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  offWhite,
} from '../../styles/Common';
import { Space } from '../atoms';
import { CommentButton } from '../molecules';

interface Props {
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
    paddingHorizontal: 8,
    paddingVertical: 14,
    textAlignVertical: 'top',
    backgroundColor: offWhite,
    borderRadius: 6,
    borderColor: borderLightColor,
    flexWrap: 'wrap',
  },
});

const SummaryInputCard: React.FC<Props> = ({ onPressSubmit, onPressClose }) => {
  const [summary, setSummary] = useState(''); // 総評の続き

  const onPressCancel = useCallback(() => {
    onPressClose();
    setSummary('');
  }, []);

  const onPressAdd = useCallback(() => {
    onPressSubmit(summary);
    setSummary('');
  }, [summary]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>総評</Text>
      <View style={styles.line} />
      <TextInput
        style={styles.textInput}
        autoFocus
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        value={summary}
        onChangeText={(text): void => setSummary(text)}
        multiline
        clearButtonMode="always"
      />
      <Space size={16} />
      <CommentButton onPressAdd={onPressAdd} onPressCancel={onPressCancel} />
    </View>
  );
};

export default SummaryInputCard;
