import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, primaryColor, softRed, green } from '../../styles/Common';
import { Diff, Language } from '../../types';
import googleTranslate from '../../utils/googleTranslate';
import { OriginalText, FixText } from '../atoms';
import TextMenu from '../template/TextMenu';

interface Props {
  isOrigin: boolean;
  isMenu: boolean;
  text: string;
  diffs?: Diff[] | null;
  nativeLanguage?: Language;
  textLanguage?: Language;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.1,
    marginRight: 38,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 6,
    alignItems: 'center',
  },
});

const CorrectingText: React.FC<Props> = ({
  isOrigin,
  isMenu,
  text,
  diffs,
  nativeLanguage,
  textLanguage,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isTranslated, setIsTranslated] = useState(false);

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

  let diffText;
  // 修正なしの場合 or 翻訳済みの場合
  if (!diffs || isTranslated) {
    diffText = <Text style={styles.text}>{displayText}</Text>;
  } else {
    diffText = isOrigin ? (
      <OriginalText diffs={diffs} />
    ) : (
      <FixText diffs={diffs} />
    );
  }

  const menu = (
    <View style={styles.row}>
      <Text style={styles.text}>{diffText}</Text>
      <MaterialCommunityIcons
        style={styles.icon}
        size={20}
        color={isOrigin ? softRed : green}
        name={isOrigin ? 'close' : 'circle-outline'}
      />
    </View>
  );

  if (!isMenu) {
    return menu;
  }

  return (
    <TextMenu
      isTranslated={isTranslated}
      text={text}
      displayText={displayText}
      textLanguage={textLanguage}
      onPressTranslate={onPressTranslate}
    >
      {menu}
    </TextMenu>
  );
};

export default CorrectingText;
