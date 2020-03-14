import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
  softRed,
} from '../../styles/Common';
import { getPostDay } from '../../utils/diary';
import firebase from '../../constants/firebase';
import { Diary } from '../../types';
import { DiaryStatus } from '../atoms';

const { width } = Dimensions.get('window');
const EDIT_WIDTH = 48;

interface Props {
  x: Animated.Value;
  item: Diary;
  onPressItem: (item: firebase.firestore.DocumentData) => void;
  onPressMinus: () => void;
  onPressDelete: () => void;
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    flexDirection: 'row',
    paddingVertical: 8,
    width: width + EDIT_WIDTH,
    backgroundColor: '#fff',
  },
  left: {
    paddingLeft: 16,
    justifyContent: 'center',
    width: EDIT_WIDTH,
  },
  main: {
    width,
    paddingHorizontal: 16,
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
});

const DraftListItem = ({
  x,
  item,
  onPressItem,
  closeMinus,
  onPressDelete,
}: Props): JSX.Element => {
  const { createdAt, title, text } = item;
  const swipeRef = useRef(null);

  const postDay = getPostDay(createdAt);

  const onPress = (): void => {
    onPressDelete();
    swipeRef.current.close();
  };

  const onPressMinus = (): void => {
    closeMinus();
    swipeRef.current.openRight();
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.rightAction}>
        <TouchableOpacity style={styles.deleteButton} onPress={onPress}>
          <Animated.Text
            style={[styles.deleteText, { transform: [{ translateX: trans }] }]}
          >
            削除
          </Animated.Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable ref={swipeRef} renderRightActions={renderRightActions}>
      <Animated.View
        style={[styles.container, { transform: [{ translateX: x }] }]}
      >
        <View style={styles.left}>
          <MaterialCommunityIcons
            size={28}
            color={softRed}
            name="minus-circle"
            onPress={onPressMinus}
          />
        </View>
        <TouchableOpacity
          style={styles.main}
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
      </Animated.View>
    </Swipeable>
  );
};

export default DraftListItem;
