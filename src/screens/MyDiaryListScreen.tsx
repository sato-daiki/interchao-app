import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { GrayHeader } from '../components/atoms';
import { diary } from '../utils/testdata';
import { User, Diary } from '../types';
import { DiaryListItem } from '../components/molecules';

export interface Props {
  user: User;
}

export interface DispatchProps {
  setUser: (user: User) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const diaries: Diary[] = [diary, diary];

const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * 日記一覧
 */
const MyDiaryListScreen: React.FC<Props & DispatchProps> = (): JSX.Element => {
  const daiaryCount = diaries.length;

  const onPressUser = useCallback(() => {}, []);
  const onPressItem = useCallback(() => {}, []);

  const renderItem = useCallback(
    ({ item }: { item: Diary }): JSX.Element => {
      return (
        <DiaryListItem
          item={item}
          onPressUser={onPressUser}
          onPressItem={onPressItem}
        />
      );
    },
    [onPressItem, onPressUser]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={diaries}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={
          <GrayHeader title={`マイ日記一覧(${daiaryCount}件)`} />
        }
      />
    </View>
  );
};

export default MyDiaryListScreen;
