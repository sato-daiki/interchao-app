import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { InstantSearch, Configure } from 'react-instantsearch-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import firebase from '../constants/firebase';
import SearchBar from '../components/organisms/SearchBar';
import DiaryHitList from '../components/organisms/DiaryHitList';
import { getExceptUser, getFillterLanguages } from '../utils/diary';
import { getBlockers, getBlockees } from '../utils/blockUser';
import { Profile } from '../types';
import { LoadingModal } from '../components/atoms';
import I18n from '../utils/I18n';
import { getClient } from '../utils/Algolia';
import { getIndexName } from '../utils/common';
import {
  TeachDiaryTabNavigationProp,
  TeachDiaryTabStackParamList,
} from '../navigations/TeachDiaryTabNavigator';

export interface Props {
  profile: Profile;
}

type TeachDiaryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<TeachDiaryTabStackParamList, 'TeachDiarySearch'>,
  TeachDiaryTabNavigationProp
>;

type ScreenType = {
  navigation: TeachDiaryNavigationProp;
} & Props;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const searchClient = getClient();

const TeachDiarySerchScreen: React.FC<ScreenType> = ({
  profile,
  navigation,
}) => {
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
      const fillterLanguages = getFillterLanguages(
        profile.nativeLanguage,
        profile.spokenLanguages
      );
      setFilters(
        `${fillterLanguages} AND NOT hidden: true AND diaryStatus: publish ${fillterText}`
      );
      setIsLoading(false);
    };
    f();
  }, [filters, profile.nativeLanguage, profile.spokenLanguages]);

  const onPressItem = useCallback(
    (objectID: string, userName: string) => {
      navigation.navigate('TeachDiary', {
        objectID,
        userName,
      });
    },
    [navigation]
  );

  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingModal visible={isLoading} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <InstantSearch searchClient={searchClient} indexName={getIndexName()}>
        <Configure filters={filters} />
        <SearchBar
          placeholder={I18n.t('teachDiarySerch.searchBar')}
          setIsEmpty={setIsEmpty}
          onPressClose={onPressClose}
        />
        <DiaryHitList isEmpty={isEmpty} onPressItem={onPressItem} />
      </InstantSearch>
    </SafeAreaView>
  );
};

export default TeachDiarySerchScreen;
