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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'row',
  },
  wordText: {
    lineHeight: fontSizeM * 1.7,
    fontSize: fontSizeM,
    color: primaryColor,
  },
  space: {
    paddingLeft: 4,
  },
});

export interface OriginAbsolute {
  index: number;
  x: number;
  y: number;
}

export interface Position {
  id: number;
  startX: number;
  endX: number;
  line: number;
}

interface Props {
  index: number;
  text: string;
  startIndex?: number;
  endIndex?: number;
  onLongPress: (
    index: number,
    event: LongPressGestureHandlerStateChangeEvent
  ) => void;
  onGestureEventTop: (event: PanGestureHandlerGestureEvent) => void;
  onGestureEventEnd: (event: PanGestureHandlerGestureEvent) => void;
  onLayout: (index: number, event: LayoutChangeEvent) => void;
}

const Word: React.FC<Props> = ({
  index,
  text,
  startIndex,
  endIndex,
  onLongPress,
  onGestureEventTop,
  onGestureEventEnd,
  onLayout,
}) => {
  const isStart = index === startIndex;
  const isEnd = index === endIndex;
  const isActive = !!(
    startIndex !== undefined &&
    endIndex !== undefined &&
    index >= startIndex &&
    index <= endIndex
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
            <Text style={styles.wordText}>{text}</Text>
          </View>
        </LongPressGestureHandler>
        <SelectedPicBottom isEnd={isEnd} onGestureEvent={onGestureEventEnd} />
      </View>
      <View style={[styles.space, spaceBackground]} />
    </View>
  );
};

export default Word;
