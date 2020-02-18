import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { firestore } from 'firebase';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { GrayHeader } from '../components/atoms';
import { User, Diary } from '../types';
import { DiaryListItem } from '../components/molecules';
import firebase from '../configs/firebase';

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
 * みんなの日記一覧
 */
const TeachDiaryListScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const [diaries, setDiaries] = useState();
  const [loading, setLoading] = useState(true);
  const ref = firestore().collection('diaries');

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        list.push({
          id: doc.id,
          ...data,
        });
      });

      setDiaries(list);
      if (loading) {
        setLoading(false);
      }
    });
  }, [loading, ref]);

  const onPressUser = useCallback(() => {}, []);
  const onPressItem = useCallback(
    item => {
      navigation.navigate('UserDiary', { item });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Diary }): JSX.Element => {
      return (
        <DiaryListItem
          screenName="teach"
          item={item}
          onPressUser={onPressUser}
          onPressItem={onPressItem}
        />
      );
    },
    [onPressItem, onPressUser]
  );

  const listHeaderComponent = (
    <GrayHeader
      title={`日本語を勉強している人の日記一覧(${
        diaries ? diaries.length : 0
      }件)`}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={diaries}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
      />
    </View>
  );
};

export default TeachDiaryListScreen;
