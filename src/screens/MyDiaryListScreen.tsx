import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Notifications } from 'expo';
import { GrayHeader, LoadingModal } from '../components/atoms';
import { User, Diary } from '../types';
import DiaryListItem from '../components/organisms/DiaryListItem';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import MyDiaryListMenu from '../components/organisms/MyDiaryListMenu';
import { primaryColor } from '../styles/Common';
import EmptyMyDiaryList from '../components/organisms/EmptyMyDiaryList';
import SearchBarButton from '../components/molecules/SearchBarButton';
import Algolia from '../utils/Algolia';
import {
  registerForPushNotificationsAsync,
  addLisner,
} from '../utils/Notification';
import { updateUnread, updateYet } from '../utils/diary';
import ModalStillCorrecting from '../components/organisms/ModalStillCorrecting';
import { getUnreadCorrectionNum } from '../utils/localStatus';
import { LocalStatus } from '../types/localStatus';
import I18n from '../utils/I18n';

export interface Props {
  user: User;
  diaries: Diary[];
  diaryTotalNum: number;
  localStatus: LocalStatus;
  editDiary: (objectID: string, diary: Diary) => void;
  setUser: (user: User) => void;
  setDiaries: (diaries: Diary[]) => void;
  setLocalStatus: (localStatus: LocalStatus) => void;
  setDiaryTotalNum: (diaryTotalNum: number) => void;
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
  flatList: {
    flex: 1,
  },
});

const HIT_PER_PAGE = 20;
const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * マイ日記一覧
 */
