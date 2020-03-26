import React from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';

import {
  PanGestureHandlerGestureEvent,
  LongPressGestureHandler,
  LongPressGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { selectedBlue, fontSizeM, primaryColor } from '../../styles/Common';
import SelectedPicTop from '../atoms/SelectedPicTop';
import { SelectedPicBottom } from '../atoms';
import { ActiveWord } from '../../types/correcting';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'row',
  },
  wordText: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.7,
  },
  space: {
    paddingLeft: 4,
  },
});

interface Props {
  index: number;
  word: string;
  startWord?: ActiveWord;
  endWord?: ActiveWord;
  onLongPress: (
    index: number,
    event: LongPressGestureHandlerStateChangeEvent
  ) => void;
  onGestureEventTop: (event: PanGestureHandlerGestureEvent) => void;
  onGestureEventEnd: (event: PanGestureHandlerGestureEvent) => void;
  onLayout: (index: number, word: string, event: LayoutChangeEvent) => void;
}

const CorrectionWord: React.FC<Props> = ({
  index,
  word,
  startWord,
  endWord,
  onLongPress,
  onGestureEventTop,
  onGestureEventEnd,
  onLayout,
}) => {
  const isStart = !!startWord && index === startWord.index;
  const isEnd = !!endWord && index === endWord.index;
  const isActive = !!(
    startWord &&
    endWord &&
    index >= startWord.index &&
    index <= endWord.index
  );

  const textBackground = isActive ? { backgroundColor: selectedBlue } : {};

  // 最後のだけspace部分のbackgroundColor色を白にする
  const spaceBackground =
    isActive && !isEnd ? { backgroundColor: selectedBlue } : {};

  return (
    <View
      key={index}
      style={styles.container}
      onLayout={(event: LayoutChangeEvent): void => {
        onLayout(index, word, event);
      }}
    >
      <View style={[styles.textContainer, textBackground]}>
        <SelectedPicTop isStart={isStart} onGestureEvent={onGestureEventTop} />
        <LongPressGestureHandler
          onHandlerStateChange={(
            event: LongPressGestureHandlerStateChangeEvent
          ): void => onLongPress(index, event)}
        >
          <View>
            <Text style={styles.wordText}>{word}</Text>
          </View>
        </LongPressGestureHandler>
        <SelectedPicBottom isEnd={isEnd} onGestureEvent={onGestureEventEnd} />
      </View>
      <View style={[styles.space, spaceBackground]} />
    </View>
  );
};

export default CorrectionWord;
