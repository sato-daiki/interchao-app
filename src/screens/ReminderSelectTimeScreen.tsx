import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { HeaderText, LoadingModal, RadioBox } from '@/components/atoms';

import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';
import I18n from '@/utils/I18n';
import { fontSizeL, mainColor, primaryColor } from '@/styles/Common';
import { RemindeDay, Reminder, User } from '@/types';
import { addDay } from '@/utils/time';
import ReminderSelectTimeFix from '@/components/organisms/ReminderSelectTime/ReminderSelectTimeFix';
import ReminderSelectTimeCustom from '@/components/organisms/ReminderSelectTime/ReminderSelectTimeCustom';
import { CheckItem } from '@/components/molecules';
import firebase from '@/constants/firebase';

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
  fixContainer: {
    paddingBottom: 48,
  },
  checkContainer: {},
  radioBox: {
    marginHorizontal: 8,
    paddingBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export interface CheckedDay {
  day: number;
  checked: boolean;
  timeStart?: Date;
  timeEnd?: Date;
  isFocus?: boolean;
  isErrorStart?: boolean;
  isErrorEnd?: boolean;
}

export interface FixTimeInfo {
  timeStart: Date;
  timeEnd: Date;
  isFocus: boolean;
  isErrorStart: boolean;
  isErrorEnd: boolean;
}

export interface CustomTimeInfo {
  day: number;
  checked: boolean;
  timeStart: Date;
  timeEnd: Date;
  isFocus: boolean;
  isErrorStart: boolean;
  isErrorEnd: boolean;
}

const initFixDays: CheckedDay[] = [...Array(7)].map((_, i) => {
  return {
    day: i,
    checked: true,
  };
});

const initFixTimeInfo: FixTimeInfo = {
  timeStart: new Date(2000, 1, 1, 20, 0, 0),
  timeEnd: new Date(2000, 1, 1, 21, 0, 0),
  isFocus: false,
  isErrorStart: false,
  isErrorEnd: false,
};

const initCuctomTimeInfos: CustomTimeInfo[] = [...Array(7)].map((_, i) => {
  return {
    day: i,
    checked: true,
    timeStart: new Date(2000, 1, 1, 20, 0, 0),
    timeEnd: new Date(2000, 1, 1, 21, 0, 0),
    isFocus: false,
    isErrorStart: false,
    isErrorEnd: false,
  };
});

const ReminderSelectTimeScreen: React.FC<ScreenType> = ({
  navigation,
  user,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFix, setIsFix] = useState(true);
  const [notificationStart, setNotificationStart] = useState(true);
  const [notificationEnd, setNotificationEnd] = useState(true);

  const [fixDays, setFixDays] = useState(initFixDays);
  const [fixTimeInfo, setFixTimeInfo] = useState(initFixTimeInfo);
  const [customTimeInfos, setCustomTimeInfos] = useState(initCuctomTimeInfos);

  const onPressDone = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    let remindeDays: RemindeDay[];
    if (isFix) {
      remindeDays = fixDays
        .filter(item => item.checked)
        .map(item => {
          return {
            day: item.day,
            timeStart: fixTimeInfo.timeStart,
            timeEnd: fixTimeInfo.timeEnd,
          };
        });
    } else {
      remindeDays = customTimeInfos
        .filter(item => item.checked)
        .map(item => {
          return {
            day: item.day,
            timeStart: item.timeStart,
            timeEnd: item.timeEnd,
          };
        });
    }

    const reminder: Reminder = {
      remindeDays,
      notificationStart,
      notificationEnd,
    };
    await firebase
      .firestore()
      .doc(`users/${user.uid}`)
      .update({
        reminder,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

    setIsLoading(false);
    navigation.navigate('PushSetting');
  }, [
    customTimeInfos,
    fixDays,
    fixTimeInfo.timeEnd,
    fixTimeInfo.timeStart,
    isFix,
    isLoading,
    navigation,
    notificationEnd,
    notificationStart,
    user.uid,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (): JSX.Element | null => (
        <HeaderText text={I18n.t('common.done')} onPress={onPressDone} />
      ),
    });
  }, [navigation, onPressDone]);

  const onPressFix = useCallback(() => {
    setIsFix(true);
  }, []);

  const onPressCustom = useCallback(() => {
    setIsFix(false);
  }, []);

  const onPressFixStudyDay = useCallback(() => {
    navigation.navigate('ReminderSelectDay', {
      checkedDays: fixDays,
      onChangeCheckedDays: setFixDays,
    });
  }, [fixDays, navigation]);

  const handleFixTimeStart = useCallback(
    (_day: number | undefined, time: Date) => {
      setFixTimeInfo({
        ...fixTimeInfo,
        timeStart: time,
        timeEnd: !fixTimeInfo.isFocus
          ? addDay(time, 1, 'h')
          : fixTimeInfo.timeEnd,
        isFocus: true,
        isErrorStart: false,
        isErrorEnd: time > fixTimeInfo.timeEnd,
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
        isErrorStart: time < fixTimeInfo.timeStart,
        isErrorEnd: false,
      });
    },
    [fixTimeInfo]
  );

  const onPressCustomStudyDay = useCallback(() => {
    navigation.navigate('ReminderSelectDay', {
      checkedDays: customTimeInfos,
      onChangeCheckedDays: setCustomTimeInfos,
    });
  }, [customTimeInfos, navigation]);

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
          isErrorStart: false,
          isErrorEnd: time > timeEnd,
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
          isErrorStart: time < item.timeStart,
          isErrorEnd: false,
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

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <Text style={styles.title}>{I18n.t('reminderSelectDay.title')}</Text>

      <View style={styles.fixContainer}>
        <View style={styles.radioBox}>
          <RadioBox
            textStyle={styles.bold}
            checked={isFix}
            color={mainColor}
            text={I18n.t('reminderSelectTime.fix')}
            onPress={onPressFix}
          />
        </View>
        <ReminderSelectTimeFix
          disable={!isFix}
          fixDays={fixDays}
          fixTimeInfo={fixTimeInfo}
          handleTimeStart={handleFixTimeStart}
          handleTimeEnd={handleFixTimeEnd}
          onPressStudyDay={onPressFixStudyDay}
        />
      </View>
      <View style={styles.fixContainer}>
        <View style={styles.radioBox}>
          <RadioBox
            textStyle={styles.bold}
            checked={!isFix}
            color={mainColor}
            text={I18n.t('reminderSelectTime.custom')}
            onPress={onPressCustom}
          />
        </View>
        <ReminderSelectTimeCustom
          disable={isFix}
          customTimeInfos={customTimeInfos}
          handleTimeStart={handleCumtomTimeStart}
          handleTimeEnd={handleCumtomTimeEnd}
          onPressStudyDay={onPressCustomStudyDay}
        />
      </View>
      <View style={styles.checkContainer}>
        <CheckItem
          title={I18n.t('reminderSelectTime.notificationStart')}
          checked={notificationStart}
          onPress={onPressNotificationStart}
        />
        <CheckItem
          title={I18n.t('reminderSelectTime.notificationEnd')}
          checked={notificationEnd}
          onPress={onPressNotificationEnd}
        />
      </View>
    </View>
  );
};

export default ReminderSelectTimeScreen;
