import React, { useCallback, useEffect, useState } from 'react';
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
import Algolia from '../utils/Algolia';
import { GrayHeader, LoadingModal } from '../components/atoms';
import { Diary, Profile } from '../types';
import TeachDiaryListItem from '../components/organisms/TeachDiaryListItem';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { EmptyList } from '../components/molecules';

export interface Props {
  profile: Profile;
  teachDiaries: Diary[];
  setTeachDiaries: (teachDiaries: Diary[]) => void;
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
 * みんなの日記一覧
 */
const TeachDiaryListScreen: ScreenType = ({
  profile,
  teachDiaries,
  setTeachDiaries,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);

  const getNewDiary = useCallback(
    (clean: boolean) => {
      const f = async (): Promise<void> => {
        try {
          const index = await Algolia.getDiaryIndex(clean);
          await Algolia.setSettings(index);
          const res = await index.search('', {
            // filters: `profile.learnLanguage: ${profile.nativeLanguage} AND diaryStatus: publish`,
            page: 0,
            hitsPerPage: HIT_PER_PAGE,
          });
          setTeachDiaries(res.hits);
        } catch (err) {
          setIsLoading(false);
          setRefreshing(false);
          Alert.alert(' エラー', 'ネットワークエラーです');
        }
        setIsLoading(false);
      };
      f();
    },
    [setTeachDiaries]
  );

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      await getNewDiary(false);
    };
    f();
  }, [getNewDiary]);

  const onRefresh = useCallback(() => {
    const f = async (): Promise<void> => {
      setRefreshing(true);
      await getNewDiary(true);
      setRefreshing(false);
    };
    f();
  }, [getNewDiary]);

  const loadNextPage = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!readingNext && !readAllResults) {
        try {
          const nextPage = page + 1;
          setReadingNext(true);

          const index = await Algolia.getDiaryIndex();
          const res = await index.search('', {
            filters: `profile.learnLanguage: ${profile.nativeLanguage} AND diaryStatus: publish`,
            page: nextPage,
            hitsPerPage: HIT_PER_PAGE,
          });

          if (res.hits.length === 0) {
            setReadAllResults(true);
            setReadingNext(false);
          } else {
            setTeachDiaries([...teachDiaries, ...res.hits]);
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
    page,
    profile.nativeLanguage,
    readAllResults,
    readingNext,
    setTeachDiaries,
    teachDiaries,
  ]);

  const onPressItem = useCallback(
    item => {
      navigation.navigate('TeachDiary', { objectID: item.objectID });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Diary }): JSX.Element => {
      return (
        <TeachDiaryListItem
          item={item}
          onPressUser={(uid: string): void => {
            navigation.navigate('UserProfile', { uid });
          }}
          onPressItem={onPressItem}
        />
      );
    },
    [onPressItem]
  );

  const listHeaderComponent = (
    <GrayHeader title="日本語を勉強している人の日記一覧" />
  );

  const displayEmptyComponent =
    !isLoading && !refreshing && teachDiaries.length < 1;
  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      {displayEmptyComponent ? (
        <EmptyList
          message="みんなの日記一覧がありません"
          iconName="book-open-variant"
        />
      ) : (
        <FlatList
          data={teachDiaries}
          keyExtractor={keyExtractor}
          refreshing={refreshing}
          renderItem={renderItem}
          ListHeaderComponent={listHeaderComponent}
          onEndReached={loadNextPage}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

TeachDiaryListScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  return {
    headerTitle: (): JSX.Element => <View />,
    ...DefaultNavigationOptions,
  };
};

export default TeachDiaryListScreen;
