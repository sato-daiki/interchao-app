import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { InstantSearch, Configure } from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { ALGOLIA_API_KEY, ALGOLIA_ADMIN_API_KEY } from '@env';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from '../constants/firebase';
import SearchBar from '../components/organisms/SearchBar';
import DiaryHitList from '../components/organisms/DiaryHitList';
import { getExceptUser } from '../utils/diary';
import { getBlockers, getBlockees } from '../utils/blockUser';
import { Profile } from '../types';
import { LoadingModal } from '../components/atoms';
import I18n from '../utils/I18n';

export interface Props {
  profile: Profile;
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
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

const TeachDiarySerchScreen: ScreenType = ({ profile, navigation }) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState('');

  useEffect(() => {
    const f = async (): Promise<void> => {
      const { currentUser } = firebase.auth();
      if (!currentUser) return;
      const blockerUids = await getBlockers(currentUser.uid);
      const blockeeUids = await getBlockees(currentUser.uid);
      const uids = blockerUids.concat(blockeeUids);
      const fillterText = getExceptUser(uids);
      setFilters(
        `profile.learnLanguage: ${profile.nativeLanguage} AND diaryStatus: publish ${fillterText}`
      );
      setIsLoading(false);
    };
    f();
  }, [filters, profile.nativeLanguage]);

  const onPressItem = useCallback(
    (objectID: string) => {
      navigation.navigate('TeachDiary', { objectID });
    },
    [navigation]
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingModal visible={isLoading} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <InstantSearch
        searchClient={searchClient}
        indexName={__DEV__ ? 'dev_diaries' : 'prod_diaries'}
      >
        <Configure filters={filters} />
        <SearchBar
          placeholder={I18n.t('teachDiarySerch.searchBar')}
          setIsEmpty={setIsEmpty}
          onPressClose={(): void => {
            navigation.goBack();
          }}
        />
        <DiaryHitList me={false} isEmpty={isEmpty} onPressItem={onPressItem} />
      </InstantSearch>
    </SafeAreaView>
  );
};

TeachDiarySerchScreen.navigationOptions = (): NavigationStackOptions => ({
  headerShown: false,
});

export default TeachDiarySerchScreen;
