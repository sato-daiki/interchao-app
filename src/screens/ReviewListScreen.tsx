import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { firestore } from 'firebase';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { Review, Profile } from '../types';
import { LoadingModal, GrayHeader } from '../components/atoms';
import { getReviews } from '../utils/review';
import ReviewListItem from '../components/organisms/ReviewListItem';
import { EmptyReview } from '../components/molecules';
import I18n from '../utils/I18n';
import { alert } from '../utils/ErrorAlert';
import {
  CommonStackParamList,
  CommonNavigationProp,
} from '../navigations/CommonNavigator';
import { getUid } from '../utils/profile';

export interface Props {
  profile: Profile;
}

type ReviewListNavigationProp = CompositeNavigationProp<
  StackNavigationProp<CommonStackParamList, 'ReviewList'>,
  CommonNavigationProp
>;

type ReviewListRouteProp = RouteProp<CommonStackParamList, 'ReviewList'>;

type ScreenType = {
  navigation: ReviewListNavigationProp;
  route: ReviewListRouteProp;
} & Props;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const HIT_PER_PAGE = 20;

const keyExtractor = (item: Review, index: number): string => String(index);

const ReviewListScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  profile,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [lastVisible, setLastVisible] = useState<firestore.FieldValue | null>(
    null
  );

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      const targetUid = await getUid(route.params.userName);

      if (!targetUid) {
        setIsLoading(false);
        return;
      }
      const newReviews = await getReviews(targetUid, null, HIT_PER_PAGE);
      setReviews(newReviews);
      if (newReviews.length > 0) {
        const { createdAt } = newReviews[newReviews.length - 1];
        setLastVisible(createdAt);
        setReadAllResults(true);
      }
      setIsLoading(false);
    };
    f();
  }, [route.params.userName]);

  const onRefresh = useCallback(() => {
    const f = async (): Promise<void> => {
      setRefreshing(true);
      const targetUid = await getUid(route.params.userName);
      if (!targetUid) {
        setIsLoading(false);
        return;
      }
      const newReviews = await getReviews(targetUid, null, HIT_PER_PAGE);

      setReviews(newReviews);
      if (newReviews.length > 0) {
        const { createdAt } = newReviews[newReviews.length - 1];
        setLastVisible(createdAt);
      }
      setRefreshing(false);
    };
    f();
  }, [route.params]);

  const loadNextPage = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!readingNext && !readAllResults) {
        try {
          const targetUid = await getUid(route.params.userName);
          if (!targetUid) {
            setIsLoading(false);
            return;
          }
          setReadingNext(true);
          const nextReviews = await getReviews(
            targetUid,
            lastVisible,
            HIT_PER_PAGE
          );

          if (nextReviews.length === 0) {
            setReadAllResults(true);
            setReadingNext(false);
          } else {
            setReviews([...reviews, ...nextReviews]);
            setLastVisible(nextReviews[nextReviews.length - 1].createdAt);
            setReadingNext(false);
          }
        } catch (err) {
          setReadingNext(false);
          alert({ err });
        }
      }
    };
    f();
  }, [lastVisible, route.params, readAllResults, readingNext, reviews]);

  const listEmptyComponent = isLoading || refreshing ? null : <EmptyReview />;

  const listHeaderComponent = (
    <GrayHeader title={I18n.t('reviewList.reviewList')} />
  );

  type RenderItemProps = { item: Review };
  const renderItem = useCallback(
    ({ item }: RenderItemProps): JSX.Element => {
      return (
        <ReviewListItem
          item={item}
          nativeLanguage={profile.nativeLanguage}
          textLanguage={profile.learnLanguage}
          onPressUser={(uid: string, userName: string): void => {
            navigation.navigate('UserProfile', { userName });
          }}
        />
      );
    },
    [navigation, profile.learnLanguage, profile.nativeLanguage]
  );

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <FlatList
        data={reviews}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        ListEmptyComponent={listEmptyComponent}
        onEndReached={loadNextPage}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default ReviewListScreen;
