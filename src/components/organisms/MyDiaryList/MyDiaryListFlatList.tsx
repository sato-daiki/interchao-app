import React, { useCallback } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Diary } from '@/types';
import { GrayHeader } from '@/components/atoms';
import I18n from '@/utils/I18n';

import DiaryListItem from '../DiaryListItem';
import EmptyMyDiaryList from './EmptyMyDiaryList';

interface Props {
  isEmpty: boolean;
  refreshing: boolean;
  diaries: Diary[];
  diaryTotalNum: number;
  loadNextPage: () => void;
  onPressUser: (uid: string, userName: string) => void;
  onPressItem: (item: Diary) => void;
  onRefresh: () => void;
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
});

const keyExtractor = (item: Diary, index: number): string => String(index);

const MyDiaryListFlatList: React.FC<Props> = ({
  isEmpty,
  refreshing,
  diaries,
  diaryTotalNum,
  loadNextPage,
  onPressUser,
  onPressItem,
  onRefresh,
}) => {
  const ListEmptyComponent = useCallback(() => {
    if (isEmpty) {
      return <EmptyMyDiaryList />;
    }
    return null;
  }, [isEmpty]);

  const listHeaderComponent = useCallback(() => {
    return (
      <GrayHeader
        title={I18n.t('myDiaryList.diaryList', { count: diaryTotalNum })}
      />
    );
  }, [diaryTotalNum]);

  type RenderItemProps = { item: Diary };
  const renderItem = useCallback(
    ({ item }: RenderItemProps): JSX.Element => {
      return (
        <DiaryListItem
          mine
          item={item}
          onPressUser={onPressUser}
          onPressItem={onPressItem}
        />
      );
    },
    [onPressItem, onPressUser]
  );

  return (
    <FlatList
      // emptyの時のレイアウトのため
      contentContainerStyle={isEmpty ? styles.flatList : null}
      data={diaries}
      keyExtractor={keyExtractor}
      refreshing={refreshing}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={listHeaderComponent}
      onEndReached={loadNextPage}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default MyDiaryListFlatList;
