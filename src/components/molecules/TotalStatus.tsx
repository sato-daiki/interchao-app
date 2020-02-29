import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { fontSizeS, subTextColor } from '../../styles/Common';
import { Diary, ScreenName } from '../../types';
import { getDiaryStatus } from '../../utils/diary';
import DiaryStatus from '../atoms/DiaryStatus';

interface Props {
  diary: Diary;
  screenName: ScreenName;
}

interface PrmStatus {
  text: string;
  color: string;
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

const TotalStatus: React.FC<Props> = ({
  diary,
  screenName,
}: Props): JSX.Element => {
  const {
    diaryStatus,
    correctionStatus,
    isReview,
    isPro,
    diaryStatusPro,
    correctionStatusPro,
    isReviewPro,
  } = diary;

  const status = getDiaryStatus(
    screenName,
    diaryStatus,
    correctionStatus,
    isReview
  );

  const statusPro = getDiaryStatus(
    screenName,
    diaryStatusPro,
    correctionStatusPro,
    isReviewPro
  );

  if (isPro) {
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

export default TotalStatus;
