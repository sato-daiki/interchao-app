import React from 'react';
import { StyleSheet } from 'react-native';
import { fontSizeM, primaryColor } from '../../styles/Common';
import { Language } from '../../types';
import { Space } from '../atoms';
import RichText from '../organisms/RichText';

interface Props {
  nativeLanguage: Language;
  textLanguage: Language;
  title: string;
  text: string;
}

const styles = StyleSheet.create({
  title: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
  },
  text: {
    lineHeight: fontSizeM * 1.3,
    fontSize: fontSizeM,
    color: primaryColor,
  },
});

const DiaryTitleAndText: React.FC<Props> = ({
  nativeLanguage,
  textLanguage,
  title,
  text,
}) => {
  return (
    <>
      <RichText
        style={styles.title}
        text={title}
        nativeLanguage={nativeLanguage}
        textLanguage={textLanguage}
      />
      <Space size={16} />
      <RichText
        style={styles.text}
        text={text}
        nativeLanguage={nativeLanguage}
        textLanguage={textLanguage}
      />
      <Space size={16} />
    </>
  );
};

export default DiaryTitleAndText;
