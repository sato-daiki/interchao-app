import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { OptionItem, SelectTimeItem } from '@/components/molecules';

import I18n from '@/utils/I18n';
import { getShortDayName, getShortDaysName } from '@/utils/time';
import { fontSizeM, subTextColor } from '@/styles/Common';
import { CustomTimeInfo } from '@/screens/ReminderSelectTimeScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  customTimeInfos: CustomTimeInfo[];
  handleTimeStart: (day: number | undefined, timeStart: Date) => void;
  handleTimeEnd: (day: number | undefined, timeEnd: Date) => void;
  onPressStudyDay: () => void;
}

const CheckBoxs: React.FC<Props> = ({
  disable,
  customTimeInfos,
  handleTimeStart,
  handleTimeEnd,
  onPressStudyDay,
}) => {
  return (
    <View style={[styles.container, { opacity: disable ? 0.4 : 1 }]}>
      <OptionItem
        title={I18n.t('reminderSelectTime.studyDay')}
        onPress={onPressStudyDay}
        righComponent={righComponent}
      />
      {renderRemindeDays}
    </View>
  );
};

export default React.memo(CheckBoxs);
