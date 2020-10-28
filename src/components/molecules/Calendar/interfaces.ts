import { DateObject } from 'react-native-calendars';

export { DayComponentProps } from 'react-native-calendars';

export type DateCallbackHandler = (date: DateObject) => void;

export type CalendarMarkedDates<T extends CalendarMarking> = {
  [date: string]: T;
};

export type CalendarMarking = {
  disabled?: boolean;
  disableTouchEvent?: boolean;
  selected?: boolean;
};
