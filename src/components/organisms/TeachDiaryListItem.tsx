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
import { UserDiaryStatus } from '../molecules';
import { ProfileIcon } from '../atoms';

interface Props {
  mine?: boolean;
  item: Diary;
  onPressUser: (uid: string) => void;
  onPressItem: (item: firebase.firestore.DocumentData) => void;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  main: {
    paddingLeft: 12,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  userName: {
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
    textAlign: 'left',
    flex: 1,
    paddingBottom: 4,
  },
  content: {
    flexDirection: 'column',
  },
  postDay: {
    color: subTextColor,
    fontSize: fontSizeS,
  },
});

const TeachDiaryListItem = ({
  item,
  onPressUser,
  onPressItem,
}: Props): JSX.Element => {
  const { createdAt, title, text, profile } = item;
  const { photoUrl, uid, userName } = profile;
  const postDay = getPostDay(createdAt);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={(): void => onPressItem(item)}
    >
      <ProfileIcon photoUrl={photoUrl} onPress={(): void => onPressUser(uid)} />
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.userName}>{userName}</Text>
          <UserDiaryStatus diary={item} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.text} ellipsizeMode="tail" numberOfLines={3}>
            {text}
          </Text>
          <Text style={styles.postDay}>{postDay}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TeachDiaryListItem;
