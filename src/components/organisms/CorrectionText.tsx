import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Vibration,
  PanResponderInstance,
  LayoutChangeEvent,
  LayoutRectangle,
} from 'react-native';
import {
  PanGestureHandlerGestureEvent,
  State,
  PanGestureHandlerStateChangeEvent,
  GestureHandlerStateChangeNativeEvent,
} from 'react-native-gesture-handler';
import { selectedBlue, fontSizeM, primaryColor } from '../../styles/Common';
import SelectedPicTop from '../atoms/SelectedPicTop';
import { SelectedPicBottom } from '../atoms';
import Word from './Word';

// const { width } = Dimensions.get('window');
const LONG_PRESS_TIMEOUT = 500;
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
  const [isStartActive, setIsStartActive] = useState(false);
  const [isEndActive, setIsEndActive] = useState(false);

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
      positions.sort((a, b) => {
        return a.id - b.id;
      });

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

  // const onHandlerStateChangeTop = (
  //   event: PanGestureHandlerStateChangeEvent
  // ): void => {
  //   if (event.nativeEvent.state === State.ACTIVE) {
  //     setIsStartActive(true);
  //   } else if (event.nativeEvent.state === State.END) {
  //     setIsStartActive(false);
  //   }
  // };

  // const onHandlerStateChangeEnd = (
  //   event: PanGestureHandlerStateChangeEvent
  // ): void => {
  //   if (event.nativeEvent.state === State.ACTIVE) {
  //     setIsEndActive(true);
  //   } else if (event.nativeEvent.state === State.END) {
  //     setIsEndActive(false);
  //   }
  // };

  const onGestureEventTop = (event: PanGestureHandlerGestureEvent): void => {
    // console.log('onGestureEventTop');
    // console.log('position', positons.length);

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

  return <View style={styles.container}>{renderText}</View>;
};

export default CorrectionText;
