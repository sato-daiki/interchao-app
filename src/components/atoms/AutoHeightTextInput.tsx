import React from 'react';
import { TextInput, StyleProp, TextStyle, StyleSheet } from 'react-native';
import {
  fontSizeM,
  primaryColor,
  offWhite,
  borderLightColor,
} from '../../styles/Common';

interface Props {
  style?: StyleProp<TextStyle>;
  defaultValue?: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
}

const styles = StyleSheet.create({
  textInput: {
    lineHeight: fontSizeM * 1.3,
    height: 100,
    fontSize: fontSizeM,
    color: primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginVertical: 2,
    backgroundColor: offWhite,
    borderColor: borderLightColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
  },
});

const AutoHeightTextInput: React.FC<Props> = ({
  style = {},
  defaultValue,
  value,
  placeholder,
  onChangeText,
  onBlur,
}: Props): JSX.Element => {
  return (
    <TextInput
      style={[styles.textInput, style]}
      defaultValue={defaultValue}
      placeholder={placeholder}
      value={value}
      multiline
      blurOnSubmit
      autoCapitalize="none"
      spellCheck
      autoCorrect
      returnKeyType="done"
      scrollEnabled={false}
      underlineColorAndroid="transparent"
      onChangeText={onChangeText}
      onBlur={onBlur}
    />
  );
};

export default React.memo(AutoHeightTextInput);
