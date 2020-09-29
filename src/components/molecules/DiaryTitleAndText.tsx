import React from 'react';
import { StyleSheet } from 'react-native';
import { fontSizeM, primaryColor } from '../../styles/Common';
import { Language } from '../../types';
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
    paddingBottom: 16,
  },
  text: {
    lineHeight: fontSizeM * 1.3,
    fontSize: fontSizeM,
    color: primaryColor,
    paddingBottom: 16,
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
      <RichText
        style={styles.text}
        text={text}
        nativeLanguage={nativeLanguage}
        textLanguage={textLanguage}
      />
    </>
  );
};

export default DiaryTitleAndText;
