import React from 'react';
import { Text, TextStyle, StyleProp, StyleSheet } from 'react-native';
import { connectHighlight } from 'react-instantsearch-native';
import { Diary } from '../../types';
import { softRed } from '../../styles/Common';

interface Props {
  attribute: string;
  hit: Diary;
  numberOfLines: number;
  textStyle?: StyleProp<TextStyle>;
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: softRed,
  },
});

const Highlight: React.FC<Props & any> = ({
  highlight,
  attribute,
  hit,
  numberOfLines,
  textStyle,
}) => {
  const parsedHit = highlight({
    attribute,
    hit,
    highlightProperty: '_highlightResult',
  });
  const highligtedHit = parsedHit.map((part, idx) => {
    if (part.isHighlighted) {
      return (
        <Text key={idx} style={styles.text}>
          {part.value}
        </Text>
      );
    }
    return part.value;
  });

  return (
    <Text style={textStyle} ellipsizeMode="tail" numberOfLines={numberOfLines}>
      {highligtedHit}
    </Text>
  );
};

export default connectHighlight(Highlight);