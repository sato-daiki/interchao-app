import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { primaryColor, subTextColor, fontSizeS } from '../../styles/Common';
import { getlanguage } from '../../utils/diary';
import { Language } from '../../types';

interface Props {
  nativeLanguage: Language;
  learnLanguage: Language;
}

const styles = StyleSheet.create({
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  label: {
    fontSize: fontSizeS,
    color: subTextColor,
    paddingLeft: 2,
    paddingRight: 16,
  },
  language: {
    fontSize: fontSizeS,
    color: primaryColor,
  },
});

const ProfileLanguage: React.FC<Props> = ({
  nativeLanguage,
  learnLanguage,
}): JSX.Element => {
  return (
    <>
      <View style={styles.languageContainer}>
        <MaterialCommunityIcons size={14} color={subTextColor} name="pencil" />
        <Text style={styles.label}>勉強中の言語</Text>
        <Text style={styles.language}>{getlanguage(nativeLanguage)}</Text>
      </View>
      <View style={styles.languageContainer}>
        <MaterialCommunityIcons
          size={14}
          color={subTextColor}
          name="spellcheck"
        />
        <Text style={styles.label}>ネイティブの言語</Text>
        <Text style={styles.language}>{getlanguage(learnLanguage)}</Text>
      </View>
    </>
  );
};

export default ProfileLanguage;
