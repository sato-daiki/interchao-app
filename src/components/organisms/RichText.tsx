import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  StyleProp,
  TextStyle,
  Clipboard,
} from 'react-native';
import { fontSizeM, primaryColor } from '../../styles/Common';
import googleTranslate from '../../utils/googleTranslate';
import { Language } from '../../types';
import TextMenu from '../template/TextMenu';

interface Props {
  style?: StyleProp<TextStyle>;
  text: string | null;
  nativeLanguage?: Language;
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
});

const RichText = ({ style, text, nativeLanguage }: Props): JSX.Element => {
  const [displayText, setDisplayText] = useState(text);
  const [isTranslated, setIsTranslated] = useState(false);

  const onPressCopy = () => {
    Clipboard.setString(displayText || '');
  };

  const onPressTranslate = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isTranslated) {
        setDisplayText(text);
        setIsTranslated(false);
      } else {
        if (!text) return;
        const mentionRemovedText = text.replace(/@\w+\s/g, '');
        if (nativeLanguage) {
          const translatedText = await googleTranslate(
            mentionRemovedText,
            nativeLanguage
          );
          if (translatedText && translatedText.length > 0) {
            setDisplayText(translatedText);
            setIsTranslated(true);
          }
        }
      }
    };
    f();
  }, [text, isTranslated, nativeLanguage]);

  return (
    <TextMenu onPressCopy={onPressCopy} onPressTranslate={onPressTranslate}>
      <Text style={[styles.text, style]}>{displayText}</Text>
    </TextMenu>
  );
};

export default RichText;
