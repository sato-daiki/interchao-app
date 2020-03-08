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
import { ProfileIconVertical } from '../atoms';
import { getPostDay } from '../../utils/diary';
import firebase from '../../constants/firebase';
import { ScreenName, Diary } from '../../types';
import TotalStatus from '../molecules/TotalStatus';

interface Props {
  screenName: ScreenName;
  item: Diary;
  onPressUser: () => void;
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

const MyDiaryListItem = ({
  screenName,
  item,
  onPressUser,
  onPressItem,
}: Props): JSX.Element => {
  const { createdAt, title, text, profile } = item;
  const { name, photoUrl } = profile;
  const postDay = getPostDay(createdAt);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={(): void => onPressItem(item)}
    >
      <View style={styles.header}>
        <Text style={styles.postDayText}>{postDay}</Text>
        <TotalStatus screenName={screenName} diary={item} />
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

export default MyDiaryListItem;
