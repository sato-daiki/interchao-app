import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
} from '../../styles/Common';
import I18n from '../../utils/I18n';
import { Diff, Language } from '../../types';
import { Space } from '../atoms';
import RichText from '../organisms/RichText';
import CorrectingText from './CorrectingText';

interface Props {
  original: string;
  fix: string | null;
  detail: string | null;
  diffs?: Diff[] | null;
  nativeLanguage: Language;
  textLanguage: Language;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  label: {
    fontSize: fontSizeM,
    color: subTextColor,
    marginTop: 16,
    marginBottom: 4,
  },
  detail: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.1,
  },
});

const CorrectionItem = ({
  original,
  fix,
  detail,
  diffs,
  nativeLanguage,
  textLanguage,
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <CorrectingText
        isOrigin
        isMenu
        text={original}
        diffs={diffs}
        nativeLanguage={nativeLanguage}
        textLanguage={textLanguage}
      />
      <Space size={16} />
      <CorrectingText
        isOrigin={false}
        isMenu
        text={fix || ''}
        diffs={diffs}
        nativeLanguage={nativeLanguage}
        textLanguage={textLanguage}
      />
      {detail ? (
        <>
          <Text style={styles.label}>{I18n.t('commentCard.detail')}</Text>
          <RichText
            style={styles.detail}
            text={detail}
            nativeLanguage={nativeLanguage}
            textLanguage={textLanguage}
          />
        </>
      ) : null}
    </View>
  );
};

export default React.memo(CorrectionItem);
