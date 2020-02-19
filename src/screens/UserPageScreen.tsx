import React, { useCallback, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { profile, diary } from '../utils/testdata';
import {
  ProfileHeader,
  DiaryListItem,
  EmptyDiary,
} from '../components/molecules';
import { GrayHeader } from '../components/atoms';
import { Diary } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 8,
  },
});

const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * ユーザページ
 */
const UserPageScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [diaries, setDiaries] = useState([diary, diary]);
  const onPressUser = useCallback(() => {}, []);
  const onPressEdit = useCallback(() => {}, []);

  const onPressItem = useCallback(
    item => {
      navigation.navigate('UserDiary', { item });
    },
    [navigation]
  );

  const { name, photoUrl, introduction } = profile;

  const listHeaderComponent = (
    <GrayHeader title={`日記一覧(${diaries ? diaries.length : 0}件)`} />
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

  return (
    <View style={styles.container}>
      <ProfileHeader
        name={name}
        photoUrl={photoUrl}
        introduction={introduction}
        onPressUser={onPressUser}
        onPressButton={onPressEdit}
        buttonTitle="お気に入りに追加"
      />
      <FlatList
        data={diaries}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        ListEmptyComponent={<EmptyDiary />}
      />
    </View>
  );
};

export default UserPageScreen;
