import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';

import { firestore } from 'firebase';
import { Review } from '../types';

import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { LoadingModal, GrayHeader } from '../components/atoms';
import { getReviews } from '../utils/review';
import ReviewListItem from '../components/organisms/ReviewListItem';
import { EmptyReview } from '../components/molecules';

type ScreenType = React.ComponentType<NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const HIT_PER_PAGE = 20;

const keyExtractor = (item: Review, index: number): string => String(index);

const ReviewListScreen: ScreenType = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [lastVisible, setLastVisible] = useState<firestore.Timestamp | null>(
    null
  );

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      if (!navigation.state.params) return;
      const { uid } = navigation.state.params;
      const newReviews = await getReviews(uid, null, HIT_PER_PAGE);
      setReviews(newReviews);
      const { createdAt } = newReviews[newReviews.length - 1];
      setLastVisible(createdAt);
      setIsLoading(false);
    };
    f();
  }, []);

  const onRefresh = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!navigation.state.params) return;
      const { uid } = navigation.state.params;
      setRefreshing(true);
      const newReviews = await getReviews(uid, null, HIT_PER_PAGE);
      setReviews(newReviews);
      setLastVisible(newReviews[newReviews.length - 1].createdAt);
      setRefreshing(false);
    };
    f();
  }, [navigation.state.params]);

  const loadNextPage = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!readingNext && !readAllResults) {
        try {
          if (!navigation.state.params) return;
          const { uid } = navigation.state.params;
          setReadingNext(true);
          const nextReviews = await getReviews(uid, lastVisible, HIT_PER_PAGE);

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
          Alert.alert(' エラー', 'ネットワークエラーです');
        }
      }
    };
    f();
  }, [lastVisible, readAllResults, readingNext, reviews]);

  const listEmptyComponent = isLoading || refreshing ? null : <EmptyReview />;

  const listHeaderComponent = <GrayHeader title="レビュー一覧" />;

  const renderItem = useCallback(
    ({ item }: { item: Review }): JSX.Element => {
      return (
        <ReviewListItem
          item={item}
          onPressUser={(uid: string): void => {
            navigation.navigate('UserProfile', { uid });
          }}
        />
      );
    },
    [navigation]
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

ReviewListScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: 'レビュー一覧',
  };
};

export default ReviewListScreen;
