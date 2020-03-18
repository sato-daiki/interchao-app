import React, { useCallback, useEffect, useState, useRef } from 'react';
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
// import Word from './Word';

// const { width } = Dimensions.get('window');
const LONG_PRESS_TIMEOUT = 500;
const VIBRATION_DURATION = 500;
const PADDING = 16;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    flexDirection: 'row',
    marginRight: 4,
  },
  word: {
    backgroundColor: '#fff',
  },
  wordText: {
    lineHeight: fontSizeM * 1.3,
    fontSize: fontSizeM,
    color: primaryColor,
  },
});

interface Props {
  text: string;
}

interface Position {
  id: number;
  fx: number;
  py: number;
  width: number;
  height: number;
}

const CorrectionText: React.FC<Props & any> = ({ text }) => {
  const [startIndex, setStartIndex] = useState<number>();
  const [isStartActive, setIsStartActive] = useState(false);
  const [isEndActive, setIsEndActive] = useState(false);

  const [endIndex, setEndIndex] = useState<number>();
  // const [positons, setPositons] = useState<Position[]>([]);
  const positons: Position[] = [];
  const getWords = (allText: string): string[] => {
    return allText.split(' ');
  };
  const words = getWords(text);

  const onLongPress = useCallback((index: number) => {
    setStartIndex(index);
    setEndIndex(index);
    Vibration.vibrate(VIBRATION_DURATION);
  }, []);

  const addPostion = useCallback(
    (id: number, fx: number, py: number, width: number, height: number) => {
      positons.push({
        id,
        py,
        fx,
        width,
        height,
      });
      // console.log(positons);
    },
    [positons]
  );

  const findCellIndex = useCallback((absoluteX: number, absoluteY: number):
    | Position
    | undefined => {
    // positons.sort((a, b) => {
    //   return a.id - b.id;
    // });
    console.log(positons.length);
    console.log('absoluteX', absoluteX);
    console.log('absoluteY', absoluteY);
    const resPosition = positons.find(
      p => p.fx + PADDING <= absoluteX && p.fx + PADDING + p.width >= absoluteX
    );
    return resPosition;
  }, []);

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
    console.log('onGestureEventTop');
    console.log('position', positons.length);

    const { absoluteX, absoluteY } = event.nativeEvent;
    const resPosition = findCellIndex(absoluteX, absoluteY);
    if (resPosition) {
      setStartIndex(resPosition.id);
    }
  };

  const onGestureEventEnd = (event: PanGestureHandlerGestureEvent): void => {
    const { absoluteX, absoluteY } = event.nativeEvent;
    const resPosition = findCellIndex(absoluteX, absoluteY);
    if (resPosition) {
      setEndIndex(resPosition.id);
    }
  };

  const elRefs = useRef<View[]>([]);
  useEffect(() => {
    elRefs.current = elRefs.current.slice(0, words.length);
  }, [words.length]);

  const onLayout = useCallback(
    index => {
      elRefs.current[index].measure((fx, fy, width, height, px, py) => {
        // console.log('index', index);
        // console.log('fx', fx);
        // console.log('fy', fy);
        // console.log('width', width);
        // console.log('height', height);
        // console.log('px', px);
        // console.log('py', py);
        // console.log('measure', index);
        addPostion(index, fx, py, width, height);
      });
    },
    [addPostion]
  );

  const renderText = words.map((word: string, index: number) => {
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
      <View
        ref={(view): void => {
          if (!view) return;
          elRefs.current[index] = view;
        }}
        key={index}
        style={styles.text}
        onLayout={(): void => onLayout(index)}
      >
        <SelectedPicTop
          isStart={isStart}
          onGestureEvent={onGestureEventTop}
          // onHandlerStateChange={onHandlerStateChangeTop}
        />
        <TouchableWithoutFeedback
          onLongPress={(): void => onLongPress(index)}
          delayLongPress={LONG_PRESS_TIMEOUT}
        >
          <View style={[styles.word, styleWord]}>
            <Text style={styles.wordText}>{word}</Text>
          </View>
        </TouchableWithoutFeedback>
        {isEnd ? (
          <SelectedPicBottom
            isEnd={isEnd}
            onGestureEvent={onGestureEventEnd}
            // onHandlerStateChange={onHandlerStateChangeEnd}
          />
        ) : null}
      </View>
    );
  });

  return <View style={styles.container}>{renderText}</View>;
};

export default CorrectionText;
