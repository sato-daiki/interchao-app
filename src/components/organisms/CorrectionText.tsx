import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Vibration,
} from 'react-native';
import { pinBlue, selectedBlue } from '../../styles/Common';
import SelectedPicTop from '../atoms/SelectedPicTop';
import { SelectedPicBottom } from '../atoms';

const { width } = Dimensions.get('window');
const LONG_PRESS_TIMEOUT = 500;
const VIBRATION_DURATION = 500;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    flexDirection: 'row',
    // marginRight: 4,
  },
  word: {
    backgroundColor: '#fff',
  },
});

interface Props {
  text: string;
}

const CorrectionText: React.FC<Props & any> = ({ text }) => {
  const [startIndex, setStartIndex] = useState<number>();
  const [endIndex, setEndIndex] = useState<number>();

  const getWords = (allText: string): string[] => {
    return allText.split(' ');
  };
  const words = getWords(text);

  const onLongPress = useCallback((index: number) => {
    setStartIndex(index);
    setEndIndex(index);
    Vibration.vibrate(VIBRATION_DURATION);
  }, []);

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
      <View style={styles.text}>
        {isStart ? <SelectedPicTop /> : null}
        <TouchableWithoutFeedback
          onLongPress={(): void => onLongPress(index)}
          delayLongPress={LONG_PRESS_TIMEOUT}
        >
          <View style={[styles.word, styleWord]}>
            <Text>{word}</Text>
          </View>
        </TouchableWithoutFeedback>
        {isEnd ? <SelectedPicBottom /> : null}
      </View>
    );
  });

  return <View style={styles.container}>{renderText}</View>;
};

export default CorrectionText;
