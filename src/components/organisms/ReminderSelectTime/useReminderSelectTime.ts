import { useCallback, useState } from 'react';
import * as Notifications from 'expo-notifications';

import { Reminder, ReminderType, TimeInfo } from '@/types';
import { addDay } from '@/utils/time';
import firebase from '@/constants/firebase';
import { ReminderSelectTimeProps } from './ReminderSelectTime';

type Props = Pick<
  ReminderSelectTimeProps,
  | 'defaultReminderType'
  | 'defaultNotificationStart'
  | 'defaultNotificationEnd'
  | 'defaultFixDays'
  | 'defaultFixTimeInfo'
  | 'defaultCuctomTimeInfos'
  | 'user'
  | 'setUser'
  | 'gotoReminderSelectDay'
  | 'afterSave'
>;

export const useReminderSelectTime = ({
  defaultReminderType,
  defaultNotificationStart,
  defaultNotificationEnd,
  defaultFixDays,
  defaultFixTimeInfo,
  defaultCuctomTimeInfos,
  user,
  setUser,
  gotoReminderSelectDay,
  afterSave,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [reminderType, setrRminderType] = useState<ReminderType>(
    defaultReminderType
  );
  const [notificationStart, setNotificationStart] = useState(
    defaultNotificationStart
  );
  const [notificationEnd, setNotificationEnd] = useState(
    defaultNotificationEnd
  );

  const [fixDays, setFixDays] = useState(defaultFixDays);
  const [fixTimeInfo, setFixTimeInfo] = useState(defaultFixTimeInfo);
  const [customTimeInfos, setCustomTimeInfos] = useState(
    defaultCuctomTimeInfos
  );

  const onPressDone = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    let timeInfo: TimeInfo;

    if (reminderType === 'fix') {
      timeInfo = {
        reminderType: 'fix',
        fixDays,
        fixTimeInfo,
      };
    } else {
      timeInfo = {
        reminderType: 'custom',
        customTimeInfos,
      };
    }

    const reminder: Reminder = {
      notificationStart,
      notificationEnd,
      timeInfo,
    };
    await firebase
      .firestore()
      .doc(`users/${user.uid}`)
      .update({
        reminder,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

    const aa = await Notifications.getAllScheduledNotificationsAsync();

    console.log(aa);
    console.log('start');

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time's up!",
        body: 'Change sides!',
      },
      trigger: {
        seconds: 60,
      },
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Remember to drink water',
      },
      trigger: {
        seconds: 60,
        repeats: true,
      },
    });

    console.log('set');

    setUser({
      ...user,
      reminder,
    });

    setIsLoading(false);
    afterSave();
  }, [
    afterSave,
    customTimeInfos,
    fixDays,
    fixTimeInfo,
    isLoading,
    notificationEnd,
    notificationStart,
    reminderType,
    setUser,
    user,
  ]);

  const onPressFix = useCallback(() => {
    setrRminderType('fix');
  }, []);

  const onPressCustom = useCallback(() => {
    setrRminderType('custom');
  }, []);

  const onPressFixStudyDay = useCallback(() => {
    gotoReminderSelectDay({
      checkedDays: fixDays,
      onChangeCheckedDays: setFixDays,
    });
  }, [fixDays, gotoReminderSelectDay]);

  const handleFixTimeStart = useCallback(
    (_day: number | undefined, time: Date) => {
      setFixTimeInfo({
        ...fixTimeInfo,
        timeStart: time,
        timeEnd: !fixTimeInfo.isFocus
          ? addDay(time, 1, 'h')
          : fixTimeInfo.timeEnd,
        isFocus: true,
      });
    },
    [fixTimeInfo]
  );

  const handleFixTimeEnd = useCallback(
    (_day: number | undefined, time: Date) => {
      setFixTimeInfo({
        ...fixTimeInfo,
        timeEnd: time,
        isFocus: true,
      });
    },
    [fixTimeInfo]
  );

  const onPressCustomStudyDay = useCallback(() => {
    gotoReminderSelectDay({
      checkedDays: customTimeInfos,
      onChangeCheckedDays: setCustomTimeInfos,
    });
  }, [customTimeInfos, gotoReminderSelectDay]);

  const handleCumtomTimeStart = useCallback(
    (day: number | undefined, time: Date) => {
      const newCustomTimeInfos = customTimeInfos.map(item => {
        if (item.day !== day) {
          return item;
        }
        const timeEnd = !item.isFocus ? addDay(time, 1, 'h') : item.timeEnd;
        return {
          ...item,
          timeStart: time,
          timeEnd,
          isFocus: true,
        };
      });
      setCustomTimeInfos(newCustomTimeInfos);
    },
    [customTimeInfos]
  );

  const handleCumtomTimeEnd = useCallback(
    (day: number | undefined, time: Date) => {
      const newCustomTimes = customTimeInfos.map(item => {
        if (item.day !== day) {
          return item;
        }
        return {
          ...item,
          timeEnd: time,
          isFocus: true,
        };
      });
      setCustomTimeInfos(newCustomTimes);
    },
    [customTimeInfos]
  );

  const onPressNotificationStart = useCallback(() => {
    setNotificationStart(!notificationStart);
  }, [notificationStart]);
  const onPressNotificationEnd = useCallback(() => {
    setNotificationEnd(!notificationEnd);
  }, [notificationEnd]);

  return {
    isLoading,
    notificationStart,
    notificationEnd,
    reminderType,
    fixDays,
    fixTimeInfo,
    customTimeInfos,
    handleFixTimeStart,
    handleFixTimeEnd,
    handleCumtomTimeStart,
    handleCumtomTimeEnd,
    onPressDone,
    onPressFix,
    onPressCustom,
    onPressCustomStudyDay,
    onPressFixStudyDay,
    onPressNotificationStart,
    onPressNotificationEnd,
  };
};
