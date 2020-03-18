import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
} from 'react-native';

import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { selectedBlue, fontSizeM, primaryColor } from '../../styles/Common';
import SelectedPicTop from '../atoms/SelectedPicTop';
import { SelectedPicBottom } from '../atoms';
import { Position } from './CorrectionText';

const LONG_PRESS_TIMEOUT = 500;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'row',
  },
  wordText: {
    lineHeight: fontSizeM * 1.3,
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
  startIndex?: number;
  endIndex?: number;
  onLongPress: (index: number) => void;
  onGestureEventTop: (event: PanGestureHandlerGestureEvent) => void;
  onGestureEventEnd: (event: PanGestureHandlerGestureEvent) => void;
  addPosition: (position: Position) => void;
}

const Word: React.FC<Props> = ({
  index,
  text,
  startIndex,
  endIndex,
  onLongPress,
  onGestureEventTop,
  onGestureEventEnd,
  addPosition,
}) => {
  const onLayout = (event: LayoutChangeEvent): void => {
    addPosition({
      id: index,
      x: event.nativeEvent.layout.x,
      y: event.nativeEvent.layout.y,
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  };

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
    <View key={index} style={styles.container} onLayout={onLayout}>
      <View style={[styles.textContainer, textBackground]}>
        <SelectedPicTop isStart={isStart} onGestureEvent={onGestureEventTop} />
        <TouchableWithoutFeedback
          onLongPress={(): void => onLongPress(index)}
          delayLongPress={LONG_PRESS_TIMEOUT}
        >
          <View>
            <Text style={styles.wordText}>{text}</Text>
          </View>
        </TouchableWithoutFeedback>
        <SelectedPicBottom isEnd={isEnd} onGestureEvent={onGestureEventEnd} />
      </View>
      <View style={[styles.space, spaceBackground]} />
    </View>
  );
};

export default Word;
