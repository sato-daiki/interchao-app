import React, { useCallback } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { GrayHeader, CommentCard, SummaryCard } from '../atoms';
import { fontSizeM, subTextColor } from '../../styles/Common';
import ProfileIconHorizontal from '../atoms/ProfileIconHorizontal';
import { Correction, Comment } from '../../types';
import { getAlgoliaDate } from '../../utils/diary';
import I18n from '../../utils/I18n';

interface Props {
  correction: Correction;
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
const TeachDiaryCorrection: React.FC<Props> = ({ correction }): JSX.Element => {
  const { profile, comments, summary, createdAt } = correction;
  const { userName, photoUrl } = profile;

  const postDate = getAlgoliaDate(createdAt);

  const listFooterComponent = <SummaryCard summary={summary} />;

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
      <GrayHeader title={I18n.t('teachDiaryCorrection.header')} />
      <View style={styles.main}>
        <View style={styles.header}>
          <ProfileIconHorizontal userName={userName} photoUrl={photoUrl} />
          <Text style={styles.daytext}>{postDate}</Text>
        </View>
        <FlatList
          data={comments}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListFooterComponent={listFooterComponent}
          scrollEnabled={false}
        />
      </View>
    </>
  );
};

export default TeachDiaryCorrection;
