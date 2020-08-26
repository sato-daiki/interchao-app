import React from 'react';
import { StyleSheet, TextInput, StyleProp, TextStyle } from 'react-native';
import { fontSizeM, primaryColor, borderLightColor } from '../../styles/Common';

interface Props {
  style?: StyleProp<TextStyle>;
  value: string;
  onChangeText: (txt: string) => void;
  onFocus?: () => void;
}

const styles = StyleSheet.create({
  titleInput: {
    fontSize: fontSizeM,
    color: primaryColor,
    padding: 16,
    borderColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
});

const TextInputTitle: React.FC<Props> = ({
  value,
  onChangeText,
  onFocus,
  style,
}: Props): JSX.Element => {
  return (
    <TextInput
      style={[styles.titleInput, style]}
      value={value}
      placeholder="Title"
      maxLength={100}
      autoCorrect={false}
      keyboardType="default"
      spellCheck
      returnKeyType="done"
      onFocus={onFocus}
      onChangeText={onChangeText}
      underlineColorAndroid="transparent"
    />
  );
};

export default TextInputTitle;
