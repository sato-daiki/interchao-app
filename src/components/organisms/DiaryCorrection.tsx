import React, { useCallback } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Space, GrayHeader, CommentCard, SummaryCard } from '../atoms';
import {
  primaryColor,
  fontSizeM,
  subTextColor,
  mainColor,
} from '../../styles/Common';
import ProfileIconHorizontal from '../atoms/ProfileIconHorizontal';
import { Correction, Comment } from '../../types';
import { getPostDay } from '../../utils/diary';
import { MyDiaryCorrectionFooter } from '../molecules';

interface Props {
  isMyDiary: boolean;
  isReview: boolean;
  correction: Correction;
  onPressUser: (uid: string) => void;
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

const keyExtractor = (item: Comment, index: number): string => String(index);

/**
 * 概要：添削一覧
 */
const DiaryCorrection: React.FC<Props> = ({
  isMyDiary,
  isReview,
  correction,
  onPressUser,
  onPressReview,
}): JSX.Element => {
  const { profile, comments, summary, createdAt } = correction;
  const { userName, photoUrl, uid } = profile;
  const postDay = getPostDay(createdAt);
  const listFooterComponent = (
    <>
      <SummaryCard summary={summary} />
      <Space size={32} />
      <MyDiaryCorrectionFooter
        isReview={isReview}
        onPressReview={onPressReview}
      />
    </>
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Comment; index: number }): JSX.Element => {
      const { original, fix, detail } = item;

      return (
        <CommentCard
          index={index}
          original={original}
          fix={fix}
          detail={detail}
        />
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
            userName={userName}
            photoUrl={photoUrl}
            onPress={(): void => onPressUser(uid)}
          />
          <Text style={styles.daytext}>{postDay}</Text>
        </View>
        <FlatList
          data={comments}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListFooterComponent={listFooterComponent}
        />
      </View>
    </>
  );
};

export default DiaryCorrection;
