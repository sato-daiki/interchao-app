import React, { ReactNode } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { InfoComment } from '../../types';
import { primaryColor, fontSizeM } from '../../styles/Common';

const { width } = Dimensions.get('window');
const START_WIDTH = 16;
const END_WIDTH = width - 32;
const LINE_HEIGHT = fontSizeM * 1.7;

interface Props {
  infoComments: InfoComment[];
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  line: {
    borderBottomWidth: 1.5,
    borderEndColor: primaryColor,
  },
});

const CorrectionUnderline: React.FC<Props> = ({ infoComments }) => {
  const renderLine = infoComments.map(
    (infoComment: InfoComment, index: number): ReactNode => {
      const { startWord, endWord } = infoComment;
      if (startWord.line === endWord.line) {
        // 同一の行だった場合
        const lineStyle = {
          width: endWord.endX - startWord.startX,
          left: startWord.startX,
          top: LINE_HEIGHT * startWord.line - 6,
        };
        return <View key={index} style={[styles.line, lineStyle]} />;
      }

      /* 複数行だった場合の処理 */
      // lineをベースに配列を作る
      const lineArray = [] as number[];
      for (let i = startWord.line; i <= endWord.line; i += 1) {
        lineArray.push(i);
      }

      return lineArray.map((line: number, i: number) => {
        // 一週目の場合（一番右までひく）
        if (i === 0) {
          const lineStyle = {
            width: END_WIDTH - startWord.startX,
            left: startWord.startX,
            top: LINE_HEIGHT * line - 6,
          };
          return <View key={line} style={[styles.line, lineStyle]} />;
        }
        // 最終行の場合（一番左から途中までひく）
        if (line === endWord.line) {
          const lineStyle = {
            width: endWord.endX - START_WIDTH,
            left: START_WIDTH,
            top: LINE_HEIGHT * line - 6,
          };
          return <View key={line} style={[styles.line, lineStyle]} />;
        }
        // 中間行の場合（一番左から右までひく）
        const lineStyle = {
          width: END_WIDTH - START_WIDTH,
          left: START_WIDTH,
          top: LINE_HEIGHT * line - 6,
        };
        return <View key={line} style={[styles.line, lineStyle]} />;
      });
    }
  );

  return <View style={styles.container}>{renderLine}</View>;
};

export default CorrectionUnderline;
