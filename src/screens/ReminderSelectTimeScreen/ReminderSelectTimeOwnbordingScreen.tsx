import React, { useCallback } from 'react';
import ReminderSelectTime from '@/components/organisms/ReminderSelectTime/ReminderSelectTime';
import {
  initCuctomTimeInfos,
  initFixDays,
  initFixTimeInfo,
  ReminderSelectTimeOnboardingScreenType,
} from './interface';

const ReminderSelectTimeOwnbordingScreen: React.FC<ReminderSelectTimeOnboardingScreenType> = ({
  navigation,
  user,
  setUser,
}) => {
  const afterSave = useCallback(() => {
    navigation.navigate('PushSetting');
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
      defaultReminderType="fix"
      defaultNotificationStart
      defaultNotificationEnd
      defaultFixDays={initFixDays}
      defaultFixTimeInfo={initFixTimeInfo}
      defaultCuctomTimeInfos={initCuctomTimeInfos}
      user={user}
      setUser={setUser}
      gotoReminderSelectDay={gotoReminderSelectDay}
      afterSave={afterSave}
    />
  );
};

export default ReminderSelectTimeOwnbordingScreen;
