import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { FlatList } from 'react-native-gesture-handler';
import { borderLightColor } from '../styles/Common';
import { EmptyFavoriteUser, UserListItem } from '../components/molecules';
import { profile } from '../utils/testdata';
import { Profile } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
});

const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * お気に入りユーザ一覧画面
 */
const FavoriteUserListScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const [profiles, setProfiles] = useState([profile, profile]);

  const onPressUser = useCallback(() => {}, []);
  const onPressFavorite = useCallback(() => {}, []);

  const renderItem = useCallback(
    ({ item }: { item: Profile }): JSX.Element => {
      const { name, photoUrl } = item;
      return (
        <View style={styles.item}>
          <UserListItem
            name={name}
            photoUrl={photoUrl}
            onPressUser={onPressUser}
            onPressButton={onPressFavorite}
          />
        </View>
      );
    },
    [onPressFavorite, onPressUser]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyFavoriteUser />}
      />
    </View>
  );
};

export default FavoriteUserListScreen;
