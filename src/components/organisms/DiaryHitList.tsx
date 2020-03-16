import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { connectInfiniteHits } from 'react-instantsearch-native';
import { Diary } from '../../types';
import SearchMyDiaryList from './SearchMyDiaryList';
import { GrayHeader } from '../atoms';
import { EmptyList } from '../molecules';

interface Props {
  onPressUser: (uid: string) => void;
  onPressItem: (objectID: string) => void;
}

const DiaryHitList: React.FC<Props & any> = ({
  onPressUser,
  onPressItem,
  hits,
  hasMore,
  refine,
}) => {
  const listEmptyComponent = useCallback(
    () => (
      <EmptyList
        iconName="book-open-variant"
        message="検索条件の日記がありません"
      />
    ),
    []
  );

  const listHeaderComponent = useCallback(
    () => <GrayHeader title="検索結果" />,
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: Diary }): JSX.Element => {
      return (
        <SearchMyDiaryList
          item={item}
          onPressItem={(): void => onPressItem(item.objectID)}
        />
      );
    },
    [onPressItem, onPressUser]
  );

  return (
    <FlatList
      data={hits}
      keyExtractor={(item: Diary): string => item.objectID!}
      onEndReached={(): void => hasMore && refine()}
      renderItem={renderItem}
      ListHeaderComponent={listHeaderComponent}
      ListEmptyComponent={listEmptyComponent}
    />
  );
};

export default connectInfiniteHits(DiaryHitList);
