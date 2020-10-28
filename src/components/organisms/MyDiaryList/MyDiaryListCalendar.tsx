import React from 'react';
import { View } from 'react-native';

import { Diary } from '@/types';
import { Calendar } from '@/components/molecules';
import { Day } from './Day';

interface Props {
  isEmpty: boolean;
  refreshing: boolean;
  diaries: Diary[];
  diaryTotalNum: number;
  loadNextPage: () => void;
  onPressUser: (uid: string, userName: string) => void;
  onPressItem: (item: Diary) => void;
  onRefresh: () => void;
}

const MyDiaryListCalendar: React.FC<Props> = () => {
  const today = React.useMemo(() => new Date(), []);

  const dayComponent = React.useCallback(
    props => <Day today={today} {...props} />,
    [today]
  );

  return (
    <View>
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350,
        }}
        markedDates={{
          '2020-10-26': { marked: true, status: 'blue' },
          '2020-10-27': { marked: true },
        }}
        dayComponent={dayComponent}
      />
    </View>
  );
};

export default MyDiaryListCalendar;
