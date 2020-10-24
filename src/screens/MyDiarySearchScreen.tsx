import React, { useCallback, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { InstantSearch, Configure } from 'react-instantsearch-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import firebase from '../constants/firebase';
import SearchBar from '../components/features/SearchBar';
import DiaryHitList from '../components/features/DiaryHitList';
import I18n from '../utils/I18n';
import { getClient } from '../utils/Algolia';
import { getIndexName } from '../utils/common';
import {
  MyDiaryTabStackParamList,
  MyDiaryTabNavigationProp,
} from '../navigations/MyDiaryTabNavigator';
import { Profile } from '../types';

export interface Props {
  profile: Profile;
}

type MyDiarySearchNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyDiaryTabStackParamList, 'MyDiarySearch'>,
  MyDiaryTabNavigationProp
>;

type ScreenType = {
  navigation: MyDiarySearchNavigationProp;
} & Props;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const searchClient = getClient();

const MyDiarySerchScreen: React.FC<ScreenType> = ({ navigation, profile }) => {
  const { currentUser } = firebase.auth();
  const [isEmpty, setIsEmpty] = useState(true);

  const onPressItem = useCallback(
    (objectID: string) => {
      if (!currentUser) return;
      navigation.navigate('MyDiary', { objectID, userName: profile.userName });
    },
    [currentUser, navigation, profile.userName]
  );

  if (!currentUser) return <View />;

  return (
    <SafeAreaView style={styles.container}>
      <InstantSearch searchClient={searchClient} indexName={getIndexName()}>
        <Configure
          filters={`profile.uid:${currentUser.uid} AND diaryStatus: publish`}
        />
        <SearchBar
          placeholder={I18n.t('myDiarySerch.placeholder')}
          setIsEmpty={setIsEmpty}
          onPressClose={(): void => {
            navigation.goBack();
          }}
        />
        <DiaryHitList me isEmpty={isEmpty} onPressItem={onPressItem} />
      </InstantSearch>
    </SafeAreaView>
  );
};

export default MyDiarySerchScreen;
