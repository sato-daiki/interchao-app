import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { connectInfiniteHits } from 'react-instantsearch-native';
import { Diary } from '../../types';
import SearchDiaryList from './SearchDiaryList';
import { GrayHeader } from '../atoms';
import { EmptyList } from '../molecules';
import I18n from '../../utils/I18n';

interface Props {
  isEmpty: boolean;
  onPressItem: (objectID: string, userName: string) => void;
  hits: Diary[];
  hasMore: boolean;
  refine?: any;
}

const DiaryHitList = ({
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

  const renderItem: ListRenderItem<Diary> = useCallback(
    ({ item }): JSX.Element => {
      return (
        <SearchDiaryList
          item={item}
          onPressItem={(): void => {
            if (!item.objectID) return;
            onPressItem(item.objectID, item.profile.userName);
          }}
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
