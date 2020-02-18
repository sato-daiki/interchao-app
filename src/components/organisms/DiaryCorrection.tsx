import React, { useCallback } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Space, SubmitButton, GrayHeader, CommentCard } from '../atoms';
import {
  primaryColor,
  fontSizeM,
  subTextColor,
  mainColor,
} from '../../styles/Common';
import ProfileIconHorizontal from '../atoms/ProfileIconHorizontal';
import { Correction, Commment } from '../../types';
import { getPostDay } from '../../utils/diary';

interface Props {
  isReview: boolean;
  correction: Correction;
  onPressUser: () => void;
  onPressReview: () => void;
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
  promptText: {
    paddingTop: 16,
    textAlign: 'center',
    color: primaryColor,
    fontSize: fontSizeM,
  },
  finText: {
    textAlign: 'center',
    color: subTextColor,
    fontSize: fontSizeM,
  },
});

const keyExtractor = (item: Commment, index: number): string => String(index);

/**
 * 概要：添削一覧
 */
const DiaryCorrection: React.FC<Props> = ({
  isReview,
  correction,
  onPressUser,
  onPressReview,
}): JSX.Element => {
  const { profile, commments, summary, createdAt } = correction;
  const { name, photoUrl } = profile;
  const postDay = getPostDay(createdAt);

  const listFooterComponent = (
    <>
      {summary ? (
        <CommentCard title="総評" text={summary} borderColor={primaryColor} />
      ) : null}
      <Space size={32} />
      {!isReview ? (
        <>
          <SubmitButton title="添削のレビューをする" onPress={onPressReview} />
          <Text style={styles.promptText}>添削のお礼と評価をお願いします</Text>
        </>
      ) : (
        <Text style={styles.finText}>この日記はレビュー済みです</Text>
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
