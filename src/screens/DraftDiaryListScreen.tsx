import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import firebase from '../constants/firebase';
import Algolia from '../utils/Algolia';
import { GrayHeader, LoadingModal, HeaderText } from '../components/atoms';
import { Diary, User } from '../types';
import DraftListItem from '../components/organisms/DraftListItem';
import { EmptyList } from '../components/molecules';
import I18n from '../utils/I18n';
import { alert } from '../utils/ErrorAlert';
import {
  MyDiaryTabStackParamList,
  MyDiaryTabNavigationProp,
} from '../navigations/MyDiaryTabNavigator';

export interface Props {
  user: User;
}

type DraftDiaryListNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyDiaryTabStackParamList, 'DraftDiaryList'>,
  MyDiaryTabNavigationProp
>;

type ScreenType = {
  navigation: DraftDiaryListNavigationProp;
} & Props;

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
const DraftDiaryListScreen: React.FC<ScreenType> = ({ navigation, user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [draftDiaries, setDraftDiaries] = useState<Diary[]>([]);
  const [draftDiaryTotalNum, setDraftDiaryTotalNum] = useState<number>(0);
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
        useNativeDriver: true,
      }).start();
      return;
    }

    if (preOpendIndex !== undefined) {
      elRefs.current[preOpendIndex].close();
    }
    setIsEditing(false);
    Animated.spring(x, {
      toValue: -EDIT_WIDTH,
      useNativeDriver: true,
    }).start();
  }, [isEditing, preOpendIndex, x]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: (): ReactNode => {
        if (draftDiaryTotalNum > 0) {
          return (
            <HeaderText
              text={
                getIsEditMode(isEditing, preOpendIndex)
                  ? I18n.t('common.done')
                  : I18n.t('common.edit')
              }
              onPress={onPressEdit}
            />
          );
        }
        return null;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftDiaryTotalNum, preOpendIndex, isEditing, onPressEdit]);

  const getNewDraftDiary = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        const index = await Algolia.getDiaryIndex();
        await Algolia.setSettings(index, 'updatedAt');
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
        alert({ err });
      }
      setIsLoading(false);
    };
    f();
  }, [user.uid]);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      await getNewDraftDiary();
    };
    f();
  }, [getNewDraftDiary]);

  const onRefresh = useCallback(() => {
    const f = async (): Promise<void> => {
      setRefreshing(true);
      await getNewDraftDiary();
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
          alert({ err });
        }
      }
    };
    f();
  }, [draftDiaries, page, readAllResults, readingNext, user.uid]);

  const onPressItem = useCallback(
    (item: Diary) => {
      if (!item.objectID) return;
      navigation.navigate('ModalPostDraftDiary', {
        screen: 'PostDraftDiary',
        params: { item, objectID: item.objectID },
      });
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

        setDraftDiaries(draftDiaries.filter(c => c.objectID !== item.objectID));
        setDraftDiaryTotalNum(draftDiaryTotalNum - 1);

        setPreOpenIndex(undefined);
        if (elRefs.current[index]) {
          elRefs.current[index].close();
        }
        setIsLoading(false);
      };
      f();
    },
    [draftDiaries, draftDiaryTotalNum]
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

  type RenderItemProps = { item: Diary; index: number };
  const renderItem = useCallback(
    ({ item, index }: RenderItemProps): JSX.Element => {
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

  const listEmptyComponent = useCallback(() => {
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
    return null;
  }, [draftDiaries.length, isLoading, refreshing]);

  const listFooterComponent =
    isLoading && !refreshing && draftDiaries && draftDiaries.length > 0 ? (
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
        ListEmptyComponent={listEmptyComponent}
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

export default DraftDiaryListScreen;
