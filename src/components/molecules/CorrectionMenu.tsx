import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { fontSizeM, primaryColor } from '../../styles/Common';
import { LINE_HEIGHT, Word } from '../../screens/CorrectingScreen';

interface Props {
  onPress: () => void;
  startWord: Word;
  endWord: Word;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 9,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    position: 'absolute',
    zIndex: 2,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizeM,
  },
});

const STR_LENGTH = 50;
const START_Y = -LINE_HEIGHT - 16;

const CorrectionMenu: React.FC<Props> = ({
  onPress,
  startWord,
  endWord,
}: Props) => {
  const getY = (): number => {
    return START_Y + (startWord.line - 1) * LINE_HEIGHT;
  };

  const getX = (): number => {
    const middleX = (startWord.startX + endWord.endX) / 2;
    const left = middleX - STR_LENGTH;
    const max = Math.max(left, 16);
    return max;
  };

  const styleMenu = {
    top: getY(),
    left: getX(),
  };
  return (
    <TouchableOpacity style={[styles.container, styleMenu]} onPress={onPress}>
      <Text style={styles.text}>コメントする</Text>
    </TouchableOpacity>
  );
};

export default CorrectionMenu;
