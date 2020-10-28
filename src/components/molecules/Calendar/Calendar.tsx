import * as React from 'react';
import { Text, View } from 'react-native';
import {
  Calendar as RNCalendar,
  CalendarProps,
  CalendarTheme,
} from 'react-native-calendars';
import XDate from 'xdate';

// 日本語ロケール有効化
import './localeConfigJa';

export { CalendarProps } from 'react-native-calendars';

const customTheme: CalendarTheme = {
  'stylesheet.calendar.main': {
    //   container: {
    //     paddingLeft: 0,
    //     paddingRight: 0,
    //     backgroundColor: '#fff',
    //   },
    week: {
      marginTop: 0,
      marginBottom: 0,
      // from default style
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
  // 'stylesheet.calendar.header': {
  //   arrow: {
  //     paddingHorizontal: 20,
  //     flex: 1,
  //   },
  // },
};

const renderHeader = (date: XDate): JSX.Element => (
  <View>
    <Text>{date.toString('yyyy年M月')}</Text>
  </View>
);

type Props = CalendarProps & { loading?: boolean };

export const Calendar: React.FC<Props> = React.memo(({ loading, ...props }) => (
  <>
    {/* {loading && <Loading />} */}
    <RNCalendar
      {...props}
      // Swipeで月移動できるように
      enableSwipeMonths
      theme={customTheme}
      // renderArrow={renderArrow}
      // @ts-ignore: renderHeader @typesに含まれていない
      renderHeader={renderHeader}
    />
  </>
));

Calendar.displayName = 'Calendar';
