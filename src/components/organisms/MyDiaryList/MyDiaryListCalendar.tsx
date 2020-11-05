import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DateObject } from 'react-native-calendars';

import { Diary } from '@/types';
import { Calendar } from '@/components/molecules';
import {
  fontSizeM,
  fontSizeS,
  primaryColor,
  subTextColor,
} from '@/styles/Common';
import { getAlgoliaDay, getMarkedDates, MY_STATUS } from '@/utils/diary';
import { ScrollView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import I18n from '@/utils/I18n';
import MyDiaryListItem from './MyDiaryListItem';

export interface Dot {
  id: string;
  color?: string;
}

export interface MarkedDates {
  [date: string]: {
    dots?: Dot[];
    selected: boolean;
  };
}

interface Props {
  elRefs: React.MutableRefObject<Swipeable[]>;
  diaries: Diary[];
  loadNextPage: () => void;
  onPressUser: (uid: string, userName: string) => void;
  handlePressItem: (item: Diary) => void;
  handlePressDelete: (item: Diary, index: number) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  statusText: {
    fontSize: fontSizeS,
    color: primaryColor,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  emptyText: {
    color: subTextColor,
    fontSize: fontSizeM,
  },
});

const status = [
  { id: 1, color: MY_STATUS.unread.color, text: MY_STATUS.unread.text },
  { id: 2, color: MY_STATUS.draft.color, text: MY_STATUS.draft.text },
  { id: 3, color: MY_STATUS.yet.color, text: MY_STATUS.yet.text },
  { id: 4, color: MY_STATUS.done.color, text: MY_STATUS.done.text },
];

const MyDiaryListCalendar: React.FC<Props> = ({
  diaries,
  elRefs,
  onPressUser,
  handlePressItem,
  handlePressDelete,
  loadNextPage,
}) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(
    getAlgoliaDay(new Date(), 'YYYY-MM-DD')
  );

  const markedDates = useMemo(() => {
    const newMarkedDates = getMarkedDates(diaries);
    if (selectedDay) {
      return {
        ...newMarkedDates,
        [selectedDay]: {
          selected: true,
        },
      };
    }
    return {
      ...newMarkedDates,
    };
  }, [diaries, selectedDay]);

  const [targetDayDiaries, setTargetDayDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const newDiaries = diaries.filter(
      item =>
        getAlgoliaDay(item.publishedAt || item.createdAt, 'YYYY-MM-DD') ===
        selectedDay
    );
    setTargetDayDiaries(newDiaries);
  }, [diaries, selectedDay]);

  const onDayPress = useCallback((date: DateObject) => {
    setSelectedDay(date.dateString);
  }, []);

  const onMonthChange = useCallback((date: DateObject) => {
    setSelectedDay(date.dateString);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statusContainer}>
        {status.map(s => (
          <View key={s.id} style={styles.row}>
            <View style={[styles.dot, { backgroundColor: s.color }]} />
            <Text style={styles.statusText}>{s.text}</Text>
          </View>
        ))}
      </View>
      <Calendar
        markedDates={markedDates}
        markingType="multi-dot"
        onDayPress={onDayPress}
        onMonthChange={onMonthChange}
      />
      {targetDayDiaries.length > 0 ? (
        targetDayDiaries.map((item, index) => (
          <MyDiaryListItem
            key={item.objectID}
            index={index}
            item={item}
            elRefs={elRefs}
            onPressUser={onPressUser}
            handlePressItem={handlePressItem}
            handlePressDelete={handlePressDelete}
          />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {I18n.t('myDiaryList.emptyDiary')}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default MyDiaryListCalendar;
