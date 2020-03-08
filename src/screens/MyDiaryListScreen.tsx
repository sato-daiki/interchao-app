import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Algolia from '../utils/Algolia';
import { GrayHeader, LoadingModal } from '../components/atoms';
import { User, Diary } from '../types';
import MyDiaryListItem from '../components/organisms/MyDiaryListItem';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import MyDiaryListMenu from '../components/organisms/MyDiaryListMenu';
import { Logo } from '../images';
import { primaryColor } from '../styles/Common';
import EmptyMyDiaryList from '../components/organisms/EmptyMyDiaryList';

export interface Props {
  user: User;
  diaries: Diary[];
  diaryTotalNum: number;
  setDiaries: (diaries: Diary[]) => void;
  setDiaryTotalNum: (diaryTotalNum: number) => void;
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
  logo: {
    width: 150,
    height: 26,
  },
});

const HIT_PER_PAGE = 2;

const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * マイ日記一覧
 */
const MyDiaryListScreen: ScreenType = ({
  user,
  diaries,
  diaryTotalNum,
  setDiaries,
  setDiaryTotalNum,
  navigation,
}) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);

  const [isMenu, setIsMenu] = useState(false);

  // 第二引数をなしにするのがポイント
  useEffect(() => {
    navigation.setParams({ onPressMenu: () => setIsMenu(true) });
  }, []);

  const getNewDiary = useCallback(
    (clean: boolean) => {
      const f = async (): Promise<void> => {
        try {
          const index = await Algolia.getDiaryIndex(clean);
          await index.setSettings({
            ranking: [
              'desc(createdAt._seconds)',
              'typo',
              'geo',
              'words',
              'filters',
              'proximity',
              'attribute',
              'exact',
              'custom',
            ],
          });
          const res = await index.search('', {
            filters: `profile.uid: ${user.uid}`,
            page: 0,
            hitsPerPage: HIT_PER_PAGE,
          });

          setDiaries(res.hits);
          setDiaryTotalNum(res.nbHits);
        } catch (err) {
          setLoading(false);
          setRefreshing(false);
          Alert.alert(' エラー', 'ネットワークエラーです');
        }
      };
      f();
    },
    [setDiaries, setDiaryTotalNum, user.uid]
  );

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      await getNewDiary(false);
      setLoading(false);
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
            filters: `profile.uid: ${user.uid}`,
            page: nextPage,
            hitsPerPage: HIT_PER_PAGE,
          });

          if (res.hits.length === 0) {
            setReadAllResults(true);
            setReadingNext(false);
          } else {
            setDiaries([...diaries, ...res.hits]);
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
  }, [diaries, page, readAllResults, readingNext, setDiaries, user.uid]);

  const onClose = useCallback(() => {
    setIsMenu(false);
  }, []);

  const onPressUser = useCallback((uid: string) => {
    console.log(uid);
    // navigation.navigate('MyPage');
  }, []);

  const onPressItem = useCallback(
    item => {
      navigation.navigate('MyDiary', { item });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Diary }): JSX.Element => {
      return (
        <MyDiaryListItem
          screenName="my"
          item={item}
          onPressUser={onPressUser}
          onPressItem={onPressItem}
        />
      );
    },
    [onPressItem, onPressUser]
  );

  const listHeaderComponent = useCallback(() => {
    const title =
      diaryTotalNum !== 0 ? `マイ日記一覧(${diaryTotalNum}件)` : 'マイ日記一覧';
    return <GrayHeader title={title} />;
  }, [diaryTotalNum]);

  const displayEmptyComponent =
    !loading && !refreshing && diaries && diaries.length < 1;
  if (displayEmptyComponent) {
    return <EmptyMyDiaryList />;
  }

  return (
    <View style={styles.container}>
      <MyDiaryListMenu
        navigation={navigation}
        isMenu={isMenu}
        onClose={onClose}
      />
      <LoadingModal visible={loading} />
      <FlatList
        data={diaries}
        keyExtractor={keyExtractor}
        refreshing={refreshing}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        onEndReached={loadNextPage}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

MyDiaryListScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressMenu = navigation.getParam('onPressMenu');
  return {
    ...DefaultNavigationOptions,
    headerTitle: (): JSX.Element => <Image source={Logo} style={styles.logo} />,
    headerRight: (): JSX.Element => (
      <MaterialCommunityIcons
        size={28}
        color={primaryColor}
        name="dots-horizontal"
        onPress={onPressMenu}
      />
    ),
  };
};

export default MyDiaryListScreen;
