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

const { width } = Dimensions.get('window');
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
  layout: LayoutRectangle;
}

const CorrectionText: React.FC<Props & any> = ({ text }) => {
  const [startIndex, setStartIndex] = useState<number>();
  const [isStartActive, setIsStartActive] = useState(false);
  const [isEndActive, setIsEndActive] = useState(false);
  const testRef = useRef(null);

  const [endIndex, setEndIndex] = useState<number>();
  const [panResponder, setPanResponder] = useState<PanResponderInstance>();
  const [positons, setPositons] = useState<Position[]>([]);

  // useEffect(() => {
  //   const newPanResponder = PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderMove: (
  //       event: GestureResponderEvent,
  //       gestureState: PanResponderGestureState
  //     ) => {
  //       const resPosition = findCellIndex(event.nativeEvent, gestureState);
  //       if (resPosition) {
  //         setStartIndex(resPosition.id);
  //       }
  //     },
  //   });
  //   setPanResponder(newPanResponder);
  // }, [findCellIndex]);

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
    (layout: LayoutRectangle, index: number) => {
      setPositons([
        ...positons,
        {
          id: index,
          layout,
        },
      ] as Position[]);
    },
    [positons]
  );

  const findCellIndex = useCallback((absoluteX: number, absoluteY: number):
    | Position
    | undefined => {
    // positons.sort((a, b) => {
    //   return a.id - b.id;
    // });
    // console.log(positons);
    // console.log('absoluteX', absoluteX);
    // console.log('absoluteY', absoluteY);
    // const resPosition = positons.find(
    //   p =>
    //     p.layout.x + PADDING <= absoluteX &&
    //     p.layout.x + PADDING + p.layout.width >= absoluteX &&
    //     p.layout.y +
    // );
    // return resPosition;
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
    // const { absoluteX, absoluteY } = event.nativeEvent;
    // console.log('nativeEvent', event.nativeEvent);
    const resPosition = findCellIndex(absoluteX, absoluteY);
    if (resPosition) {
      setStartIndex(resPosition.id);
    }
  };

  const onGestureEventEnd = (event: PanGestureHandlerGestureEvent): void => {
    const resPosition = findCellIndex(event.nativeEvent.absoluteX);
    if (resPosition) {
      setEndIndex(resPosition.id);
    }
  };

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
        key={index}
        style={styles.text}
        onLayout={(event: LayoutChangeEvent): void => {
          addPostion(event.nativeEvent.layout, index);
        }}
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
          <View style={[styles.word, styleWord]} ref={index}>
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
  return (
    <View
      onLayout={({ nativeEvent }): void => {
        // console.log('nativeEvent', nativeEvent);
      }}
      style={styles.container}
      ref={testRef}
    >
      {renderText}
    </View>
  );
};

export default CorrectionText;
