import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  subTextColor,
} from '../../styles/Common';
import { getAlgoliaDate } from '../../utils/diary';
import { Diary, Profile } from '../../types';
import I18n from '../../utils/I18n';
import { MyDiaryStatus } from '../molecules';
import RichText from './RichText';

interface Props {
  diary: Diary;
  profile: Profile;
  title: string;
  text: string;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  postDayText: {
    color: subTextColor,
    fontSize: fontSizeS,
  },
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
  textLength: {
    color: subTextColor,
    fontSize: fontSizeS,
    textAlign: 'right',
  },
});

const DiaryOriginal: React.FC<Props> = ({ diary, profile, title, text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.postDayText}>
          {getAlgoliaDate(diary.createdAt)}
        </Text>
        <MyDiaryStatus diary={diary} />
      </View>
      <RichText
        style={styles.title}
        text={title}
        nativeLanguage={profile.nativeLanguage}
        textLanguage={profile.learnLanguage}
      />
      <RichText
        style={styles.text}
        text={text}
        nativeLanguage={profile.nativeLanguage}
        textLanguage={profile.learnLanguage}
      />
      <Text style={styles.textLength}>
        {I18n.t('postDiaryComponent.textLength')}
        {` ${text.length}`}
      </Text>
    </View>
  );
};

export default DiaryOriginal;
