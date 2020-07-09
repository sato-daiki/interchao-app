import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { softRed, mainColor, purple, green } from '../../styles/Common';
import { Correction, Chunk } from '../../types';
import { findAll } from '../../utils/corrections';

interface Props {
  text: string;
  textStyle: StyleProp<TextStyle>;
  correction?: Correction;
  correction2?: Correction;
  correction3?: Correction;
  hidden1: boolean;
  hidden2: boolean;
  hidden3: boolean;
}

const color1 = mainColor;
const color2 = purple;
const color3 = green;

const styles = StyleSheet.create({
  highlightStyle: {
    textDecorationLine: 'underline',
    textDecorationColor: softRed,
  },
});

const UnderLineText: React.FC<Props> = ({
  text,
  textStyle,
  correction,
  correction2,
  correction3,
  hidden1,
  hidden2,
  hidden3,
}: Props): JSX.Element | null => {
  const [chunks, setChunks] = useState<Array<Chunk>>([]);

  useEffect(() => {
    const newChunks = findAll({
      text,
      correction: hidden1 ? undefined : correction,
      correction2: hidden2 ? undefined : correction2,
      correction3: hidden3 ? undefined : correction3,
    });
    setChunks(newChunks);
  }, [correction, correction2, correction3, hidden1, hidden2, hidden3, text]);

  const getColor = (correctionNum: number | null): string => {
    if (correctionNum === 1) return color1;
    if (correctionNum === 2) return color2;
    if (correctionNum === 3) return color3;
    return color1;
  };

  return (
    <Text style={textStyle}>
      {chunks.map((chunk, index) => {
        const substrText = text.substr(chunk.start, chunk.end - chunk.start);

        return !chunk.highlight ? (
          substrText
        ) : (
          <Text
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            style={[
              chunk.highlight && styles.highlightStyle,
              { textDecorationColor: getColor(chunk.correctionNum) },
            ]}
          >
            {substrText}
          </Text>
        );
      })}
    </Text>
  );
};

export default UnderLineText;
