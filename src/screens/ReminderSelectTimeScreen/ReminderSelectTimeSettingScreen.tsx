import React, { useCallback } from 'react';
import ReminderSelectTime from '@/components/organisms/ReminderSelectTime/ReminderSelectTime';
import { Reminder } from '@/types';
import {
  DefaultInfo,
  initCuctomTimeInfos,
  initFixDays,
  initFixTimeInfo,
  ReminderSelectTimeSettingScreenType,
} from './interface';

const getDefault = (reminder?: Reminder): DefaultInfo => {
  const defaultInfo: DefaultInfo = {
    defaultReminderType: 'fix',
    defaultNotificationStart: true,
    defaultNotificationEnd: true,
    defaultFixDays: initFixDays,
    defaultFixTimeInfo: initFixTimeInfo,
    defaultCuctomTimeInfos: initCuctomTimeInfos,
  };
  if (!reminder) {
    return defaultInfo;
  }

  const common = {
    defaultReminderType: reminder.timeInfo.reminderType,
    defaultNotificationStart: reminder.notificationStart,
    defaultNotificationEnd: reminder.notificationEnd,
  };

  if (reminder.timeInfo.reminderType === 'custom') {
    return {
      ...common,
      defaultFixDays: initFixDays,
      defaultFixTimeInfo: initFixTimeInfo,
      defaultCuctomTimeInfos: reminder.timeInfo.customTimeInfos,
    };
  }
  if (reminder.timeInfo.reminderType === 'fix') {
    return {
      ...common,
      defaultFixDays: reminder.timeInfo.fixDays,
      defaultFixTimeInfo: reminder.timeInfo.fixTimeInfo,
      defaultCuctomTimeInfos: initCuctomTimeInfos,
    };
  }
  // error
  return defaultInfo;
};

const ReminderSelectTimeSettingScreen: React.FC<ReminderSelectTimeSettingScreenType> = ({
  navigation,
  user,
  setUser,
}) => {
  const {
    defaultReminderType,
    defaultNotificationStart,
    defaultNotificationEnd,
    defaultFixDays,
    defaultFixTimeInfo,
    defaultCuctomTimeInfos,
  } = getDefault(user.reminder);

  const afterSave = useCallback(() => {
    navigation.navigate('Setting');
  }, [navigation]);

  const gotoReminderSelectDay = useCallback(
    param => {
      navigation.navigate('ReminderSelectDay', param);
    },
    [navigation]
  );

  return (
    <ReminderSelectTime
      navigation={navigation}
      defaultReminderType={defaultReminderType}
      defaultNotificationStart={defaultNotificationStart}
      defaultNotificationEnd={defaultNotificationEnd}
      defaultFixDays={defaultFixDays}
      defaultFixTimeInfo={defaultFixTimeInfo}
      defaultCuctomTimeInfos={defaultCuctomTimeInfos}
      user={user}
      setUser={setUser}
      gotoReminderSelectDay={gotoReminderSelectDay}
      afterSave={afterSave}
    />
  );
};

export default ReminderSelectTimeSettingScreen;
