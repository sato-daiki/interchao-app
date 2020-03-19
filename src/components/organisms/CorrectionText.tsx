import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  PanGestureHandlerGestureEvent,
  LongPressGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { CorrectionWord, CorrectionMenu } from '../molecules';
import { Word } from '../../screens/CorrectingScreen';

interface Props {
  text: string;
  isModalComment: boolean;
  startWord?: Word;
  endWord?: Word;
  onLongPress: (
    index: number,
    event: LongPressGestureHandlerStateChangeEvent
  ) => void;
  onGestureEventTop: (event: PanGestureHandlerGestureEvent) => void;
  onGestureEventEnd: (event: PanGestureHandlerGestureEvent) => void;
  onLayout: (index: number, event: LayoutChangeEvent) => void;
  onPressComment: () => void;
  clear: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    backgroundColor: 'red',
    flex: 1,
  },
});

const CorrectionText: React.FC<Props> = ({
  text,
  isModalComment,
  startWord,
  endWord,
  onLongPress,
  onGestureEventTop,
  onGestureEventEnd,
  onLayout,
  onPressComment,
  clear,
}) => {
  const getWords = (allText: string): string[] => {
    return allText.split(' ');
  };

  const words = getWords(text);

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
    <TouchableWithoutFeedback onPress={clear}>
      <View style={styles.container}>
        {isModalComment && startWord && endWord ? (
          <CorrectionMenu
            startWord={startWord}
            endWord={endWord}
            onPress={onPressComment}
          />
        ) : null}
        {renderText}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CorrectionText;
