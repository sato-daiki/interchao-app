import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  subTextColor,
  fontSizeS,
  borderLightColor,
  primaryColor,
  fontSizeM,
} from '../../styles/Common';
import { getAlgoliaDay } from '../../utils/diary';
import { MyDiaryStatus, UserDiaryStatus } from '../molecules';
import { Diary } from '../../types';
import Highlight from './Highlight';
import { Space, Hoverable } from '../atoms';

interface Props {
  item: Diary;
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
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left',
    flex: 1,
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
});

const SearchDiaryList: React.FC<Props> = ({
  item,
  onPressItem,
}): JSX.Element => {
  const { createdAt } = item;
  const postDay = getAlgoliaDay(createdAt);

  const onPress = useCallback(() => {
    onPressItem(item);
  }, [item, onPressItem]);

  return (
    <Hoverable style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.postDayText}>{postDay}</Text>
        <UserDiaryStatus diary={item} />
      </View>
      <Highlight
        textStyle={styles.title}
        attribute="title"
        numberOfLines={1}
        hit={item}
      />
      <Space size={8} />
      <View style={styles.content}>
        <Highlight
          textStyle={styles.text}
          attribute="text"
          numberOfLines={3}
          hit={item}
        />
      </View>
    </Hoverable>
  );
};

export default React.memo(SearchDiaryList);
