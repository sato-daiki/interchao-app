import React, { useCallback } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { borderLightColor } from '../styles/Common';
import { EmptyFavoriteUser, UserListItem } from '../components/molecules';
import { Diary } from '../types';

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
const profiles = [];

const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * お気に入りユーザ一覧画面
 */
const FavoriteUserListScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const renderItem = useCallback(
    ({ item }): JSX.Element => {
      const { userName, photoUrl, nativeLanguage, nationalityCode } = item;
      return (
        <View style={styles.item}>
          <UserListItem
            userName={userName}
            photoUrl={photoUrl}
            nativeLanguage={nativeLanguage}
            nationalityCode={nationalityCode}
            onPressUser={(): void => {
              navigation.navigate('UserProfile', { uid: item.uid });
            }}
          />
        </View>
      );
    },
    [navigation]
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
