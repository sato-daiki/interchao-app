import { MarkedDates } from '@/components/organisms/MyDiaryList';
import * as React from 'react';
import { Calendar as RNCalendar, CalendarProps } from 'react-native-calendars';

// 日本語ロケール有効化
import './localeConfig';

export { CalendarProps } from 'react-native-calendars';

type Props = CalendarProps & {
  markedDates?: MarkedDates;
  markingType?: string;
};

export const Calendar: React.FC<Props> = React.memo(({ ...props }) => (
  <RNCalendar
    {...props}
    // Swipeで月移動できるように
    enableSwipeMonths
  />
));

Calendar.displayName = 'Calendar';
