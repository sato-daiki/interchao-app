import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';
import I18n from '@/utils/I18n';
import { fontSizeL, primaryColor } from '@/styles/Common';
import { CheckItem } from '@/components/molecules';
import { RemindeDay, Reminder, User } from '@/types';
import { SubmitButton } from '@/components/atoms';
import { getDayName } from '@/utils/time';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

type ScreenType = StackScreenProps<
  OnboardingStackParamList,
  'ReminderSelectDay'
> &
  Props &
  DispatchProps;

interface CheckedDay {
  day: number;
  checked: boolean;
}

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
  button: {
    marginTop: 32,
    marginHorizontal: 16,
  },
});

const initialCheckedDays: CheckedDay[] = [
  { day: 0, checked: true },
  { day: 1, checked: true },
  { day: 2, checked: true },
  { day: 3, checked: true },
  { day: 4, checked: true },
  { day: 5, checked: true },
  { day: 6, checked: true },
];

const ReminderSelectDayScreen: React.FC<ScreenType> = ({
  navigation,
  setUser,
  user,
}) => {
  const [checkedDays, setCheckedDays] = useState<CheckedDay[]>(
    initialCheckedDays
  );

  const onPressNext = useCallback(() => {
    const remindeDays: RemindeDay[] = checkedDays
      .filter(item => item.checked === true)
      .map(item => {
        return {
          day: item.day,
          startTime: new Date(),
          endTime: new Date(),
        };
      });

    const reminder: Reminder = {
      notificationStart: true,
      notificationEnd: true,
      remindeDays,
    };

    setUser({
      ...user,
      reminder,
    });
    navigation.navigate('ReminderSelectTime');
  }, [checkedDays, navigation, setUser, user]);

  const onPressDay = useCallback(
    day => {
      const newDays = checkedDays.map(item => {
        if (item.day !== day) {
          return item;
        }
        return {
          ...item,
          checked: !checkedDays[day].checked,
        };
      });
      setCheckedDays(newDays);
    },
    [checkedDays]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t('reminderSelectDay.title')}</Text>
      {checkedDays.map(item => (
        <CheckItem
          key={item.day}
          checked={item.checked}
          title={getDayName(item.day)}
          onPress={(): void => onPressDay(item.day)}
        />
      ))}
      <View style={styles.button}>
        <SubmitButton title={I18n.t('common.next')} onPress={onPressNext} />
      </View>
    </View>
  );
};

export default ReminderSelectDayScreen;
