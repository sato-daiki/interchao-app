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
import Swipeable from 'react-native-gesture-handler/Swipeable';
import firebase from '../constants/firebase';
import Algolia from '../utils/Algolia';
import { GrayHeader, LoadingModal, HeaderText } from '../components/atoms';
import { User, Diary } from '../types';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import DraftListItem from '../components/organisms/DraftListItem';
import { EmptyList } from '../components/molecules';
import I18n from '../utils/I18n';

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

const getIsEditMode = (
  isEditing: boolean,
  preOpendIndex: number | undefined
): boolean => {
  if (isEditing === true || preOpendIndex !== undefined) {
    return true;
  }
  return false;
};
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
  const [x] = useState(new Animated.Value(-EDIT_WIDTH));
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);
  const [preOpendIndex, setPreOpenIndex] = useState<number | undefined>();
  const elRefs = useRef<Swipeable[]>([]);

  const onPressEdit = useCallback(() => {
    const isEditMode = getIsEditMode(isEditing, preOpendIndex);
    if (!isEditMode) {
      setIsEditing(true);
      Animated.spring(x, {
        toValue: 0,
      }).start();
      return;
    }

    if (preOpendIndex !== undefined) {
      elRefs.current[preOpendIndex].close();
    }
    setIsEditing(false);
    Animated.spring(x, {
      toValue: -EDIT_WIDTH,
    }).start();
  }, [isEditing, preOpendIndex, x]);

  useEffect(() => {
    navigation.setParams({
      preOpendIndex,
      isEditing,
      onPressEdit,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preOpendIndex, isEditing, onPressEdit]);

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

          setDraftDiaries(res.hits as Diary[]);
          setDraftDiaryTotalNum(res.nbHits);
        } catch (err) {
          setIsLoading(false);
          setRefreshing(false);
          Alert.alert(I18n.t('common.error'), I18n.t('errorMessage.network'));
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
            setDraftDiaries([...draftDiaries, ...(res.hits as Diary[])]);
            setPage(nextPage);
            setReadingNext(false);
          }
        } catch (err) {
          setReadingNext(false);
          Alert.alert(I18n.t('common.error'), I18n.t('errorMessage.network'));
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
      navigation.navigate('PostDraftDiary', { item });
    },
    [navigation]
  );

  const onPressDelete = useCallback(
    (item: Diary, index: number) => {
      const f = async (): Promise<void> => {
        if (!item.objectID) return;
        setIsLoading(true);
        await firebase
          .firestore()
          .collection('diaries')
          .doc(item.objectID)
          .delete();
        deleteDraftDiary(item.objectID);

        setPreOpenIndex(undefined);
        if (elRefs.current[index]) {
          elRefs.current[index].close();
        }
        setIsLoading(false);
      };
      f();
    },
    [deleteDraftDiary, setPreOpenIndex]
  );

  useEffect(() => {
    elRefs.current = elRefs.current.slice(0, draftDiaries.length);
  }, [draftDiaries.length]);

  const onSwipeableClose = useCallback(
    index => {
      if (index === preOpendIndex) {
        // 手で閉じた場合
        setPreOpenIndex(undefined);
      }
    },
    [preOpendIndex]
  );

  const onSwipeableOpen = useCallback(
    (index: number): void => {
      if (preOpendIndex !== undefined && index !== preOpendIndex) {
        elRefs.current[preOpendIndex].close();
        setPreOpenIndex(index);
        return;
      }
      if (index === preOpendIndex) {
        // 同じところを開いた場合は更新しない
        return;
      }
      // 初回の時にここに入る
      setPreOpenIndex(index);
    },
    [preOpendIndex, elRefs]
  );

  const onPressMinus = useCallback(index => {
    elRefs.current[index].openRight();
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: Diary; index: number }): JSX.Element => {
      return (
        <DraftListItem
          setRef={(el): void => {
            elRefs.current[index] = el;
          }}
          x={x}
          isEditing={isEditing}
          item={item}
          onPressItem={onPressItem}
          onPressMinus={(): void => onPressMinus(index)}
          onPressDelete={(): void => onPressDelete(item, index)}
          onSwipeableOpen={(): void => onSwipeableOpen(index)}
          onSwipeableClose={(): void => onSwipeableClose(index)}
        />
      );
    },
    [
      x,
      isEditing,
      onPressItem,
      onPressMinus,
      onPressDelete,
      onSwipeableOpen,
      onSwipeableClose,
    ]
  );

  const listHeaderComponent = useCallback(() => {
    return (
      <GrayHeader
        title={I18n.t('draftDiary.diaryList', { count: draftDiaryTotalNum })}
      />
    );
  }, [draftDiaryTotalNum]);

  const displayEmptyComponent =
    !isLoading && !refreshing && draftDiaries.length < 1;
  if (displayEmptyComponent) {
    return (
      <EmptyList
        message={I18n.t('draftDiary.empty')}
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
  const preOpendIndex = navigation.getParam('preOpendIndex');
  const onPressEdit = navigation.getParam('onPressEdit');

  return {
    ...DefaultNavigationOptions,
    title: I18n.t('draftDiary.headerTitle'),
    headerRight: (): JSX.Element => (
      <HeaderText
        title={
          getIsEditMode(isEditing, preOpendIndex)
            ? I18n.t('common.done')
            : I18n.t('common.edit')
        }
        onPress={onPressEdit}
      />
    ),
  };
};

export default DraftDiaryListScreen;
