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
import { Diary } from '../../types';
import { MyDiaryStatus, ProfileIcons, UserDiaryStatus } from '../molecules';

interface Props {
  mine?: boolean;
  item: Diary;
  onPressUser: (uid: string) => void;
  onPressItem: (item: Diary) => void;
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    textAlign: 'left',
    flex: 1,
  },
  icon: {
    paddingLeft: 6,
  },
});

const DiaryListItem = ({
  mine = false,
  item,
  onPressUser,
  onPressItem,
}: Props): JSX.Element => {
  const { createdAt, title, text, correction, proCorrection } = item;
  const postDay = getPostDay(createdAt);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={(): void => onPressItem(item)}
    >
      <View style={styles.header}>
        <Text style={styles.postDayText}>{postDay}</Text>
        {mine ? (
          <MyDiaryStatus diary={item} />
        ) : (
          <UserDiaryStatus diary={item} />
        )}
      </View>
      <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.content}>
        <Text style={styles.text} ellipsizeMode="tail" numberOfLines={3}>
          {text}
        </Text>
        {correction || proCorrection ? (
          <View style={styles.icon}>
            <ProfileIcons
              correction={correction}
              proCorrection={proCorrection}
              onPressUser={onPressUser}
            />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default DiaryListItem;
