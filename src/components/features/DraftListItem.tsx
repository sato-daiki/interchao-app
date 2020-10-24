import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
  softRed,
  hoverGray,
} from '../../styles/Common';
import { getAlgoliaDay } from '../../utils/diary';
import { Diary } from '../../types';
import { DiaryStatus, Hoverable } from '../atoms';
import I18n from '../../utils/I18n';

const EDIT_WIDTH = 48;

interface Props {
  setRef: (ref: Swipeable) => void;
  x: Animated.Value;
  isEditing: boolean;
  item: Diary;
  onPressItem: (item: Diary) => void;
  onPressMinus: () => void;
  onPressDelete: () => void;
  onSwipeableOpen: () => void;
  onSwipeableClose: () => void;
}

const styles = StyleSheet.create({
  warraper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
  },
  left: {
    paddingLeft: 16,
    justifyContent: 'center',
    width: EDIT_WIDTH,
  },
  main: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  hover: {
    backgroundColor: hoverGray,
  },
});

const DraftListItem = ({
  setRef,
  x,
  isEditing,
  item,
  onPressItem,
  onPressMinus,
  onPressDelete,
  onSwipeableOpen,
  onSwipeableClose,
}: Props): JSX.Element => {
  const { updatedAt, title, text } = item;
  const postDay = getAlgoliaDay(updatedAt);

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ): JSX.Element => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View
        style={[
          styles.rightAction,
          { paddingLeft: isEditing ? EDIT_WIDTH : undefined },
        ]}
      >
        <Hoverable style={styles.deleteButton} onPress={onPressDelete}>
          <Animated.Text
            style={[styles.deleteText, { transform: [{ translateX: trans }] }]}
          >
            {I18n.t('common.delete')}
          </Animated.Text>
        </Hoverable>
      </View>
    );
  };

  return (
    <View style={styles.warraper}>
      <Swipeable
        ref={(ref: Swipeable): void => {
          setRef(ref);
        }}
        onSwipeableOpen={onSwipeableOpen}
        onSwipeableClose={onSwipeableClose}
        renderRightActions={renderRightActions}
      >
        <Animated.View
          style={[styles.container, { transform: [{ translateX: x }] }]}
        >
          <Hoverable style={styles.left} onPress={onPressMinus}>
            <MaterialCommunityIcons
              size={28}
              color={softRed}
              name="minus-circle"
            />
          </Hoverable>

          <Hoverable
            style={styles.main}
            hoverStyle={styles.hover}
            onPress={(): void => onPressItem(item)}
          >
            <View style={styles.header}>
              <Text style={styles.postDayText}>{postDay}</Text>
              {isEditing ? null : (
                <DiaryStatus
                  color={subTextColor}
                  text={I18n.t('draftListItem.draft')}
                />
              )}
            </View>
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.text} ellipsizeMode="tail" numberOfLines={3}>
              {text}
            </Text>
          </Hoverable>
        </Animated.View>
      </Swipeable>
    </View>
  );
};

export default DraftListItem;
