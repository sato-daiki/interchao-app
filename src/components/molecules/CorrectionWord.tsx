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
import { Word, LINE_HEIGHT } from '../organisms/CorrectionText';

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
  },
  space: {
    paddingLeft: 4,
  },
});

interface Props {
  index: number;
  text: string;
  startWord?: Word;
  endWord?: Word;
  onLongPress: (
    index: number,
    event: LongPressGestureHandlerStateChangeEvent
  ) => void;
  onGestureEventTop: (event: PanGestureHandlerGestureEvent) => void;
  onGestureEventEnd: (event: PanGestureHandlerGestureEvent) => void;
  onLayout: (index: number, event: LayoutChangeEvent) => void;
}

const CorrectionWord: React.FC<Props> = ({
  index,
  text,
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
      onLayout={(event: LayoutChangeEvent): void => onLayout(index, event)}
    >
      <View style={[styles.textContainer, textBackground]}>
        <SelectedPicTop isStart={isStart} onGestureEvent={onGestureEventTop} />
        <LongPressGestureHandler
          onHandlerStateChange={(
            event: LongPressGestureHandlerStateChangeEvent
          ): void => onLongPress(index, event)}
        >
          <View>
            <Text style={[styles.wordText, { lineHeight: LINE_HEIGHT }]}>
              {text}
            </Text>
          </View>
        </LongPressGestureHandler>
        <SelectedPicBottom isEnd={isEnd} onGestureEvent={onGestureEventEnd} />
      </View>
      <View style={[styles.space, spaceBackground]} />
    </View>
  );
};

export default CorrectionWord;
