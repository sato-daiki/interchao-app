import React, { useCallback, useState, ReactNode } from 'react';
import { View, StyleSheet, Vibration, LayoutChangeEvent } from 'react-native';
import {
  PanGestureHandlerGestureEvent,
  State,
  LongPressGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { fontSizeM } from '../../styles/Common';
import { CorrectionWord, CorrectionMenu } from '../molecules';

const VIBRATION_DURATION = 500;
export const LINE_HEIGHT = fontSizeM * 1.7;
const LINE_SPACE = LINE_HEIGHT - fontSizeM;

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

interface Position {
  index: number;
  startX: number;
  endX: number;
  line: number;
}

export interface Word {
  index: number;
  startX: number;
  endX: number;
  line: number;
}

interface Origin {
  y: number;
  line: number;
}

const CorrectionText: React.FC<Props & any> = ({ text }) => {
  const [isModalComment, setIsModalComment] = useState(false);

  const [origin, setOrigin] = useState<Origin>();
  const [startWord, setStartWord] = useState<Word>();
  const [endWord, setEndWord] = useState<Word>();
  const [positions, setPositions] = useState<Position[]>([]);

  const getWords = (allText: string): string[] => {
    return allText.split(' ');
  };

  const words = getWords(text);

  const onLongPress = useCallback(
    (index: number, event: LongPressGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        // const x = event.nativeEvent.absoluteX - event.nativeEvent.x;
        const y = event.nativeEvent.absoluteY - event.nativeEvent.y;
        const targetPosition = positions.find(
          element => element.index === index
        );
        if (!targetPosition) return;
        const indexInfo = {
          index,
          startX: targetPosition.startX,
          endX: targetPosition.endX,
          line: targetPosition.line,
        };
        setStartWord(indexInfo);
        setEndWord(indexInfo);
        setOrigin({
          y,
          line: targetPosition.line,
        });
        Vibration.vibrate(VIBRATION_DURATION);
        positions.sort((a, b) => {
          return a.index - b.index;
        });
      } else if (event.nativeEvent.state === State.END) {
        setIsModalComment(true);
      }
    },
    [positions, setStartWord]
  );

  const onLayout = (index: number, event: LayoutChangeEvent): void => {
    const { x, y, width } = event.nativeEvent.layout;
    setPositions([
      ...positions,
      {
        index,
        startX: x,
        endX: x + width - 4,
        line: Math.floor(y / LINE_HEIGHT) + 1,
      },
    ]);
  };

  const findCellIndex = useCallback(
    (absoluteX: number, absoluteY: number): Position | undefined => {
      if (!origin) return undefined;
      const moveY = origin.y - absoluteY;
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
          p.line === origin.line - moveLine
      );
      return resPosition;
    },
    [positions, origin]
  );

  const onGestureEventTop = useCallback(
    (event: PanGestureHandlerGestureEvent): void => {
      const { absoluteX, absoluteY } = event.nativeEvent;
      const resPosition = findCellIndex(absoluteX, absoluteY);
      if (resPosition && endWord && resPosition.index <= endWord.index) {
        setStartWord({
          index: resPosition.index,
          startX: resPosition.startX,
          endX: resPosition.endX,
          line: resPosition.line,
        });
      }
    },
    [findCellIndex]
  );

  const onGestureEventEnd = (event: PanGestureHandlerGestureEvent): void => {
    const { absoluteX, absoluteY } = event.nativeEvent;
    const resPosition = findCellIndex(absoluteX, absoluteY);
    if (resPosition && startWord && resPosition.index >= startWord.index) {
      // 後ろのピンが前のピンより手前にはいけないようにする
      setEndWord({
        index: resPosition.index,
        startX: resPosition.startX,
        endX: resPosition.endX,
        line: resPosition.line,
      });
    }
  };

  const onPressComment = useCallback(() => {}, []);

  const renderText = words.map(
    (word: string, index: number): ReactNode => {
      return (
        <CorrectionWord
          index={index}
          text={word}
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
      {isModalComment ? (
        <CorrectionMenu
          startWord={startWord!}
          endWord={endWord!}
          onPress={onPressComment}
        />
      ) : null}
      {renderText}
    </View>
  );
};

export default CorrectionText;
