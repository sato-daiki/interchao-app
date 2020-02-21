import React, { useCallback } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Space, GrayHeader, CommentCard } from '../atoms';
import {
  primaryColor,
  fontSizeM,
  subTextColor,
  mainColor,
} from '../../styles/Common';
import ProfileIconHorizontal from '../atoms/ProfileIconHorizontal';
import { Correction, Commment } from '../../types';
import { getPostDay } from '../../utils/diary';
import {
  MyDiaryCorrectionFooter,
  UserDiaryCorrectionFooter,
} from '../molecules';

interface Props {
  isMyDiary: boolean;
  isReview: boolean;
  correction: Correction;
  onPressUser: () => void;
  onPressReview?: () => void;
  onPressCorrection?: () => void;
}

const styles = StyleSheet.create({
  main: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  daytext: {
    color: subTextColor,
    fontSize: fontSizeM,
  },
});

const keyExtractor = (item: Commment, index: number): string => String(index);

/**
 * 概要：添削一覧
 */
const DiaryCorrection: React.FC<Props> = ({
  isMyDiary,
  isReview,
  correction,
  onPressUser,
  onPressReview,
  onPressCorrection,
}): JSX.Element => {
  const { profile, commments, summary, createdAt } = correction;
  const { name, photoUrl } = profile;
  // const postDay = getPostDay(createdAt);
  const postDay = '2019-01-01';

  const listFooterComponent = (
    <>
      {summary ? (
        <CommentCard title="総評" text={summary} borderColor={primaryColor} />
      ) : null}
      <Space size={32} />
      {isMyDiary ? (
        <MyDiaryCorrectionFooter
          isReview={isReview}
          onPressReview={onPressReview}
        />
      ) : (
        <UserDiaryCorrectionFooter
          isReview={isReview}
          onPressCorrection={onPressCorrection}
        />
      )}
    </>
  );

  const renderItem = useCallback(
    ({ item }: { item: Commment }): JSX.Element => {
      const { sentence, detail } = item;

      return (
        <CommentCard title={sentence} text={detail} borderColor={mainColor} />
      );
    },
    []
  );

  return (
    <>
      <GrayHeader title="添削結果" />
      <View style={styles.main}>
        <View style={styles.header}>
          <ProfileIconHorizontal
            name={name}
            photoUrl={photoUrl}
            onPress={onPressUser}
          />
          <Text style={styles.daytext}>{postDay}</Text>
        </View>
        <FlatList
          data={commments}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListFooterComponent={listFooterComponent}
        />
      </View>
    </>
  );
};

export default DiaryCorrection;
