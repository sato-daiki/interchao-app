import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Diary } from '@/types';
import { Calendar } from '@/components/molecules';
import { fontSizeM, primaryColor } from '@/styles/Common';
import { MY_STATUS } from '@/utils/diary';
import { Day } from './Day';

interface Props {
  markedDates: any;
  onPressItem: (item: Diary) => void;
  onRefresh: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusText: {
    marginLeft: 8,
    fontSize: fontSizeM,
    color: primaryColor,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

const status = [
  { id: 1, color: MY_STATUS.unread.color, text: MY_STATUS.unread.text },
  { id: 2, color: MY_STATUS.draft.color, text: MY_STATUS.draft.text },
  { id: 3, color: MY_STATUS.yet.color, text: MY_STATUS.yet.text },
  { id: 4, color: MY_STATUS.done.color, text: MY_STATUS.done.text },
];

const MyDiaryListCalendar: React.FC<Props> = ({ markedDates }) => {
  const today = React.useMemo(() => new Date(), []);

  const dayComponent = React.useCallback(
    props => <Day today={today} {...props} />,
    [today]
  );

  return (
    <View style={styles.container}>
      <Calendar markedDates={markedDates} dayComponent={dayComponent} />
      <View style={styles.statusContainer}>
        {status.map(s => (
          <View key={s.id} style={styles.row}>
            <View style={[styles.dot, { backgroundColor: s.color }]} />
            <Text style={styles.statusText}>{s.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default MyDiaryListCalendar;
