import React, { useCallback, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { User } from '../types';
import { getPostDay, getMyDiaryStatus } from '../utils/diary';

import DiaryCorrection from '../components/organisms/DiaryCorrection';
import { DiaryOriginal } from '../components/molecules';
import { ModalReview } from '../components/organisms';

import { diary, profile } from '../utils/testdata';

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
  const [isModalReview, setIsModalReview] = useState(false);
  // const { item } = navigation.state.params!;
  const item = diary;
  const {
    diaryStatus,
    correctionStatus,
    isReview,
    createdAt,
    title,
    text,
    correction,
  } = item;

  const { name, photoUrl } = profile;

  const onPressUser = useCallback(() => {}, []);
  const onPressReview = useCallback(() => {
    setIsModalReview(true);
  }, []);

  // const postDay = getPostDay(createdAt);
  const postDay = '2018-01-01';

  const status = getMyDiaryStatus(diaryStatus, correctionStatus, isReview);

  return (
    <View style={styles.container}>
      <ModalReview
        name={name}
        photoUrl={photoUrl}
        visible={isModalReview}
        onPressClose={(): void => setIsModalReview(false)}
      />
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
    </View>
  );
};

export default MyDiaryScreen;
