import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';
import I18n from '@/utils/I18n';
import { fontSizeL, primaryColor } from '@/styles/Common';
import { CheckItemDay } from '@/components/molecules';
import { SubmitButton } from '@/components/atoms';
import { getDayName } from '@/utils/time';
import { RouteProp } from '@react-navigation/native';

type NavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'ReminderSelectDay'
>;

type ScreenType = {
  navigation: NavigationProp;
  route: RouteProp<OnboardingStackParamList, 'ReminderSelectDay'>;
};

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

const ReminderSelectDayScreen: React.FC<ScreenType> = ({
  navigation,
  route,
}) => {
  const [checkeds, setCheckeds] = useState(
    route.params.checkedDays.map(item => item.checked)
  );

  const onPressDone = useCallback(() => {
    const newDays = route.params.checkedDays.map((item, i) => {
      return {
        ...item,
        checked: checkeds[i],
      };
    });
    route.params.onChangeCheckedDays(newDays);
    navigation.goBack();
  }, [checkeds, navigation, route.params]);

  const onPressOneDay = useCallback(
    (day: number) => {
      const newCheckeds = checkeds.map((checked, i) => {
        if (i !== day) {
          return checked;
        }
        return !checked;
      });
      // reduxは更新が思いからstatでも管理する
      setCheckeds(newCheckeds);
    },
    [checkeds]
  );

  const checkItemDayPills = [
    {
      day: 0,
      title: getDayName(0),
      checked: checkeds[0],
      onPress: () => onPressOneDay(0),
    },
    {
      day: 1,
      title: getDayName(1),
      checked: checkeds[1],
      onPress: () => onPressOneDay(1),
    },
    {
      day: 2,
      title: getDayName(2),
      checked: checkeds[2],
      onPress: () => onPressOneDay(2),
    },
    {
      day: 3,
      title: getDayName(3),
      checked: checkeds[3],
      onPress: () => onPressOneDay(3),
    },
    {
      day: 4,
      title: getDayName(4),
      checked: checkeds[4],
      onPress: () => onPressOneDay(4),
    },
    {
      day: 5,
      title: getDayName(5),
      checked: checkeds[5],
      onPress: () => onPressOneDay(5),
    },
    {
      day: 6,
      title: getDayName(6),
      checked: checkeds[6],
      onPress: () => onPressOneDay(6),
    },
    {
      day: 7,
      title: getDayName(7),
      checked: checkeds[7],
      onPress: () => onPressOneDay(7),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t('reminderSelectDay.title')}</Text>
      <CheckItemDay {...checkItemDayPills[0]} />
      <View style={styles.button}>
        <SubmitButton title={I18n.t('common.done')} onPress={onPressDone} />
      </View>
    </View>
  );
};

export default ReminderSelectDayScreen;
