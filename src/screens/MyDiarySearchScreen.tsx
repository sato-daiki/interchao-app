import React, { useEffect, useCallback, useState } from 'react';
import { InstantSearch } from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch';
import {
  ALGOLIA_API_KEY, // APPLICATION_ID
  ALGOLIA_ADMIN_API_KEY,
} from '@env';
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { Diary } from '../types';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import SearchBar, {
  Props as SearchBarProps,
} from '../components/organisms/SearchBar';
import DiaryHitList from '../components/organisms/DiaryHitList';
import { Space } from '../components/atoms';

type ScreenType = React.ComponentType<NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const searchClient = algoliasearch(ALGOLIA_API_KEY, ALGOLIA_ADMIN_API_KEY);

/**
 * マイ日記一覧
 */
const MyDiarySerchScreen: ScreenType = ({ navigation }) => {
  const onPressUser = useCallback(
    (uid: string): void => {
      navigation.navigate('UserProfile', { uid });
    },
    [navigation]
  );

  const onPressItem = useCallback(
    (objectID: string) => {
      navigation.navigate('MyDiary', { objectID });
    },
    [navigation]
  );

  return (
    <SafeAreaView style={styles.container}>
      <InstantSearch
        searchClient={searchClient}
        indexName={__DEV__ ? 'dev_diaries' : 'prod_diaries'}
      >
        <SearchBar placeholder="タイトルと本文で検索" />
        <Space size={70} />

        <DiaryHitList onPressUser={onPressUser} onPressItem={onPressItem} />
      </InstantSearch>
    </SafeAreaView>
  );
};

MyDiarySerchScreen.navigationOptions = (): NavigationStackOptions => ({
  headerShown: false,
});

export default MyDiarySerchScreen;
