import React, { useState, useEffect } from 'react';
import { StyleProp, Text, TextInput, Platform, TextStyle } from 'react-native';

interface Props {
  style: StyleProp<TextStyle>;
  text: string;
}

const CopyText = ({ style, text }: Props): JSX.Element => {
  const [displayText, setDisplayText] = useState('');
  // このような処理を入れないとコピーがうまく作動しない
  useEffect(() => {
    if (Platform.OS === 'android') {
      const timer = setTimeout(() => {
        setDisplayText(text);
      }, 100);
      return (): void => clearTimeout(timer);
    }
    return (): void => undefined;
  }, [text]);

  if (Platform.OS === 'ios') {
    return (
      <TextInput
        style={style}
        multiline
        editable={false}
        value={text}
        selectTextOnFocus
        scrollEnabled={false}
        underlineColorAndroid="transparent"
      />
    );
  }

  return (
    <Text style={style} selectable>
      {displayText}
    </Text>
  );
};

export default CopyText;
