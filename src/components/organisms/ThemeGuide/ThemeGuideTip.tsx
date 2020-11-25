import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import {
  fontSizeL,
  fontSizeM,
  primaryColor,
  subTextColor,
} from '@/styles/Common';
import I18n from '@/utils/I18n';
import { TipParams } from './interface';
import Header from './Header';
import { getStyle } from './util';

interface Props {
  params: TipParams;
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    marginBottom: 16,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    flexWrap: 'wrap',
  },
  subText: {
    color: subTextColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
  marginBottom4: {
    marginBottom: 4,
  },
  marginBottom12: {
    marginBottom: 12,
  },
});

const ThemeGuideTip: React.FC<Props> = ({ params }) => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <Header title={I18n.t('themeGuide.guideTipTitle')} />
      <View style={styles.section}>
        <Text style={styles.title}>
          {`⭐️ ${I18n.t('themeGuide.expression')}`}
        </Text>
        {params.expressions.map(expression => (
          <Text key={expression.id} style={styles.marginBottom12}>
            <Text style={styles.text}>{`${expression.learnText}`}</Text>
            <Text style={styles.subText}>{`  (${expression.nativeText})`}</Text>
          </Text>
        ))}
      </View>

      <Text style={styles.title}>{`✍️ ${I18n.t('themeGuide.example')}`}</Text>
      {params.examples.map(example => (
        <View key={example.id} style={styles.marginBottom12}>
          <Text style={[styles.text, styles.marginBottom4]}>
            {example.learnText.map(t => (
              <Text
                key={`${example.id}-${t.key}`}
                style={[getStyle(t.styleType)]}
              >
                {`${t.text}`}
              </Text>
            ))}
          </Text>
          <Text style={styles.subText}>{`${example.nativeText}`}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ThemeGuideTip;
