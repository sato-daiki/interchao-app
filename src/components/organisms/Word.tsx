import React, { useRef, useCallback } from 'react';
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
  text: {
    flexDirection: 'row',
    marginRight: 4,
  },
  word: {
    // backgroundColor: '#fff',
  },
  wordText: {
    lineHeight: fontSizeM * 1.3,
    fontSize: fontSizeM,
    color: primaryColor,
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
  // const aa = async (fx, fy, width, height, px, py) => {
  //   // console.log('index', index);
  //   // console.log('fx', fx);
  //   // console.log('fy', fy);
  //   // console.log('width', width);
  //   // console.log('height', height);
  //   // console.log('px', px);
  //   // console.log('py', py);
  //   // console.log('measure', index);
  //   addPosition({ id: index, fx, py, width, height });
  // };

  const viewRef = useRef<View>(null);
  // const onLayout = useCallback(() => {
  //   const f = async () => {
  //     if (viewRef === null) {
  //       return;
  //     }
  //     await viewRef.current.measure(async (fx, fy, width, height, px, py) => {
  //       console.log('index', index);
  //       // console.log('fy', fy);
  //       // console.log('width', width);
  //       // console.log('height', height);
  //       // console.log('px', px);
  //       // console.log('py', py);
  //       // console.log('measure', index);
  //       addPosition({ id: index, fx, py, width, height });
  //     });
  //   };
  //   f();
  //   // addPosition({ id: 1 });
  // }, [addPosition, viewRef]);

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

  const styleWord = isActive ? { backgroundColor: selectedBlue } : {};

  return (
    <View ref={viewRef} key={index} style={styles.text} onLayout={onLayout}>
      <SelectedPicTop isStart={isStart} onGestureEvent={onGestureEventTop} />
      <TouchableWithoutFeedback
        onLongPress={(): void => onLongPress(index)}
        delayLongPress={LONG_PRESS_TIMEOUT}
      >
        <View style={[styles.word, styleWord]}>
          <Text style={styles.wordText}>{text}</Text>
        </View>
      </TouchableWithoutFeedback>
      <SelectedPicBottom isEnd={isEnd} onGestureEvent={onGestureEventEnd} />
    </View>
  );
};

export default Word;
