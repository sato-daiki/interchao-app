import React, { useState } from 'react';
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
    lineHeight: fontSizeM * 1.1,
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
  const [scrollHeight, setScrollHeight] = useState(null);

  const handleFocus = (e: any): void => {
    setScrollHeight(e.target.scrollHeight);
  };

  const handleChange = (e: any): void => {
    setScrollHeight(e.target.scrollHeight);
  };

  return (
    <TextInput
      style={[styles.textInput, style, { height: scrollHeight || undefined }]}
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
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={onBlur}
    />
  );
};

export default AutoHeightTextInput;
