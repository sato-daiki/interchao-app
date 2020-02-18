import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { ScrollView } from 'react-native-gesture-handler';
import { GrayHeader, TotalStatus } from '../components/atoms';
import { User, Diary } from '../types';
import { DiaryListItem, DiaryOriginal } from '../components/molecules';
import firebase from '../configs/firebase';
import { getPostDay, getDiaryStatus } from '../utils/diary';
import {
  primaryColor,
  fontSizeM,
  subTextColor,
  fontSizeS,
} from '../styles/Common';
import DiaryCorrection from '../components/organisms/DiaryCorrection';

export interface Props {
  user: User;
}

export interface DispatchProps {
  setUser: (user: User) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 8,
  },
});

/**
 * 日記詳細
 */
const DiaryDetailScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { item } = navigation.state.params!;
  const [diary, setDiary] = useState(item);

  console.log(diary);

  const {
    diaryStatus,
    correctionStatus,
    isReview,
    createdAt,
    title,
    text,
    profile,
    correction,
  } = diary;

  // const { name, photoUrl } = profile;

  const onPressUser = useCallback(() => {}, []);
  const onPressItem = useCallback(() => {}, []);
  const onPressReview = useCallback(() => {}, []);

  const postDay = getPostDay(createdAt);
  const status = getDiaryStatus('my', diaryStatus, correctionStatus, isReview);

  return (
    <ScrollView style={styles.container}>
      <DiaryOriginal
        postDay={postDay}
        status={status}
        title={title}
        text={text}
      />
      {correction ? (
        <DiaryCorrection
          isReview={isReview}
          correction={correction}
          onPressUser={onPressUser}
          onPressReview={onPressReview}
        />
      ) : null}
    </ScrollView>
  );
};

export default DiaryDetailScreen;
