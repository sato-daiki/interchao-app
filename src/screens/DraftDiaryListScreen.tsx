import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { GrayHeader } from '../components/atoms';
import { User, Diary } from '../types';
import { DiaryListItem } from '../components/molecules';
import firebase from '../constants/firebase';

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

const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * 下書き一覧
 */
const DraftDiaryListScreen: React.FC<Props &
  DispatchProps> = (): JSX.Element => {
  const [diaries, setDiaries] = useState();
  useEffect(() => {
    const f = async (): Promise<void> => {
      const diariesRef = await firebase
        .firestore()
        .collection('diaries')
        .get();
      // TODO dataの取得方法考え直す
      setDiaries(diariesRef.docs);
    };
    f();
  });

  const onPressUser = useCallback(() => {}, []);
  const onPressItem = useCallback(() => {}, []);

  const renderItem = useCallback(
    ({
      item,
    }: {
      item: firebase.firestore.QueryDocumentSnapshot<
        firebase.firestore.DocumentData
      >;
    }): JSX.Element => {
      return (
        <DiaryListItem
          item={item.data()}
          onPressUser={onPressUser}
          onPressItem={onPressItem}
        />
      );
    },
    [onPressItem, onPressUser]
  );

  const listHeaderComponent = (
    <GrayHeader title={`下書き一覧(${diaries ? diaries.length : 0}件)`} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        screenName="draft"
        data={diaries}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
      />
    </View>
  );
};

export default DraftDiaryListScreen;