import React, { useCallback, useState, ReactNode } from 'react';
import { View, StyleSheet, Vibration, Text } from 'react-native';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Word from './Word';

const VIBRATION_DURATION = 500;
const PADDING = 16;
const HEIGHT = 150;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

interface Props {
  text: string;
}

export interface Position {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const CorrectionText: React.FC<Props & any> = ({ text }) => {
  const [startIndex, setStartIndex] = useState<number>();
  const [endIndex, setEndIndex] = useState<number>();
  const [positions, setPositions] = useState<Position[]>([]);

  const getWords = (allText: string): string[] => {
    return allText.split(' ');
  };
  const words = getWords(text);

  const onLongPress = useCallback((index: number) => {
    setStartIndex(index);
    setEndIndex(index);
    Vibration.vibrate(VIBRATION_DURATION);
  }, []);

  const addPosition = (position: Position): void => {
    setPositions([...positions, position]);
  };

  const findCellIndex = useCallback(
    (absoluteX: number, absoluteY: number): Position | undefined => {
      console.log(absoluteX, absoluteY);
      const resPosition = positions.find(
        p =>
          p.x + PADDING <= absoluteX &&
          p.x + PADDING + p.width >= absoluteX &&
          p.y + HEIGHT <= absoluteY &&
          p.y + p.height + HEIGHT >= absoluteY
      );
      return resPosition;
    },
    [positions]
  );

  const onGestureEventTop = (event: PanGestureHandlerGestureEvent): void => {
    const { absoluteX, absoluteY } = event.nativeEvent;
    const resPosition = findCellIndex(absoluteX, absoluteY);
    if (resPosition && endIndex && resPosition.id <= endIndex) {
      setStartIndex(resPosition.id);
    }
  };

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
          addPosition={addPosition}
        />
      );
    }
  );

  return (
    <>
      <View style={styles.container}>{renderText}</View>
      <Text
        onPress={() => {
          positions.sort((a, b) => {
            return a.id - b.id;
          });
          for (let i = 0; i < positions.length; i += 1) {
            console.log('index', positions[i].id);
            console.log('x', positions[i].x);
            console.log('y', positions[i].y);
            console.log('width', positions[i].width);
            console.log('height', positions[i].height);

            console.log('p.x + PADDING', positions[i].x + PADDING);
            console.log(
              ' p.x + PADDING + p.width',
              positions[i].x + PADDING + positions[i].width
            );
            console.log(' p.y + HEIGHT', positions[i].y + HEIGHT);
            console.log(
              'p.y + p.height + HEIGHT',
              positions[i].y + HEIGHT + positions[i].height
            );

            console.log('---------');
          }
        }}
      >
        text
      </Text>
    </>
  );
};

export default CorrectionText;
