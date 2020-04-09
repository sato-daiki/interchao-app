import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  offWhite,
} from '../../styles/Common';

interface Props {
  summary: string;
  onChangeText: (text: string) => void;
}

const styles = StyleSheet.create({
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

const SummaryInput: React.FC<Props> = ({ summary, onChangeText }) => {
  return (
    <>
      <Text style={styles.title}>まとめ</Text>
      <View style={styles.line} />
      <TextInput
        style={styles.textInput}
        autoFocus
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        value={summary}
        onChangeText={onChangeText}
        multiline
        scrollEnabled={false}
      />
    </>
  );
};

export default SummaryInput;
