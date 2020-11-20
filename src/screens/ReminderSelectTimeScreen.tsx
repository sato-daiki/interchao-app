import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { RadioBox, Space } from '@/components/atoms';
import { OptionItem, SelectTimeItem } from '@/components/molecules';

import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';
import I18n from '@/utils/I18n';
import {
  fontSizeL,
  fontSizeM,
  mainColor,
  primaryColor,
  subTextColor,
} from '@/styles/Common';
import { User } from '@/types';
import { getShortDayName, getShortDaysName } from '@/utils/time';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

type ScreenType = StackScreenProps<
  OnboardingStackParamList,
  'ReminderSelectTime'
> &
  Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    paddingTop: 32,
    paddingHorizontal: 16,
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  subText: {
    fontSize: fontSizeM,
    color: subTextColor,
    marginRight: 8,
  },
});

interface Time {
  startTime: Date;
  endTime: Date;
}

const ReminderSelectTimeScreen: React.FC<ScreenType> = ({
  navigation,
  user,
}) => {
  const [fixTime, setFixTime] = useState<Time>({
    startTime: new Date(),
    endTime: new Date(),
  });
  const [customTimes, setCustomTimes] = useState<Time[]>();
  const [isFix, setIsFix] = useState(true);

  const onPressFix = useCallback(() => {
    setIsFix(true);
  }, []);

  const onPressCustom = useCallback(() => {
    setIsFix(true);
  }, []);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleStartTime = useCallback(
    ({ day, time }: { day: number; time: Date }) => {
      setFixTime({ ...fixTime, startTime: time });
    },
    [fixTime]
  );

  const handleEndTime = useCallback(
    ({ day, time }: { day: number; time: Date }) => {
      setFixTime({ ...fixTime, endTime: time });
    },
    [fixTime]
  );

  const handleStartTimeCustom = useCallback(
    ({ day, time }: { day: number; time: Date }) => {
      const newCustomTimes = user.reminder?.remindeDays?.map(item => {
        if (item.day !== day) {
          return item;
        }
        return {
          ...item,
          startTime: time,
        };
      });
      setCustomTimes(newCustomTimes);
    },
    [user.reminder]
  );

  const handleEndTimeCustom = useCallback(
    ({ day, time }: { day: number; time: Date }) => {
      const newCustomTimes = user.reminder?.remindeDays?.map(item => {
        if (item.day !== day) {
          return item;
        }
        return {
          ...item,
          endTime: time,
        };
      });
      setCustomTimes(newCustomTimes);
    },
    [user.reminder]
  );

  const righComponent = (
    <Text style={styles.subText}>
      {getShortDaysName(user.reminder?.remindeDays)}
    </Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t('reminderSelectDay.title')}</Text>

      <View style={styles.fixContainer}>
        <RadioBox
          checked={isFix}
          color={mainColor}
          text={I18n.t('reminderSelectTime.fix')}
          onPress={onPressFix}
        />
        <Space size={16} />
        <SelectTimeItem
          heading="時間"
          startTime={fixTime.startTime}
          handleStartTime={handleStartTime}
          endTime={fixTime.endTime}
          handleEndTime={handleEndTime}
        />
        <OptionItem
          title={I18n.t('reminderSelectTime.studyDay')}
          onPress={onPressBack}
          righComponent={righComponent}
        />
      </View>
      <Space size={32} />

      <RadioBox
        checked={!isFix}
        color={mainColor}
        text={I18n.t('reminderSelectTime.custom')}
        onPress={onPressCustom}
      />
      <Space size={16} />
      {user.reminder && user.reminder.remindeDays
        ? user.reminder.remindeDays.map(remindeDay => {
            if (!user.reminder || !user.reminder.remindeDays) return <View />;
            return (
              <SelectTimeItem
                key={remindeDay.day}
                heading={getShortDayName(remindeDay.day)}
                startTime={user.reminder.remindeDays[remindeDay.day].startTime}
                handleStartTime={handleStartTimeCustom}
                endTime={user.reminder.remindeDays[remindeDay.day].endTime}
                handleEndTime={handleEndTimeCustom}
                disable
              />
            );
          })
        : null}

      <OptionItem
        title={I18n.t('reminderSelectTime.studyDay')}
        onPress={onPressBack}
        righComponent={righComponent}
      />
    </View>
  );
};

export default ReminderSelectTimeScreen;
