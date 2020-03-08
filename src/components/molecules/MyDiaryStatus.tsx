import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { fontSizeS, subTextColor } from '../../styles/Common';
import { Diary } from '../../types';
import { getMyDiaryStatus } from '../../utils/diary';
import DiaryStatus from '../atoms/DiaryStatus';

interface Props {
  diary: Diary;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nothing: {
    fontSize: fontSizeS,
    color: subTextColor,
  },
});

const MyDiaryStatus: React.FC<Props> = ({ diary }: Props): JSX.Element => {
  const {
    diaryStatus,
    correctionStatus,
    isReview,
    premium,
    correctionStatusPro,
    isReviewPro,
  } = diary;

  const status = getMyDiaryStatus(diaryStatus, correctionStatus, isReview);

  const statusPro = getMyDiaryStatus(
    diaryStatus,
    correctionStatusPro,
    isReviewPro
  );

  if (premium) {
    return (
      <View style={styles.container}>
        {statusPro ? (
          <DiaryStatus color={statusPro.color} text={statusPro.text} />
        ) : (
          <Text style={styles.nothing}>-</Text>
        )}
        {status ? (
          <DiaryStatus color={status.color} text={status.text} />
        ) : (
          <Text style={styles.nothing}>-</Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {status ? <DiaryStatus color={status.color} text={status.text} /> : null}
    </View>
  );
};

export default MyDiaryStatus;