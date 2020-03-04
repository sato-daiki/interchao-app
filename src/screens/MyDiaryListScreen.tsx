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
import { useFocusEffect } from 'react-navigation-hooks';
import Algolia from '../utils/Algolia';
import { GrayHeader, LoadingModal } from '../components/atoms';
import { User, Diary } from '../types';
import MyDiaryListItem from '../components/organisms/MyDiaryListItem';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import MyDiaryListMenu from '../components/organisms/MyDiaryListMenu';
import { Logo } from '../images';
import { primaryColor } from '../styles/Common';

export interface Props {
  currentUser: User;
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

const HIT_PER_PAGE = 20;

const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * マイ日記一覧
 */
const MyDiaryListScreen: ScreenType = ({ currentUser, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [totalNum, setTotalNum] = useState(0);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);

  const [isMenu, setIsMenu] = useState(false);
  const [diaries, setDiaries] = useState();

  // 第二引数をなしにするのがポイント
  useEffect(() => {
    navigation.setParams({ onPressMenu: () => setIsMenu(true) });
  }, []);

  const getNewDiary = async (clean: boolean): Promise<void> => {
    try {
      const index = await Algolia.getDiaryIndex(clean);
      const res = await index.search('', {
        filters: `profile.uid: ${currentUser.uid}`,
        page: 0,
        hitsPerPage: HIT_PER_PAGE,
      });
      setDiaries(res.hits);
      setTotalNum(res.nbHits);
    } catch (err) {
      setLoading(false);
      setRefreshing(false);
      Alert.alert(' エラー', 'ネットワークエラーです');
    }
  };

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      await getNewDiary(false);
      setLoading(false);
    };
    f();
  }, []);

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
            filters: `profile.uid: ${currentUser.uid}`,
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
  }, [currentUser]);

  const onClose = useCallback(() => {
    setIsMenu(false);
  }, []);

  const onPressUser = useCallback(() => {
    navigation.navigate('MyPage');
  }, [navigation]);

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
      totalNum !== 0 ? `マイ日記一覧(${totalNum}件)` : 'マイ日記一覧';
    return <GrayHeader title={title} />;
  }, [totalNum]);

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
