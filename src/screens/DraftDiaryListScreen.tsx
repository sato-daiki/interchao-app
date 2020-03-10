import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import Algolia from '../utils/Algolia';
import { GrayHeader, LoadingModal } from '../components/atoms';
import { User, Diary } from '../types';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import DraftListItem from '../components/organisms/DraftListItem';
import { EmptyDraftDiaryList } from '../components/molecules';

export interface Props {
  user: User;
  draftDiaries: Diary[];
  draftDiaryTotalNum: number;
  setDraftDiaries: (draftDiaries: Diary[]) => void;
  setDraftDiaryTotalNum: (draftDiaryTotalNum: number) => void;
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
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

const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * 下書き一覧
 */
const DraftDiaryListScreen: ScreenType = ({
  user,
  draftDiaries,
  draftDiaryTotalNum,
  setDraftDiaries,
  setDraftDiaryTotalNum,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);

  const getNewDraftDiary = useCallback(
    (clean: boolean) => {
      const f = async (): Promise<void> => {
        try {
          const index = await Algolia.getDiaryIndex(clean);
          await Algolia.setSettings(index);
          const res = await index.search('', {
            filters: `profile.uid: ${user.uid} AND diaryStatus: draft`,
            page: 0,
            hitsPerPage: HIT_PER_PAGE,
          });

          setDraftDiaries(res.hits);
          setDraftDiaryTotalNum(res.nbHits);
        } catch (err) {
          setIsLoading(false);
          setRefreshing(false);
          Alert.alert(' エラー', 'ネットワークエラーです');
        }
        setIsLoading(false);
      };
      f();
    },
    [setDraftDiaries, setDraftDiaryTotalNum, user.uid]
  );

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      await getNewDraftDiary(false);
    };
    f();
  }, [getNewDraftDiary]);

  const onRefresh = useCallback(() => {
    const f = async (): Promise<void> => {
      setRefreshing(true);
      await getNewDraftDiary(true);
      setRefreshing(false);
    };
    f();
  }, [getNewDraftDiary]);

  const loadNextPage = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!readingNext && !readAllResults) {
        try {
          const nextPage = page + 1;
          setReadingNext(true);

          const index = await Algolia.getDiaryIndex();
          const res = await index.search('', {
            filters: `profile.uid: ${user.uid} AND diaryStatus: draft`,
            page: nextPage,
            hitsPerPage: HIT_PER_PAGE,
          });

          if (res.hits.length === 0) {
            setReadAllResults(true);
            setReadingNext(false);
          } else {
            setDraftDiaries([...draftDiaries, ...res.hits]);
            setPage(nextPage);
            setReadingNext(false);
          }
        } catch (err) {
          setReadingNext(false);
          Alert.alert(' エラー', 'ネットワークエラーです');
        }
      }
    };
    f();
  }, [
    draftDiaries,
    page,
    readAllResults,
    readingNext,
    setDraftDiaries,
    user.uid,
  ]);

  const onPressItem = useCallback(
    item => {
      // navigation.navigate('MyDiary', { item });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Diary }): JSX.Element => {
      return <DraftListItem item={item} onPressItem={onPressItem} />;
    },
    [onPressItem]
  );

  const listHeaderComponent = useCallback(() => {
    const title =
      draftDiaryTotalNum !== 0
        ? `下書き一覧(${draftDiaryTotalNum}件)`
        : '下書き一覧';
    return <GrayHeader title={title} />;
  }, [draftDiaryTotalNum]);

  const displayEmptyComponent =
    !isLoading && !refreshing && draftDiaries.length < 1;
  if (displayEmptyComponent) {
    return <EmptyDraftDiaryList />;
  }

  const listFooterComponent =
    isLoading && !refreshing && draftDiaries.length > 0 ? (
      <ActivityIndicator />
    ) : null;

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <FlatList
        data={draftDiaries}
        keyExtractor={keyExtractor}
        refreshing={refreshing}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={listFooterComponent}
        onEndReached={loadNextPage}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

DraftDiaryListScreen.navigationOptions = (): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: '下書き',
  };
};

export default DraftDiaryListScreen;
