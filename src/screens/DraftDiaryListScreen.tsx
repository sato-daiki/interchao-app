import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from '../constants/firebase';
import Algolia from '../utils/Algolia';
import { GrayHeader, LoadingModal, HeaderText } from '../components/atoms';
import { User, Diary } from '../types';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import DraftListItem from '../components/organisms/DraftListItem';
import { EmptyList } from '../components/molecules';
import { subTextColor } from '../styles/Common';

export interface Props {
  user: User;
  draftDiaries: Diary[];
  draftDiaryTotalNum: number;
  setDraftDiaries: (draftDiaries: Diary[]) => void;
  setDraftDiaryTotalNum: (draftDiaryTotalNum: number) => void;
  deleteDraftDiary: (objectID: string) => void;
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
const EDIT_WIDTH = 48;

const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * 下書き一覧
 */
const DraftDiaryListScreen: ScreenType = ({
  user,
  draftDiaries,
  draftDiaryTotalNum,
  setDraftDiaries,
  deleteDraftDiary,
  setDraftDiaryTotalNum,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [x, setX] = useState(new Animated.Value(-EDIT_WIDTH));
  const elRefs = useRef([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);

  const onPressEdit = useCallback(() => {
    setIsEditing(!isEditing);
    Animated.spring(x, {
      toValue: isEditing ? -EDIT_WIDTH : 0,
    }).start();
  }, [isEditing, x]);

  useEffect(() => {
    navigation.setParams({
      isEditing,
      onPressEdit,
    });
  }, [onPressEdit, isEditing]);

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
      await getNewDraftDiary(true);
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
      // setX(new Animated.Value(0));
      navigation.navigate('PostDraftDiary', { item });
    },
    [navigation]
  );

  const closeMinus = useCallback(() => {
    Animated.spring(x, {
      toValue: -EDIT_WIDTH,
    }).start();
  }, []);

  const onPressDelete = useCallback(
    (objectID: string) => {
      const f = async (): Promise<void> => {
        setIsLoading(true);
        await firebase
          .firestore()
          .collection('diaries')
          .doc(objectID)
          .delete();
        deleteDraftDiary(objectID);
        setIsLoading(false);
      };
      f();
    },
    [deleteDraftDiary]
  );

  const renderItem = useCallback(
    ({ item }: { item: Diary }): JSX.Element => {
      return (
        <DraftListItem
          x={x}
          item={item}
          onPressItem={onPressItem}
          closeMinus={closeMinus}
          onPressDelete={(): void => onPressDelete(item.objectID)}
        />
      );
    },
    [closeMinus, onPressDelete, onPressItem, x]
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
    return (
      <EmptyList
        message="下書き一覧はありません"
        iconName="book-open-variant"
      />
    );
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

DraftDiaryListScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const isEditing = navigation.getParam('isEditing');
  const onPressEdit = navigation.getParam('onPressEdit');

  return {
    ...DefaultNavigationOptions,
    title: '下書き',
    headerRight: (): JSX.Element => (
      <HeaderText title={isEditing ? '完了' : '編集'} onPress={onPressEdit} />
    ),
  };
};

export default DraftDiaryListScreen;
