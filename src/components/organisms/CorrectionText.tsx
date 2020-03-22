import React, { ReactNode } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import {
  PanGestureHandlerGestureEvent,
  LongPressGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { CorrectionWord, CorrectionMenu } from '../molecules';
import { ActiveWord } from '../../types/correcting';

interface Props {
  text: string;
  isModalComment: boolean;
  startWord?: ActiveWord;
  endWord?: ActiveWord;
  onLongPress: (
    index: number,
    event: LongPressGestureHandlerStateChangeEvent
  ) => void;
  onGestureEventTop: (event: PanGestureHandlerGestureEvent) => void;
  onGestureEventEnd: (event: PanGestureHandlerGestureEvent) => void;
  onLayout: (index: number, word: string, event: LayoutChangeEvent) => void;
  onPressComment: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
});

const CorrectionText: React.FC<Props> = ({
  text,
  isModalComment,
  startWord,
  endWord,
  onLongPress,
  onGestureEventTop,
  onGestureEventEnd,
  onLayout,
  onPressComment,
}) => {
  const getWords = (allText: string): string[] => {
    return allText.split(' ');
  };

  const words = getWords(text);

  const renderText = words.map(
    (word: string, index: number): ReactNode => {
      return (
        <CorrectionWord
          key={index}
          index={index}
          word={word}
          startWord={startWord}
          endWord={endWord}
          onLongPress={onLongPress}
          onGestureEventTop={onGestureEventTop}
          onGestureEventEnd={onGestureEventEnd}
          onLayout={onLayout}
        />
      );
    }
  );

  return (
    <View style={styles.container}>
      {isModalComment && startWord && endWord ? (
        <CorrectionMenu
          startWord={startWord}
          endWord={endWord}
          onPress={onPressComment}
        />
      ) : null}
      {renderText}
    </View>
  );
};

export default CorrectionText;