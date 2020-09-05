import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Platform,
} from 'react-native';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import Algolia from '../utils/Algolia';
import { GrayHeader, LoadingModal, HeaderRight } from '../components/atoms';
import { Diary, Profile, User } from '../types';
import TeachDiaryListItem from '../components/organisms/TeachDiaryListItem';
import { EmptyList } from '../components/molecules';
import firebase from '../constants/firebase';
import { getBlockers, getBlockees } from '../utils/blockUser';
import SearchBarButton from '../components/molecules/SearchBarButton';
import { getExceptUser, getFillterLanguages } from '../utils/diary';
import TutorialTeachDiaryList from '../components/organisms/TutorialTeachDiaryList';
import I18n from '../utils/I18n';
import { alert } from '../utils/ErrorAlert';
import TeachDiaryListMenu from '../components/organisms/TeachDiaryListMenu';
import {
  TeachDiaryTabNavigationProp,
  TeachDiaryTabStackParamList,
} from '../navigations/TeachDiaryTabNavigator';

export interface Props {
  profile: Profile;
  user: User;
  teachDiaries: Diary[];
}

interface DispatchProps {
  setUser: (user: User) => void;
  setTeachDiaries: (teachDiaries: Diary[]) => void;
}

type TeachDiaryListNavigationProp = CompositeNavigationProp<
  StackNavigationProp<TeachDiaryTabStackParamList, 'TeachDiaryList'>,
  TeachDiaryTabNavigationProp
>;

type ScreenType = {
  navigation: TeachDiaryListNavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const HIT_PER_PAGE = 20;

const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * みんなの日記一覧
 */
const TeachDiaryListScreen: React.FC<ScreenType> = ({
  profile,
  user,
  setUser,
  teachDiaries,
  setTeachDiaries,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTutorialLoading, setIsTutorialLoading] = useState(false);
  const [blockUids, setBlockUids] = useState<string[]>([]);

  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  const isDesktopOrLaptopDevice = useMediaQuery({
    minDeviceWidth: 1224,
  });

  const onPressSearch = useCallback(() => {
    navigation.navigate('TeachDiarySearch');
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (): JSX.Element => (
        <SearchBarButton
          title={I18n.t('teachDiaryList.headerTitle')}
          onPress={onPressSearch}
        />
      ),
      // headerRight: (): JSX.Element =>
      //   isDesktopOrLaptopDevice ? (
      //     <TeachDiaryListMenuWebPc nativeLanguage={nativeLanguage} />
      //   ) : (
      //     <HeaderRight name="dots-horizontal" onPress={() => setIsMenu(true)} />
      //   ),
      headerRight: (): JSX.Element | null =>
        Platform.OS === 'web' ? null : (
          <HeaderRight name="dots-horizontal" onPress={() => setIsMenu(true)} />
        ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNewDiary = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        // ブロック一覧を取得する
        const blockerUids = await getBlockers(user.uid);
        const blockeeUids = await getBlockees(user.uid);
        const uids = blockerUids.concat(blockeeUids);

        const index = await Algolia.getDiaryIndex();
        await Algolia.setSettings(index);

        const fillterUids = getExceptUser(uids);
        const fillterLanguages = getFillterLanguages(
          profile.nativeLanguage,
          profile.spokenLanguages
        );

        const filters = `${fillterLanguages} AND NOT hidden: true AND diaryStatus: publish ${fillterUids}`;
        const res = await index.search('', {
          filters,
          page: 0,
          hitsPerPage: HIT_PER_PAGE,
        });

        // stateで保持
        setBlockUids(uids);

        // reduxで保持
        setTeachDiaries(res.hits as Diary[]);
      } catch (err) {
        setIsLoading(false);
        setRefreshing(false);
        alert({ err });
      }
      setIsLoading(false);
    };
    f();
  }, [
    profile.nativeLanguage,
    profile.spokenLanguages,
    setTeachDiaries,
    user.uid,
  ]);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      await getNewDiary();
    };
    f();
  }, [getNewDiary]);

  const onRefresh = useCallback(() => {
    const f = async (): Promise<void> => {
      setRefreshing(true);
      await getNewDiary();
      setRefreshing(false);
    };
    f();
  }, [getNewDiary]);

  const loadNextPage = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!readingNext && !readAllResults) {
        try {
          const nextPage = page + 1;
          setReadingNext(true);

          const fillterText = getExceptUser(blockUids);
          const fillterLanguages = getFillterLanguages(
            profile.nativeLanguage,
            profile.spokenLanguages
          );
          const filters = `${fillterLanguages} AND NOT hidden: true AND diaryStatus: publish ${fillterText}`;

          const index = await Algolia.getDiaryIndex();
          const res = await index.search('', {
            filters,
            page: nextPage,
            hitsPerPage: HIT_PER_PAGE,
          });

          if (res.hits.length === 0) {
            setReadAllResults(true);
            setReadingNext(false);
          } else {
            setTeachDiaries([...teachDiaries, ...(res.hits as Diary[])]);
            setPage(nextPage);
            setReadingNext(false);
          }
        } catch (err) {
          setReadingNext(false);
          alert({ err });
        }
      }
    };
    f();
  }, [
    blockUids,
    page,
    profile.nativeLanguage,
    profile.spokenLanguages,
    readAllResults,
    readingNext,
    setTeachDiaries,
    teachDiaries,
  ]);

  const onPressItem = useCallback(
    item => {
      navigation.navigate('TeachDiary', { objectID: item.objectID });
    },
    [navigation]
  );

  const onPressTutorial = useCallback((): void => {
    const f = async (): Promise<void> => {
      setIsTutorialLoading(true);
      await firebase
        .firestore()
        .doc(`users/${user.uid}`)
        .update({
          tutorialTeachDiaryList: true,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setUser({
        ...user,
        tutorialTeachDiaryList: true,
      });
      setIsTutorialLoading(false);
    };
    f();
  }, [setUser, user]);

  type RenderItemProps = { item: Diary };
  const renderItem = useCallback(
    ({ item }: RenderItemProps): JSX.Element => {
      return (
        <TeachDiaryListItem
          item={item}
          onPressUser={(uid: string): void => {
            navigation.navigate('UserProfile', { uid });
          }}
          onPressItem={onPressItem}
        />
      );
    },
    [navigation, onPressItem]
  );

  const listHeaderComponent = (
    <GrayHeader title={I18n.t('teachDiaryList.diaryList')} />
  );

  const listEmptyComponent =
    !isLoading && !refreshing && teachDiaries.length < 1 ? (
      <EmptyList
        message={I18n.t('teachDiaryList.empty')}
        iconName="book-open-variant"
      />
    ) : null;
  return (
    <View style={styles.container}>
      <TeachDiaryListMenu
        isMenu={isMenu}
        nativeLanguage={profile.nativeLanguage}
        onClose={(): void => setIsMenu(false)}
      />
      <LoadingModal visible={isLoading} />
      <TutorialTeachDiaryList
        isLoading={isTutorialLoading}
        displayed={user.tutorialTeachDiaryList}
        onPress={onPressTutorial}
      />
      <FlatList
        data={teachDiaries}
        keyExtractor={keyExtractor}
        refreshing={refreshing}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        ListEmptyComponent={listEmptyComponent}
        onEndReached={loadNextPage}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default TeachDiaryListScreen;
