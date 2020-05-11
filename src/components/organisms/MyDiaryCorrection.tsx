import React, { useCallback } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Space, GrayHeader, CommentCard, SummaryCardTranslate } from '../atoms';
import { fontSizeM, subTextColor } from '../../styles/Common';
import ProfileIconHorizontal from '../atoms/ProfileIconHorizontal';
import { Correction, Comment, Language } from '../../types';
import { getAlgoliaDate } from '../../utils/diary';
import { MyDiaryCorrectionFooter } from '../molecules';
import I18n from '../../utils/I18n';

interface Props {
  isReview: boolean;
  nativeLanguage: Language;
  correction: Correction;
  onPressUser: (uid: string) => void;
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
});

const keyExtractor = (item: Comment, index: number): string => String(index);

/**
 * 概要：添削一覧
 */
const MyDiaryCorrection: React.FC<Props> = ({
  isReview,
  nativeLanguage,
  correction,
  onPressUser,
  onPressReview,
}): JSX.Element => {
  const { profile, comments, summary, createdAt } = correction;
  const postDate = getAlgoliaDate(createdAt);
  const listFooterComponent = (
    <>
      <SummaryCardTranslate nativeLanguage={nativeLanguage} summary={summary} />
      <Space size={32} />
      <MyDiaryCorrectionFooter isReview={isReview} onPress={onPressReview} />
    </>
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Comment; index: number }): JSX.Element => {
      const { original, fix, detail } = item;
      return (
        <CommentCard
          index={index}
          nativeLanguage={nativeLanguage}
          original={original}
          fix={fix}
          detail={detail}
        />
      );
    },
    [nativeLanguage]
  );

  return (
    <>
      <GrayHeader title={I18n.t('myDiaryCorrection.header')} />
      <View style={styles.main}>
        <View style={styles.header}>
          <ProfileIconHorizontal
            userName={profile.userName}
            photoUrl={profile.photoUrl}
            nativeLanguage={profile.nativeLanguage}
            onPress={(): void => onPressUser(profile.uid)}
          />
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

export default MyDiaryCorrection;
