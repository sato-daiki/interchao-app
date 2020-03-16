import React, { useCallback, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { InstantSearch, Configure } from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch';
import { ALGOLIA_API_KEY, ALGOLIA_ADMIN_API_KEY } from '@env';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from '../constants/firebase';
import SearchBar from '../components/organisms/SearchBar';
import DiaryHitList from '../components/organisms/DiaryHitList';

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

const MyDiarySerchScreen: ScreenType = ({ navigation }) => {
  const { currentUser } = firebase.auth();
  const [isEmpty, setIsEmpty] = useState(true);

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
        <Configure
          filters={`profile.uid:${currentUser!.uid} AND diaryStatus: publish`}
        />
        <SearchBar
          placeholder="タイトルと本文で検索"
          setIsEmpty={setIsEmpty}
          onPressClose={(): void => {
            navigation.goBack();
          }}
        />
        <DiaryHitList isEmpty={isEmpty} onPressItem={onPressItem} />
      </InstantSearch>
    </SafeAreaView>
  );
};

MyDiarySerchScreen.navigationOptions = (): NavigationStackOptions => ({
  headerShown: false,
});

export default MyDiarySerchScreen;
