import React, { useCallback } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { User } from '../types';
import { getPostDay, getMyDiaryStatus } from '../utils/diary';

import DiaryCorrection from '../components/organisms/DiaryCorrection';
import { DiaryOriginal } from '../components/molecules';
import { ProfileIconHorizontal } from '../components/atoms';

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
  profileIcon: {
    paddingTop: 16,
    paddingLeft: 16,
  },
});

/**
 * 日記詳細
 */
const UserDiaryScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { item } = navigation.state.params!;
  const {
    diaryStatus,
    correctionStatus,
    isReview,
    createdAt,
    title,
    text,
    correction,
    profile,
  } = item;
  const { name, photoUrl } = profile;

  const onPressUser = useCallback(() => {}, []);
  const onPressReview = useCallback(() => {}, []);

  const postDay = getPostDay(createdAt);
  const status = getMyDiaryStatus(
    // 'teach',
    diaryStatus,
    correctionStatus,
    isReview
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileIcon}>
        <ProfileIconHorizontal
          name={name}
          photoUrl={photoUrl}
          onPress={onPressUser}
        />
      </View>
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

export default UserDiaryScreen;
