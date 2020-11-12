import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import {
  fontSizeL,
  fontSizeM,
  primaryColor,
  subTextColor,
} from '@/styles/Common';
import { Heading, Space } from '@/components/atoms';
import I18n from '@/utils/I18n';
import { WordParams } from './interface';

interface Props {
  params: WordParams;
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingTop: 16,
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
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  subTextAndMarginLeft: {
    color: subTextColor,
    marginLeft: 16,
  },
});

const ThemeGuideWord: React.FC<Props> = ({ params }) => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <Space size={24} />
      <Heading title={`${I18n.t('themeGuide.word')}`} />
      <Space size={24} />
      <Text style={styles.title}>{`📖 ${params.title}`}</Text>
      {params.words.map(word => (
        <Text key={word.id} style={styles.text}>
          {`・${word.learnText}`}
          <Text style={styles.subTextAndMarginLeft}>
            {` - ${word.nativeText}`}
          </Text>
        </Text>
      ))}
    </ScrollView>
  );
};

export default ThemeGuideWord;
