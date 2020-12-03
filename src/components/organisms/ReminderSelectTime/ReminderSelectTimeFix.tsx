import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { OptionItem, SelectTimeItem } from '@/components/molecules';

import I18n from '@/utils/I18n';
import { getShortDaysName } from '@/utils/time';
import { fontSizeM, subTextColor } from '@/styles/Common';
import { CheckedDay, FixTimeInfo } from '@/screens/ReminderSelectTimeScreen';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFF',
  },
  subText: {
    fontSize: fontSizeM,
    color: subTextColor,
    marginRight: 8,
  },
});

interface Props {
  disable: boolean;
  fixDays: CheckedDay[];
  fixTimeInfo: FixTimeInfo;
  handleTimeStart: (day: number | undefined, timeStart: Date) => void;
  handleTimeEnd: (day: number | undefined, timeEnd: Date) => void;
  onPressStudyDay: () => void;
}

const ReminderSelectTimeFix: React.FC<Props> = ({
  disable,
  fixDays,
  fixTimeInfo,
  handleTimeStart,
  handleTimeEnd,
  onPressStudyDay,
}) => {
  console.log('fixDays', fixDays);
  const righComponent = useMemo(
    () => (
      <Text style={styles.subText}>
        {getShortDaysName(
          fixDays.filter(item => item.checked).map(item => item.day)
        )}
      </Text>
    ),
    [fixDays]
  );

  return (
    <View style={[styles.container, { opacity: disable ? 0.4 : 1 }]}>
      <OptionItem
        title={I18n.t('reminderSelectTime.studyDay')}
        onPress={onPressStudyDay}
        righComponent={righComponent}
      />
      <SelectTimeItem
        heading={I18n.t('reminderSelectTime.time')}
        timeStart={fixTimeInfo.timeStart}
        timeEnd={fixTimeInfo.timeEnd}
        handleTimeStart={handleTimeStart}
        handleTimeEnd={handleTimeEnd}
        isErrorStart={fixTimeInfo.isErrorStart}
        isErrorEnd={fixTimeInfo.isErrorEnd}
      />
    </View>
  );
};

export default React.memo(ReminderSelectTimeFix);
