import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { HeaderButton, LoadingModal, RadioBox } from '@/components/atoms';

import I18n from '@/utils/I18n';
import { fontSizeL, mainColor, primaryColor } from '@/styles/Common';
import { RemindeDay, Reminder, ReminderType, User } from '@/types';
import { addDay } from '@/utils/time';
import ReminderSelectTimeFix from '@/components/organisms/ReminderSelectTime/ReminderSelectTimeFix';
import ReminderSelectTimeCustom from '@/components/organisms/ReminderSelectTime/ReminderSelectTimeCustom';
import { CheckItem } from '@/components/molecules';
import firebase from '@/constants/firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';
import { RouteProp } from '@react-navigation/native';
import {
  MyPageTabNavigationProp,
  MyPageTabStackParamList,
} from '@/navigations/MyPageTabNavigator';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

type NavigationProp = StackScreenProps<
  OnboardingStackParamList | MyPageTabStackParamList,
  'ReminderSelectTime'
>;

type ScreenType = {
  navigation: NavigationProp;
  route: RouteProp<
    OnboardingStackParamList | MyPageTabStackParamList,
    'ReminderSelectTime'
  >;
} & Props &
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
  radioContainer: {
    paddingBottom: 16,
  },
  checkContainer: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  radioBox: {
    marginHorizontal: 8,
    paddingBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 16,
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
}

export interface FixTimeInfo {
  timeStart: Date;
  timeEnd: Date;
  isFocus: boolean;
}

export interface CustomTimeInfo {
  day: number;
  checked: boolean;
  timeStart: Date;
  timeEnd: Date;
  isFocus: boolean;
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
};

const initCuctomTimeInfos: CustomTimeInfo[] = [...Array(7)].map((_, i) => {
  return {
    day: i,
    checked: true,
    timeStart: new Date(2000, 1, 1, 20, 0, 0),
    timeEnd: new Date(2000, 1, 1, 21, 0, 0),
    isFocus: false,
  };
});

const ReminderSelectTimeScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  user,
  setUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [reminderType, setrRminderType] = useState<ReminderType>('fix');
  const [notificationStart, setNotificationStart] = useState(true);
  const [notificationEnd, setNotificationEnd] = useState(true);

  const [fixDays, setFixDays] = useState(initFixDays);
  const [fixTimeInfo, setFixTimeInfo] = useState(initFixTimeInfo);
  const [customTimeInfos, setCustomTimeInfos] = useState(initCuctomTimeInfos);

  // useLayoutEffect(() => {
  //   // 初回 or まだ未登録の場合
  //   if (!user.reminder) return;

  //   // 登録済みの場合
  //   setrRminderType(user.reminder.reminderType);
  //   setNotificationStart(user.reminder.notificationStart);
  //   setNotificationEnd(user.reminder.notificationEnd);
  //   if (user.reminder.reminderType === 'fix') {
  //     initFixDays

  //     setFixDays();
  //     setFixTimeInfo;
  //   } else {
  //     setCustomTimeInfos();
  //   }
  // }, [user.reminder]);

  const onPressDone = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    let remindeDays: RemindeDay[];
    if (reminderType === 'fix') {
      remindeDays = fixDays
        .filter(item => item.checked)
        .map(item => {
          return {
            day: item.day,
            timeStart: fixTimeInfo.timeStart,
            timeEnd: fixTimeInfo.timeEnd,
          };
        });
    } else if (reminderType === 'custom') {
      remindeDays = customTimeInfos
        .filter(item => item.checked)
        .map(item => {
          return {
            day: item.day,
            timeStart: item.timeStart,
            timeEnd: item.timeEnd,
          };
        });
    } else {
      // ここには入らない
      return;
    }

    const reminder: Reminder = {
      reminderType,
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

    setUser({
      ...user,
      reminder,
    });

    setIsLoading(false);
    navigation.navigate('PushSetting');
  }, [
    customTimeInfos,
    fixDays,
    fixTimeInfo.timeEnd,
    fixTimeInfo.timeStart,
    isLoading,
    navigation,
    notificationEnd,
    notificationStart,
    reminderType,
    setUser,
    user,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (): JSX.Element | null => (
        <HeaderButton
          title={I18n.t('common.save')}
          color={mainColor}
          onPress={onPressDone}
        />
      ),
    });
  }, [navigation, onPressDone]);

  const onPressFix = useCallback(() => {
    setrRminderType('fix');
  }, []);

  const onPressCustom = useCallback(() => {
    setrRminderType('custom');
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

  return (
    <ScrollView style={styles.container}>
      <LoadingModal visible={isLoading} />
      <Text style={styles.title}>{I18n.t('reminderSelectTime.title')}</Text>

      <View style={styles.radioContainer}>
        <View style={styles.radioBox}>
          <RadioBox
            textStyle={styles.bold}
            checked={reminderType === 'fix'}
            color={mainColor}
            text={I18n.t('reminderSelectTime.fix')}
            onPress={onPressFix}
          />
        </View>
        <ReminderSelectTimeFix
          disable={reminderType !== 'fix'}
          fixDays={fixDays}
          fixTimeInfo={fixTimeInfo}
          handleTimeStart={handleFixTimeStart}
          handleTimeEnd={handleFixTimeEnd}
          onPressStudyDay={onPressFixStudyDay}
        />
      </View>
      <View style={styles.radioContainer}>
        <View style={styles.radioBox}>
          <RadioBox
            textStyle={styles.bold}
            checked={reminderType === 'custom'}
            color={mainColor}
            text={I18n.t('reminderSelectTime.custom')}
            onPress={onPressCustom}
          />
        </View>
        <ReminderSelectTimeCustom
          disable={reminderType !== 'custom'}
          customTimeInfos={customTimeInfos}
          handleTimeStart={handleCumtomTimeStart}
          handleTimeEnd={handleCumtomTimeEnd}
          onPressStudyDay={onPressCustomStudyDay}
        />
      </View>
      <View style={styles.checkContainer}>
        <Text style={styles.label}>
          {I18n.t('reminderSelectTime.notificationLable')}
        </Text>
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
    </ScrollView>
  );
};

export default ReminderSelectTimeScreen;
