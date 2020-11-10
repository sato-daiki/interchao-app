import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Profile, Review } from '@/types';
import I18n from '@/utils/I18n';
import { GrayHeader, Hoverable, Space } from '@/components/atoms';
import { EmptyReview } from '@/components/molecules';
import { fontSizeM, linkBlue } from '@/styles/Common';
import { getReviewNum, getTopReviews } from '@/utils/review';
import { getUid } from '@/utils/profile';
import ReviewListItem from './ReviewListItem';

export interface Props {
  profile?: Profile | null;
  refreshing: boolean;
  userName: string;
  handlePressUser: (uid: string, userName: string) => void;
  onPressMoreReview: () => void;
}

const styles = StyleSheet.create({
  moreRead: {
    marginTop: 16,
    marginBottom: 32,
    paddingRight: 16,
  },
  moreReadText: {
    color: linkBlue,
    fontSize: fontSizeM,
    textAlign: 'right',
  },
});

/**
 * 日記詳細
 */
const TopReviewList: React.FC<Props> = ({
  profile,
  refreshing,
  userName,
  handlePressUser,
  onPressMoreReview,
}) => {
  const [topReviews, setTopReviews] = useState<Review[]>([]);
  const [reviewNum, setReviewNum] = useState<number>();
  const [loadingReview, setLoadingReview] = useState(true);

  const getNewReview = useCallback(async (targetUid: string): Promise<void> => {
    const newReivews = await getTopReviews(targetUid);
    const newReviewNum = await getReviewNum(targetUid);
    setTopReviews(newReivews);
    setReviewNum(newReviewNum);
    setLoadingReview(false);
  }, []);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      const targetUid = await getUid(userName);
      if (!targetUid) {
        setLoadingReview(false);
        return;
      }
      await getNewReview(targetUid);
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listEmptyReviewComponent =
    loadingReview || refreshing ? null : <EmptyReview />;

  return (
    <>
      <GrayHeader title={I18n.t('userProfile.topReview')} />
      {topReviews.length > 0
        ? topReviews.map((item, index) => {
            if (profile) {
              return (
                <ReviewListItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  item={item}
                  textLanguage={profile.learnLanguage}
                  handlePressUser={handlePressUser}
                />
              );
            }
            return null;
          })
        : listEmptyReviewComponent}
      {loadingReview && !refreshing ? (
        <>
          <Space size={16} />
          <ActivityIndicator />
          <Space size={16} />
        </>
      ) : null}
      {!!reviewNum && reviewNum > 3 ? (
        <Hoverable style={styles.moreRead} onPress={onPressMoreReview}>
          <Text style={styles.moreReadText}>
            {I18n.t('userProfile.moreRead', { count: reviewNum })}
          </Text>
        </Hoverable>
      ) : null}
    </>
  );
};

export default TopReviewList;
