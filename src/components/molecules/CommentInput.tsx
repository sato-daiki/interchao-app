import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
  offWhite,
} from '../../styles/Common';
import { Space } from '../atoms';
import { ClearTextInput } from '.';

interface Props {
  original: string;
  fix: string;
  detail: string;
  onChangeTextFix: (fix: string) => void;
  onChangeTextDetail: (detail: string) => void;
  onPressClearFix: () => void;
  onPressClearDetail: () => void;
}

const styles = StyleSheet.create({
  label: {
    color: subTextColor,
    fontSize: fontSizeM,
    paddingBottom: 4,
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
    paddingHorizontal: 8,
    paddingVertical: 14,
    textAlignVertical: 'top',
    backgroundColor: offWhite,
    borderRadius: 6,
    borderColor: borderLightColor,
    flexWrap: 'wrap',
  },
});

const CommentInput: React.FC<Props> = ({
  original,
  fix,
  detail,
  onChangeTextFix,
  onChangeTextDetail,
  onPressClearFix,
  onPressClearDetail,
}) => {
  return (
    <>
      <Text style={styles.label}>原文</Text>
      <Text style={styles.title}>{original}</Text>
      <View style={styles.line} />
      <Text style={styles.label}>修正文</Text>
      <ClearTextInput
        autoFocus
        value={fix}
        defaultValue={original}
        onChangeText={onChangeTextFix}
        onPressClear={onPressClearFix}
      />
      <Space size={16} />
      <Text style={styles.label}>コメント</Text>
      <ClearTextInput
        value={detail}
        onChangeText={onChangeTextDetail}
        onPressClear={onPressClearDetail}
      />
    </>
  );
};

export default CommentInput;
