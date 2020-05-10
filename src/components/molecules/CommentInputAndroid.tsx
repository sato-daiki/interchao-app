import React, { useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Clipboard } from 'react-native';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
  offWhite,
  mainColor,
  fontSizeS,
} from '../../styles/Common';
import { Space } from '../atoms';
import I18n from '../../utils/I18n';

interface Props {
  original: string;
  fix: string;
  detail: string;
  onChangeTextOriginal: (original: string) => void;
  onChangeTextFix: (fix: string) => void;
  onChangeTextDetail: (detail: string) => void;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 4,
  },
  paste: {
    color: mainColor,
    fontSize: fontSizeS,
  },
  label: {
    color: subTextColor,
    fontSize: fontSizeM,
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

const CommentInputAndroid: React.FC<Props> = ({
  original,
  fix,
  detail,
  onChangeTextOriginal,
  onChangeTextFix,
  onChangeTextDetail,
}) => {
  const refOriginal = useRef<TextInput>(null);
  const refFix = useRef<TextInput>(null);
  const refComment = useRef<TextInput>(null);

  const onPressPaste = async (): Promise<void> => {
    const content = await Clipboard.getString();
    onChangeTextOriginal(content);
  };

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.label}>{I18n.t('commentInput.original')}</Text>
        <Text style={styles.paste} onPress={onPressPaste}>
          {I18n.t('commentInput.paste')}
        </Text>
      </View>
      <TextInput
        ref={refOriginal}
        onSubmitEditing={(): void => {
          if (refFix && refFix.current) {
            refFix.current.focus();
          }
        }}
        autoFocus
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        value={original}
        onChangeText={onChangeTextOriginal}
        multiline
        returnKeyType="next"
        blurOnSubmit
        scrollEnabled={false}
      />
      <View style={styles.line} />
      <Text style={styles.label}>{I18n.t('commentInput.fix')}</Text>
      <TextInput
        ref={refFix}
        onSubmitEditing={(): void => {
          if (refComment && refComment.current) {
            refComment.current.focus();
          }
        }}
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        value={fix}
        onChangeText={onChangeTextFix}
        multiline
        returnKeyType="next"
        blurOnSubmit
        scrollEnabled={false}
      />
      <Space size={16} />
      <Text style={styles.label}>{I18n.t('commentInput.detail')}</Text>
      <TextInput
        ref={refComment}
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        value={detail}
        onChangeText={onChangeTextDetail}
        multiline
        returnKeyType="done"
        blurOnSubmit
        scrollEnabled={false}
      />
    </>
  );
};

export default CommentInputAndroid;
