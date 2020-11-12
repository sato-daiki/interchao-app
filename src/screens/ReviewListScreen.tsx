import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
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
  const [reviews, setReviews] = useState<Review[]>([]);

  const lastVisible = useRef<firestore.FieldValue | null>(null);
  const readingNext = useRef(false);
  const readAllResults = useRef(false);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      const targetUid = await getUid(route.params.userName);

      if (!targetUid) {
        setIsLoading(false);
        return;
      }
      const newReviews = await getReviews(targetUid, new Date(), HIT_PER_PAGE);
      setReviews(newReviews);
      if (newReviews.length > 0) {
        const { createdAt } = newReviews[newReviews.length - 1];
        lastVisible.current = createdAt;
      }
      setIsLoading(false);
    };
    f();
  }, [route.params.userName]);

  const onRefresh = useCallback(async (): Promise<void> => {
    setRefreshing(true);
    const targetUid = await getUid(route.params.userName);
    if (!targetUid) {
      setIsLoading(false);
      return;
    }
    const newReviews = await getReviews(targetUid, new Date(), HIT_PER_PAGE);

    setReviews(newReviews);
    if (newReviews.length > 0) {
      const { createdAt } = newReviews[newReviews.length - 1];
      lastVisible.current = createdAt;
    }
    setRefreshing(false);
  }, [route.params]);

  const loadNextPage = useCallback(async (): Promise<void> => {
    if (!readingNext.current && !readAllResults.current) {
      try {
        const targetUid = await getUid(route.params.userName);
        if (!targetUid) {
          setIsLoading(false);
          return;
        }
        readingNext.current = true;
        const nextReviews = await getReviews(
          targetUid,
          lastVisible.current,
          HIT_PER_PAGE
        );

        if (nextReviews.length === 0) {
          readAllResults.current = true;
          readingNext.current = false;
        } else {
          setReviews([...reviews, ...nextReviews]);
          lastVisible.current = nextReviews[nextReviews.length - 1].createdAt;
          readingNext.current = false;
        }
      } catch (err) {
        readingNext.current = false;
        alert({ err });
      }
    }
  }, [lastVisible, route.params, readAllResults, readingNext, reviews]);

  const handlePressUser = useCallback(
    (uid: string, userName: string) => {
      navigation.push('UserProfile', { userName });
    },
    [navigation]
  );

  const listEmptyComponent = isLoading || refreshing ? null : <EmptyReview />;

  const listHeaderComponent = (
    <GrayHeader title={I18n.t('reviewList.reviewList')} />
  );

  const renderItem: ListRenderItem<Review> = useCallback(
    ({ item }) => {
      return (
        <ReviewListItem
          item={item}
          nativeLanguage={profile.nativeLanguage}
          textLanguage={profile.learnLanguage}
          handlePressUser={handlePressUser}
        />
      );
    },
    [handlePressUser, profile.learnLanguage, profile.nativeLanguage]
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
