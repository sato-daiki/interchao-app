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
import { getPostDay } from '../../utils/diary';
import firebase from '../../constants/firebase';
import { Diary } from '../../types';
import { DiaryStatus } from '../atoms';

interface Props {
  item: Diary;
  onPressItem: (item: firebase.firestore.DocumentData) => void;
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
  title: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
    paddingBottom: 8,
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    flex: 1,
  },
});

const DraftListItem = ({ item, onPressItem }: Props): JSX.Element => {
  const { createdAt, title, text } = item;
  const postDay = getPostDay(createdAt);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={(): void => onPressItem(item)}
    >
      <View style={styles.header}>
        <Text style={styles.postDayText}>{postDay}</Text>
        <DiaryStatus color={subTextColor} text="下書き" />
      </View>
      <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.text} ellipsizeMode="tail" numberOfLines={3}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default DraftListItem;
