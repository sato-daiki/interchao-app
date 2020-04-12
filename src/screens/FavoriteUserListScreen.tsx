import React, { useCallback, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { borderLightColor } from '../styles/Common';
import { EmptyFavoriteUser, UserListItem } from '../components/molecules';
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
  const [profiles, setProfiles] = useState();
  const onPressFavorite = useCallback(() => {}, []);

  const renderItem = useCallback(
    ({ item }: { item: Profile }): JSX.Element => {
      const { userName, photoUrl, nativeLanguage } = item;
      return (
        <View style={styles.item}>
          <UserListItem
            userName={userName}
            photoUrl={photoUrl}
            nativeLanguage={nativeLanguage}
            onPressUser={(): void => {
              navigation.navigate('UserProfile', { uid: item.uid });
            }}
            onPressButton={onPressFavorite}
          />
        </View>
      );
    },
    [navigation, onPressFavorite]
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
