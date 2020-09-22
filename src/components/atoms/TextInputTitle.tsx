import React from 'react';
import { StyleSheet, TextInput, StyleProp, TextStyle } from 'react-native';
import { fontSizeM, primaryColor, borderLightColor } from '../../styles/Common';

interface Props {
  style?: StyleProp<TextStyle>;
  value: string;
  onChangeText: (txt: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const styles = StyleSheet.create({
  titleInput: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
});

const TextInputTitle: React.FC<Props> = ({
  value,
  onChangeText,
  onFocus,
  onBlur,
  style,
}: Props): JSX.Element => {
  return (
    <TextInput
      style={[styles.titleInput, style]}
      value={value}
      placeholder="Title"
      maxLength={100}
      autoCorrect={false}
      blurOnSubmit
      keyboardType="default"
      spellCheck
      returnKeyType="done"
      underlineColorAndroid="transparent"
      onFocus={onFocus}
      multiline
      onChangeText={onChangeText}
      onBlur={onBlur}
    />
  );
};

export default TextInputTitle;
