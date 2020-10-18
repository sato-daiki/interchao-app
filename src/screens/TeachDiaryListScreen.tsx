import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { GrayHeader, LoadingModal, HeaderIcon } from '../components/atoms';
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

  const [refreshing, setRefreshing] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  const filters = useRef<string | null>(null);
  const page = useRef<number>(0);
  const readingNext = useRef(false);
  const readAllResults = useRef(false);

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
          title={I18n.t('teachDiaryList.searchText')}
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
          <HeaderIcon
            icon="community"
            name="dots-horizontal"
            onPress={(): void => setIsMenu(true)}
          />
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

        filters.current = `${fillterLanguages} AND NOT hidden: true AND diaryStatus: publish ${fillterUids}`;

        const res = await index.search('', {
          filters: filters.current || undefined,
          page: 0,
          hitsPerPage: HIT_PER_PAGE,
        });

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
      if (!readingNext.current && !readAllResults.current && filters.current) {
        try {
          const nextPage = page.current + 1;
          readingNext.current = true;

          const index = await Algolia.getDiaryIndex();
          const res = await index.search('', {
            filters: filters.current,
            page: nextPage,
            hitsPerPage: HIT_PER_PAGE,
          });

          if (res.hits.length === 0) {
            readAllResults.current = true;
            readingNext.current = false;
          } else {
            setTeachDiaries([...teachDiaries, ...(res.hits as Diary[])]);
            page.current = nextPage;
            readingNext.current = false;
          }
        } catch (err) {
          readingNext.current = false;
          alert({ err });
        }
      }
    };
    f();
  }, [setTeachDiaries, teachDiaries]);

  const onPressItem = useCallback(
    (item: Diary) => {
      if (!item.objectID) return;
      navigation.navigate('TeachDiary', {
        objectID: item.objectID,
        userName: item.profile.userName,
      });
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

  const onPressUser = useCallback(
    (uid: string, userName: string) => {
      navigation.navigate('UserProfile', { userName });
    },
    [navigation]
  );

  type RenderItemProps = { item: Diary };
  const renderItem = useCallback(
    ({ item }: RenderItemProps): JSX.Element => {
      return (
        <TeachDiaryListItem
          item={item}
          onPressUser={onPressUser}
          onPressItem={onPressItem}
        />
      );
    },
    [onPressItem, onPressUser]
  );

  const listHeaderComponent = useCallback(
    () => <GrayHeader title={I18n.t('teachDiaryList.diaryList')} />,
    []
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
