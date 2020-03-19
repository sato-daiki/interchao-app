import React, { useCallback, useState, ReactNode } from 'react';
import { View, StyleSheet, Vibration, LayoutChangeEvent } from 'react-native';
import {
  PanGestureHandlerGestureEvent,
  State,
  LongPressGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import Word, { Position } from './Word';
import { fontSizeM } from '../../styles/Common';

const VIBRATION_DURATION = 500;
const LINE_HEIGHT = fontSizeM * 1.7;
const LINE_SPACE = fontSizeM * 1.7 - fontSizeM;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
});

interface Props {
  text: string;
}

interface Origin {
  index: number;
  x: number;
  y: number;
  line: number;
}

const CorrectionText: React.FC<Props & any> = ({ text }) => {
  const [startOrigin, setStartOrigin] = useState<Origin>();
  const [startIndex, setStartIndex] = useState<number>();
  const [endIndex, setEndIndex] = useState<number>();
  const [positions, setPositions] = useState<Position[]>([]);

  const getWords = (allText: string): string[] => {
    return allText.split(' ');
  };

  const words = getWords(text);

  const onLongPress = useCallback(
    (index: number, event: LongPressGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        const x = event.nativeEvent.absoluteX - event.nativeEvent.x;
        const y = event.nativeEvent.absoluteY - event.nativeEvent.y;
        const targetPosition = positions.find(element => element.id === index);
        if (!targetPosition) return;
        setStartIndex(index);
        setEndIndex(index);
        setStartOrigin({
          index,
          x,
          y,
          line: targetPosition.line,
        });
        Vibration.vibrate(VIBRATION_DURATION);
        positions.sort((a, b) => {
          return a.id - b.id;
        });
      }
    },
    [positions]
  );

  const onLayout = (index: number, event: LayoutChangeEvent): void => {
    const { x, y, width } = event.nativeEvent.layout;
    setPositions([
      ...positions,
      {
        id: index,
        startX: x,
        endX: x + width - 4,
        line: Math.floor(y / LINE_HEIGHT) + 1,
      },
    ]);
  };

  const findCellIndex = useCallback(
    (absoluteX: number, absoluteY: number): Position | undefined => {
      if (!startOrigin) return undefined;
      const moveY = startOrigin.y - absoluteY;
      let moveLine = 0;
      if (moveY > LINE_SPACE) {
        // 上に動いた時
        if (moveY < LINE_HEIGHT + LINE_SPACE) {
          moveLine = 1;
        } else {
          moveLine = Math.floor(moveY / LINE_HEIGHT) + 1;
        }
      } else if (moveY < -LINE_HEIGHT) {
        // 下に動いた時
        moveLine = Math.floor(moveY / LINE_HEIGHT) + 1;
      }
      const resPosition = positions.find(
        p =>
          p.startX <= absoluteX &&
          p.endX >= absoluteX &&
          p.line === startOrigin.line - moveLine
      );
      return resPosition;
    },
    [positions, startOrigin]
  );

  const onGestureEventTop = useCallback(
    (event: PanGestureHandlerGestureEvent): void => {
      const { absoluteX, absoluteY } = event.nativeEvent;
      const resPosition = findCellIndex(absoluteX, absoluteY);
      if (resPosition && endIndex && resPosition.id <= endIndex) {
        setStartIndex(resPosition.id);
      }
    },
    [findCellIndex]
  );

  const onGestureEventEnd = (event: PanGestureHandlerGestureEvent): void => {
    const { absoluteX, absoluteY } = event.nativeEvent;
    const resPosition = findCellIndex(absoluteX, absoluteY);
    if (resPosition && startIndex && resPosition.id >= startIndex) {
      // 後ろのピンが前のピンより手前にはいけないようにする
      setEndIndex(resPosition.id);
    }
  };

  const renderText = words.map(
    (word: string, index: number): ReactNode => {
      return (
        <Word
          index={index}
          text={word}
          startIndex={startIndex}
          endIndex={endIndex}
          onLongPress={onLongPress}
          onGestureEventTop={onGestureEventTop}
          onGestureEventEnd={onGestureEventEnd}
          onLayout={onLayout}
        />
      );
    }
  );

  return <View style={styles.container}>{renderText}</View>;
};

export default CorrectionText;
