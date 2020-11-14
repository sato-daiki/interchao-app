import React, { useCallback } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Platform } from '@unimodules/core';
import { Diary } from '@/types';

import { fontSizeM, softRed } from '@/styles/Common';
import I18n from '@/utils/I18n';
import { Hoverable } from '@/components/atoms';
import DiaryListItem from '@/components/organisms/DiaryListItem';

interface Props {
  index: number;
  item: Diary;
  elRefs: React.MutableRefObject<Swipeable[]>;
  onPressUser: (uid: string, userName: string) => void;
  handlePressItem: (item: Diary) => void;
  handlePressDelete: (item: Diary, index: number) => void;
}

const styles = StyleSheet.create({
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
  const onPressItem = useCallback(() => {
    handlePressItem(item);
  }, [handlePressItem, item]);

  const onPressDelete = useCallback(() => {
    handlePressDelete(item, index);
  }, [handlePressDelete, index, item]);

  const renderRightActions = useCallback(
    (
      _progress: Animated.AnimatedInterpolation,
      dragX: Animated.AnimatedInterpolation
    ): JSX.Element | null => {
      if (Platform.OS === 'web') return null;
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
    <Swipeable ref={setRef} renderRightActions={renderRightActions}>
      <DiaryListItem
        mine
        item={item}
        onPressUser={onPressUser}
        onPressItem={onPressItem}
      />
    </Swipeable>
  );
};

export default React.memo(MyDiaryListItem);
