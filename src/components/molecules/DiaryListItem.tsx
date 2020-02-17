import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
} from '../../styles/Common';
import { Diary } from '../../types';
import { TotalStatus, ProfileIconVertical } from '../atoms';
import { getDiaryStatus, getPostDay } from '../../utils/diary';
import firebase from '../../configs/firebase';

interface Props {
  item: firebase.firestore.DocumentData;
  onPressUser: () => void;
  onPressItem: () => void;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
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
  main: {
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
    paddingBottom: 8,
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
  icon: {
    paddingTop: 20,
  },
});

const DiaryListItem = ({
  item,
  onPressUser,
  onPressItem,
}: Props): JSX.Element => {
  const {
    diaryStatus,
    correctionStatus,
    isReview,
    createdAt,
    title,
    text,
    profile,
  } = item;

  const { name, photoUrl } = profile;

  const status = getDiaryStatus(diaryStatus, correctionStatus, isReview);
  const postDay = getPostDay(createdAt);
  // const postDay = '2020-01-01';
  return (
    <TouchableOpacity style={styles.container} onPress={onPressItem}>
      <View style={styles.header}>
        <Text style={styles.postDayText}>{postDay}</Text>
        {status ? (
          <TotalStatus color={status.color} text={status.text} />
        ) : null}
      </View>
      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.icon}>
          <ProfileIconVertical
            name={name}
            photoUrl={photoUrl}
            onPress={onPressUser}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DiaryListItem;
