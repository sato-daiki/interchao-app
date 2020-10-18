import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
  hoverGray,
} from '../../styles/Common';
import { getAlgoliaDay } from '../../utils/diary';
import { Diary } from '../../types';
import { UserDiaryStatus } from '../molecules';
import { ProfileIcon, Hoverable } from '../atoms';
import I18n from '../../utils/I18n';

interface Props {
  item: Diary;
  onPressUser: (uid: string, userName: string) => void;
  onPressItem: (item: Diary) => void;
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
  hover: {
    backgroundColor: hoverGray,
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postDay: {
    color: subTextColor,
    fontSize: fontSizeS,
  },
  textLength: {
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
  const { photoUrl, nativeLanguage, uid, userName } = profile;
  const postDay = getAlgoliaDay(createdAt);

  const onPressRow = useCallback(() => {
    onPressItem(item);
  }, [item, onPressItem]);

  const onPressProfileIcon = useCallback(() => {
    onPressUser(uid, userName);
  }, [onPressUser, uid, userName]);

  return (
    <Hoverable
      style={styles.container}
      hoverStyle={styles.hover}
      onPress={onPressRow}
    >
      <ProfileIcon
        photoUrl={photoUrl}
        nativeLanguage={nativeLanguage}
        onPress={onPressProfileIcon}
      />
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
          <View style={styles.footer}>
            <Text style={styles.postDay}>{postDay}</Text>
            <Text style={styles.textLength}>
              {I18n.t('postDiaryComponent.textLength')}
              {` ${text.length}`}
            </Text>
          </View>
        </View>
      </View>
    </Hoverable>
  );
};

export default React.memo(TeachDiaryListItem);
