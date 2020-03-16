import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeS, subTextColor } from '../../styles/Common';
import { Diary } from '../../types';
import { getMyDiaryStatus } from '../../utils/diary';
import DiaryStatus from '../atoms/DiaryStatus';
import { Space } from '../atoms';

interface Props {
  diary: Diary;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nothing: {
    fontSize: fontSizeS,
    color: subTextColor,
  },
  padding: {
    paddingLeft: 8,
  },
});

const MyDiaryStatus: React.FC<Props> = ({ diary }: Props): JSX.Element => {
  const {
    isPublic,
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

  const publicIcon = isPublic ? null : (
    <MaterialCommunityIcons size={14} color={subTextColor} name="lock" />
  );

  if (premium) {
    return (
      <View style={styles.row}>
        {publicIcon}
        <View style={styles.padding} />
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
    <View style={styles.row}>
      {publicIcon}
      {status ? (
        <>
          <View style={styles.padding} />
          <DiaryStatus color={status.color} text={status.text} />
        </>
      ) : null}
    </View>
  );
};

export default MyDiaryStatus;
