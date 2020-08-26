import React, { useState } from 'react';
import {
  TextInput,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Platform,
  TextInputProps,
} from 'react-native';

interface Props extends TextInputProps {
  style?: StyleProp<TextStyle>;
  onFocus?: () => void;
  onChange?: () => void;
}

const AutoHeightTextInput: React.FC<Props> = ({
  style,
  onFocus,
  onChange,
  ...props
}: Props): JSX.Element => {
  const [scrollHeight, setScrollHeight] = useState(null);

  const handleFocus = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    if (onFocus) onFocus();
    setScrollHeight(e.target.scrollHeight);
  };

  const handleChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    if (onChange) onChange();
    setScrollHeight(e.target.scrollHeight);
  };

  if (Platform.OS === 'web') {
    return (
      <TextInput
        style={[style, { height: scrollHeight }]}
        onFocus={handleFocus}
        onChange={handleChange}
        {...props}
      />
    );
  }

  return (
    <TextInput style={style} onFocus={onFocus} onChange={onChange} {...props} />
  );
};

export default AutoHeightTextInput;
