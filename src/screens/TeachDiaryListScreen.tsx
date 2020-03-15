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
import firebase from '../constants/firebase';
import { getBlockers, getBlockees } from '../utils/blockUser';

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
  const [blockUids, setBlockUids] = useState();

  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);

  const getExceptUser = (uids: string[]): string => {
    let fillterText = '';
    for (let i = 0; i < uids.length; i += 1) {
      fillterText += ` AND NOT profile.uid: ${uids[i]}`;
    }
    return fillterText;
  };

  const getNewDiary = useCallback(
    (clean: boolean) => {
      const f = async (): Promise<void> => {
        try {
          // ブロック一覧を取得する
          const { currentUser } = firebase.auth();
          if (!currentUser) return;
          const blockerUids = await getBlockers(currentUser.uid);
          const blockeeUids = await getBlockees(currentUser.uid);
          const uids = blockerUids.concat(blockeeUids);

          const index = await Algolia.getDiaryIndex(clean);
          await Algolia.setSettings(index);
          const fillterUids = getExceptUser(uids);
          const filters = `profile.learnLanguage: ${profile.nativeLanguage} AND diaryStatus: publish ${fillterUids}`;
          const res = await index.search('', {
            filters,
            page: 0,
            hitsPerPage: HIT_PER_PAGE,
          });

          // stateで保持
          setBlockUids(uids);

          // reduxで保持
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

          const fillterText = getExceptUser(blockUids);
          const filters = `profile.learnLanguage: ${profile.nativeLanguage} AND diaryStatus: publish ${fillterText}`;

          const index = await Algolia.getDiaryIndex();
          const res = await index.search('', {
            filters,
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
