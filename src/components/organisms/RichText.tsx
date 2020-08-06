import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  Clipboard,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { fontSizeM, primaryColor, offWhite } from '../../styles/Common';
import googleTranslate from '../../utils/googleTranslate';
import { Language } from '../../types';
import { TextMenu } from '../molecules';

interface Props {
  style?: StyleProp<TextStyle>;
  text: string | null;
  nativeLanguage?: Language;
  parentMenuNum: number;
}

const styles = StyleSheet.create({
  isMenu: {
    backgroundColor: offWhite,
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
});

const RichText = ({
  style,
  text,
  nativeLanguage,
  parentMenuNum,
}: Props): JSX.Element => {
  const [isMenu, setIsMenu] = useState(false);
  useEffect(() => {
    setIsMenu(false);
  }, [parentMenuNum]);

  const [displayText, setDisplayText] = useState(text);
  const [isTranslated, setIsTranslated] = useState(false);

  const onPressCopy = () => {
    Clipboard.setString(displayText || '');
    setIsMenu(false);
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
      setIsMenu(false);
    };
    f();
  }, [text, isTranslated, nativeLanguage]);

  return (
    <View>
      {isMenu ? (
        <TextMenu
          onPressCopy={onPressCopy}
          onPressTranslate={onPressTranslate}
        />
      ) : null}
      <TouchableOpacity
        style={isMenu ? styles.isMenu : undefined}
        onLongPress={() => !isMenu && setIsMenu(true)}
      >
        <Text style={[styles.text, style]}>{displayText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RichText;
