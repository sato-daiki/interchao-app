import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { connectInfiniteHits } from 'react-instantsearch-native';
import { Diary } from '../../types';
import SearchMyDiaryList from './SearchMyDiaryList';
import { GrayHeader } from '../atoms';
import { EmptyList } from '../molecules';
import I18n from '../../utils/I18n';

interface Props {
  isEmpty: boolean;
  onPressItem: (objectID: string) => void;
  hits: Diary[];
  hasMore: boolean;
  refine: any;
}

const DiaryHitList: React.FC<Props & any> = ({
  isEmpty,
  onPressItem,
  hits,
  hasMore,
  refine,
}: Props) => {
  const listEmptyComponent = useCallback(
    () =>
      isEmpty ? null : (
        <EmptyList
          iconName="book-open-variant"
          message={I18n.t('diaryHitList.empty')}
        />
      ),
    [isEmpty]
  );

  const listHeaderComponent = useCallback(
    () =>
      isEmpty ? null : <GrayHeader title={I18n.t('diaryHitList.header')} />,
    [isEmpty]
  );

  const renderItem = useCallback(
    ({ item }: { item: Diary }): JSX.Element => {
      return (
        <SearchMyDiaryList
          item={item}
          onPressItem={(): void => onPressItem(item.objectID!)}
        />
      );
    },
    [onPressItem]
  );

  const onEndReached = useCallback((): void => {
    if (hasMore) {
      refine();
    }
  }, [hasMore, refine]);

  return (
    <FlatList
      data={isEmpty ? [] : hits}
      keyExtractor={(item: Diary): string => item.objectID!}
      onEndReached={onEndReached}
      renderItem={renderItem}
      ListHeaderComponent={listHeaderComponent}
      ListEmptyComponent={listEmptyComponent}
    />
  );
};

export default connectInfiniteHits(DiaryHitList);