const MyDiaryListScreen: ScreenType = ({
  user,
  diaries,
  diaryTotalNum,
  localStatus,
  editDiary,
  setUser,
  setDiaries,
  setDiaryTotalNum,
  setLocalStatus,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isStillLoading, setIsStillLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [readingNext, setReadingNext] = useState(false);
  const [readAllResults, setReadAllResults] = useState(false);

  const [isMenu, setIsMenu] = useState(false);

  const onPressSearch = useCallback(() => {
    navigation.navigate('MyDiarySearch');
  }, [navigation]);

  // 第二引数をなしにするのがポイント
  useEffect(() => {
    navigation.setParams({
      onPressMenu: () => setIsMenu(true),
      onPressSearch,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNewDiary = useCallback(
    (clean: boolean) => {
      const f = async (): Promise<void> => {
        try {
          const index = await Algolia.getDiaryIndex(clean);
          await Algolia.setSettings(index);
          const res = await index.search('', {
            filters: `profile.uid: ${user.uid} AND diaryStatus: publish`,
            page: 0,
            hitsPerPage: HIT_PER_PAGE,
          });

          const { hits, nbHits } = res;
          setDiaries(hits as Diary[]);
          setDiaryTotalNum(nbHits);

          // ユーザ情報も更新し直す（badgeのカウントの対応のため）
          const newUnreadCorrectionNum = await getUnreadCorrectionNum(user.uid);
          if (newUnreadCorrectionNum) {
            setLocalStatus({
              ...localStatus,
              unreadCorrectionNum: newUnreadCorrectionNum,
            });
          }
        } catch (err) {
          setIsLoading(false);
          setRefreshing(false);
          Alert.alert(I18n.t('common.error'), I18n.t('errorMessage.network'));
        }
        setIsLoading(false);
      };
      f();
    },
    [localStatus, setDiaries, setDiaryTotalNum, setLocalStatus, user.uid]
  );

  const onRefresh = useCallback(() => {
    const f = async (): Promise<void> => {
      setRefreshing(true);
      await getNewDiary(true);
      setRefreshing(false);
    };
    f();
  }, [getNewDiary]);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      await getNewDiary(false);
      // push通知の設定
      await registerForPushNotificationsAsync(user.uid);
      addLisner(navigation, onRefresh);
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNextPage = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!readingNext && !readAllResults) {
        try {
          const nextPage = page + 1;
          setReadingNext(true);

          const index = await Algolia.getDiaryIndex();
          const res = await index.search('', {
            filters: `profile.uid: ${user.uid} AND diaryStatus: publish`,
            page: nextPage,
            hitsPerPage: HIT_PER_PAGE,
          });
          const { hits } = res;

          if (hits.length === 0) {
            setReadAllResults(true);
            setReadingNext(false);
          } else {
            setDiaries([...diaries, ...(hits as Diary[])]);
            setPage(nextPage);
            setReadingNext(false);
          }
        } catch (err) {
          setReadingNext(false);
          Alert.alert(I18n.t('common.error'), I18n.t('errorMessage.network'));
        }
      }
    };
    f();
  }, [diaries, page, readAllResults, readingNext, setDiaries, user.uid]);

  const onClose = useCallback(() => {
    setIsMenu(false);
  }, []);

  const onPressModalStill = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isStillLoading || !user.correctingObjectID) return;
      setIsStillLoading(true);
      // ステータスを戻す
      updateYet(user.correctingObjectID, user.uid);
      setUser({
        ...user,
        correctingObjectID: null,
      });
      setIsStillLoading(false);
    };
    f();
  }, [isStillLoading, setUser, user]);

  const onPressItem = useCallback(
    (item: Diary) => {
      const f = async (): Promise<void> => {
        if (!item.objectID) return;
        if (item.correctionStatus === 'unread') {
          // 未読の場合
          if (isLoading) return;
          setIsLoading(true);

          const newUnreadCorrectionNum = localStatus.unreadCorrectionNum - 1;
          // アプリの通知数を設定
          Notifications.setBadgeNumberAsync(newUnreadCorrectionNum);

          // DBを更新
          await updateUnread(item.objectID);

          // reduxを更新
          editDiary(item.objectID, {
            ...item,
            correctionStatus: 'done',
          });
          setLocalStatus({
            ...localStatus,
            unreadCorrectionNum: newUnreadCorrectionNum,
          });
          setIsLoading(false);
        }
        navigation.navigate('MyDiary', { objectID: item.objectID });
      };
      f();
    },
    [editDiary, isLoading, localStatus, navigation, setLocalStatus]
  );

  const renderItem = useCallback(
    ({ item }: { item: Diary }): JSX.Element => {
      return (
        <DiaryListItem
          mine
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

  const listHeaderComponent = useCallback(() => {
    return (
      <GrayHeader
        title={I18n.t('myDiaryList.diaryList', { count: diaryTotalNum })}
      />
    );
  }, [diaryTotalNum]);

  const ListEmptyComponent = useCallback(() => {
    if (!isLoading && !refreshing && diaries.length < 1) {
      return <EmptyMyDiaryList />;
    }
    return null;
  }, [diaries.length, isLoading, refreshing]);

  return (
    <View style={styles.container}>
      <MyDiaryListMenu
        navigation={navigation}
        isMenu={isMenu}
        uid={user.uid}
        onClose={onClose}
      />
      <LoadingModal visible={isLoading} />
      <ModalStillCorrecting
        visible={!!user.correctingObjectID}
        isLoading={isStillLoading}
        onPress={onPressModalStill}
      />
      <FlatList
        contentContainerStyle={styles.flatList}
        data={diaries}
        keyExtractor={keyExtractor}
        refreshing={refreshing}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
        onEndReached={loadNextPage}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

MyDiaryListScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressMenu = navigation.getParam('onPressMenu');
  const onPressSearch = navigation.getParam('onPressSearch');
  return {
    ...DefaultNavigationOptions,
    headerTitle: (): JSX.Element => (
      <SearchBarButton
        title={I18n.t('myDiaryList.headerTitle')}
        onPress={onPressSearch}
      />
    ),
    headerRight: (): JSX.Element => (
      <TouchableOpacity onPress={onPressMenu}>
        <MaterialCommunityIcons
          size={28}
          color={primaryColor}
          name="dots-horizontal"
        />
      </TouchableOpacity>
    ),
  };
};

export default MyDiaryListScreen;
