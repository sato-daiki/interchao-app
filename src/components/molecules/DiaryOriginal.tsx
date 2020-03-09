import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  subTextColor,
} from '../../styles/Common';
import { MyDiaryStatus } from '.';
import { Diary } from '../../types';
import { getPostDay } from '../../utils/diary';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
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
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 32,
  },
});

const DiaryOriginal = ({ diary }: { diary: Diary }): JSX.Element => {
  const { createdAt, title, text } = diary;
  const postDay = getPostDay(createdAt);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.postDayText}>{postDay}</Text>
        <MyDiaryStatus diary={diary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default DiaryOriginal;
