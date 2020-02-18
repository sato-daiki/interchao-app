import React, { useCallback } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { User } from '../types';
import { getPostDay, getDiaryStatus } from '../utils/diary';

import DiaryCorrection from '../components/organisms/DiaryCorrection';
import { DiaryOriginal } from '../components/molecules';

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
const MyDiaryScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { item } = navigation.state.params!;
  const {
    diaryStatus,
    correctionStatus,
    isReview,
    createdAt,
    title,
    text,
    correction,
  } = item;

  const onPressUser = useCallback(() => {}, []);
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
          isMyDiary
          isReview={isReview}
          correction={correction}
          onPressUser={onPressUser}
          onPressReview={onPressReview}
        />
      ) : null}
    </ScrollView>
  );
};

export default MyDiaryScreen;
