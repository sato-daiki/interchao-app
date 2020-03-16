import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { connectInfiniteHits } from 'react-instantsearch-native';
import DiaryListItem from './DiaryListItem';
import { Diary } from '../../types';
import Highlight from './Highlight';
import SearchMyDiaryList from './SearchMyDiaryList';
// import Highlight from './Highlight';

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
    />
  );
};

export default connectInfiniteHits(DiaryHitList);
