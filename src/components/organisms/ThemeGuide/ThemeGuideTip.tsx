import React from 'react';
import { View, ScrollView, Text, StyleSheet, TextStyle } from 'react-native';
import {
  fontSizeL,
  fontSizeM,
  primaryColor,
  subTextColor,
} from '@/styles/Common';
import { StyleType, TipParams } from './interface';

interface Props {
  params: TipParams;
}

const styles = StyleSheet.create({
  scrollView: {
    // flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  h1: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeM,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  subText: {
    color: subTextColor,
  },
  subTextAndMarginLeft: {
    color: subTextColor,
    marginLeft: 16,
  },
  example: {
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
});

const getStyle = (styleType: StyleType): TextStyle | undefined => {
  switch (styleType) {
    case 'bold':
      return styles.bold;
    case 'p':
      return undefined;

    default:
      return undefined;
  }
};

const ThemeGuideIntroduction = ({ params }: Props): JSX.Element => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text style={styles.h1}>よく使う表現</Text>
      <View style={styles.section}>
        <Text style={styles.title}>表現</Text>
        {params.expressions.map(expression => (
          <Text style={styles.text}>
            {`${expression.learnText}`}
            <Text style={styles.subTextAndMarginLeft}>
              {`（${expression.nativeText}）`}
            </Text>
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>単語</Text>
        {params.words.map(word => (
          <Text style={styles.text}>
            {word.learnText}
            <Text style={styles.subTextAndMarginLeft}>
              {` - ${word.nativeText}`}
            </Text>
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>例文</Text>
        {params.examples.map(example => (
          <View style={styles.example}>
            <Text style={styles.text}>
              {example.learnText.map(t => (
                <Text style={[getStyle(t.styleType)]}>{`${t.text} `}</Text>
              ))}
            </Text>
            <Text style={styles.subText}>{`（${example.nativeText}）`}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ThemeGuideIntroduction;
