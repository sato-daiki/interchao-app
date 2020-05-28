import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Diary } from '../../types';
import { getUserDiaryStatus } from '../../utils/diary';
import { FirstDiary, DiaryStatus } from '../atoms';

interface Props {
  diary: Diary;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diaryStatus: {
    marginLeft: 12,
  },
});

const UserDiaryStatus: React.FC<Props> = ({ diary }: Props): JSX.Element => {
  const {
    correctionStatus,
    correctionStatus2,
    correctionStatus3,
    firstDiary,
  } = diary;
  const status = getUserDiaryStatus(
    correctionStatus,
    correctionStatus2,
    correctionStatus3
  );

  return (
    <View style={styles.container}>
      {firstDiary ? <FirstDiary /> : null}
      {status ? (
        <View style={styles.diaryStatus}>
          <DiaryStatus color={status.color} text={status.text} />
        </View>
      ) : null}
    </View>
  );
};

export default UserDiaryStatus;
