import React, { useCallback, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { InstantSearch, Configure } from 'react-instantsearch-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from '../constants/firebase';
import SearchBar from '../components/organisms/SearchBar';
import DiaryHitList from '../components/organisms/DiaryHitList';
import I18n from '../utils/I18n';
import { getClient } from '../utils/Algolia';
import { getIndexName } from '../utils/common';

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

const searchClient = getClient();

const MyDiarySerchScreen: ScreenType = ({ navigation }) => {
  const { currentUser } = firebase.auth();
  const [isEmpty, setIsEmpty] = useState(true);

  const onPressItem = useCallback(
    (objectID: string) => {
      navigation.navigate('MyDiary', { objectID });
    },
    [navigation]
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

MyDiarySerchScreen.navigationOptions = (): NavigationStackOptions => ({
  headerShown: false,
});

export default MyDiarySerchScreen;
