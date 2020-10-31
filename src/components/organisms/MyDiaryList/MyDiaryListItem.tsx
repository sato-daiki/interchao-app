import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
  hoverGray,
  softRed,
} from '@/styles/Common';
import I18n from '@/utils/I18n';
import { Hoverable } from '@/components/atoms';
import { MyDiaryStatus, ProfileIcons } from '@/components/molecules';
import { getAlgoliaDay } from '@/utils/diary';
import { Diary } from '@/types';

interface Props {
  index: number;
  item: Diary;
  elRefs: React.MutableRefObject<Swipeable[]>;
  onPressUser: (uid: string, userName: string) => void;
  handlePressItem: (item: Diary) => void;
  handlePressDelete: (item: Diary, index: number) => void;
}

const styles = StyleSheet.create({
  warraper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  main: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
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
  rightAction: {
    backgroundColor: softRed,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
  },
  deleteText: {
    color: '#fff',
    fontSize: fontSizeM,
    paddingHorizontal: 32,
    fontWeight: 'bold',
  },
});

const MyDiaryListItem = ({
  index,
  item,
  elRefs,
  onPressUser,
  handlePressItem,
  handlePressDelete,
}: Props): JSX.Element => {
  const { createdAt, title, text, correction, correction2, correction3 } = item;
  const postDay = getAlgoliaDay(createdAt);

  const onPressItem = useCallback(() => {
    handlePressItem(item);
  }, [handlePressItem, item]);

  const onPressDelete = useCallback(() => {
    handlePressDelete(item, index);
  }, [handlePressDelete, index, item]);

  const renderRightActions = useCallback(
    (
      progress: Animated.AnimatedInterpolation,
      dragX: Animated.AnimatedInterpolation
    ): JSX.Element => {
      const trans = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });
      return (
        <View style={[styles.rightAction]}>
          <Hoverable style={styles.deleteButton} onPress={onPressDelete}>
            <Animated.Text
              style={[
                styles.deleteText,
                { transform: [{ translateX: trans }] },
              ]}
            >
              {I18n.t('common.delete')}
            </Animated.Text>
          </Hoverable>
        </View>
      );
    },
    [onPressDelete]
  );

  const setRef = useCallback(
    el => {
      // eslint-disable-next-line no-param-reassign
      elRefs.current[index] = el;
    },
    [elRefs, index]
  );

  return (
    <View style={styles.warraper}>
      <Swipeable ref={setRef} renderRightActions={renderRightActions}>
        <Hoverable
          style={styles.main}
          hoverStyle={styles.hover}
          onPress={onPressItem}
        >
          <View style={styles.header}>
            <Text style={styles.postDayText}>{postDay}</Text>
            <MyDiaryStatus diary={item} />
          </View>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            {title}
          </Text>

          <View style={styles.content}>
            <Text style={styles.text} ellipsizeMode="tail" numberOfLines={3}>
              {text}
            </Text>
            {correction ? (
              <View style={styles.icon}>
                <ProfileIcons
                  correction={correction}
                  correction2={correction2}
                  correction3={correction3}
                  onPressUser={onPressUser}
                />
              </View>
            ) : null}
          </View>
        </Hoverable>
      </Swipeable>
    </View>
  );
};

export default React.memo(MyDiaryListItem);
