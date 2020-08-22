import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Platform,
} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { Notifications } from 'expo';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';

import { GrayHeader, LoadingModal, HeaderRight } from '../components/atoms';
import { User, Diary, Profile } from '../types';
import DiaryListItem from '../components/organisms/DiaryListItem';
import {
  DefaultNavigationOptions,
  DefaultSearchBarOptions,
} from '../constants/NavigationOptions';
import MyDiaryListMenu from '../components/organisms/MyDiaryListMenu';
import MyDiaryListMenuWebPc from '../components/web/organisms/MyDiaryListMenu';
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
import { alert } from '../utils/ErrorAlert';
import { getDataCorrectionStatus } from '../utils/correcting';
import { getEachOS } from '../utils/common';

export interface Props {
  user: User;
  profile: Profile;
  diaries: Diary[];
  diaryTotalNum: number;
  localStatus: LocalStatus;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
  setUser: (user: User) => void;
  setDiaries: (diaries: Diary[]) => void;
  setLocalStatus: (localStatus: LocalStatus) => void;
  setDiaryTotalNum: (diaryTotalNum: number) => void;
}

type ScreenType = React.ComponentType<
  Props & DispatchProps & NavigationStackScreenProps
> & {
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
  profile,
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

  const isDesktopOrLaptopDevice = useMediaQuery({
    minDeviceWidth: 1224,
  });

  const [correctingObjectID, setCorrectingObjectID] = useState(
    user.correctingObjectID
  );

  const onPressSearch = useCallback(() => {
    navigation.navigate('MyDiarySearch');
  }, [navigation]);

  // 第二引数をなしにするのがポイント
  useEffect(() => {
    navigation.setParams({
      onPressMenu: () => setIsMenu(true),
      onPressSearch,
      isDesktopOrLaptopDevice,
      uid: user.uid,
      nativeLanguage: profile.nativeLanguage,
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
          if (newUnreadCorrectionNum !== null) {
            if (Platform.OS === 'ios') {
              Notifications.setBadgeNumberAsync(newUnreadCorrectionNum);
            }
            setLocalStatus({
              ...localStatus,
              unreadCorrectionNum: newUnreadCorrectionNum,
            });
          }
        } catch (err) {
          setIsLoading(false);
          setRefreshing(false);
          alert({ err });
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
          alert({ err });
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
      const data = getDataCorrectionStatus(user.correctingCorrectedNum, 'yet');
      if (!data) return;
      updateYet(user.correctingObjectID, user.uid, data);

      setUser({
        ...user,
        correctingObjectID: null,
        correctingCorrectedNum: null,
      });
      setIsStillLoading(false);
      setCorrectingObjectID(null);
    };
    f();
  }, [isStillLoading, setUser, user]);

  const onPressItem = useCallback(
    (item: Diary) => {
      const f = async (): Promise<void> => {
        if (!item.objectID) return;
        if (
          item.correctionStatus === 'unread' ||
          item.correctionStatus2 === 'unread' ||
          item.correctionStatus3 === 'unread'
        ) {
          // 未読の場合
          if (isLoading) return;
          setIsLoading(true);

          if (localStatus.unreadCorrectionNum) {
            const newUnreadCorrectionNum = localStatus.unreadCorrectionNum - 1;
            // アプリの通知数を設定
            if (Platform.OS === 'ios') {
              Notifications.setBadgeNumberAsync(newUnreadCorrectionNum);
            }
            setLocalStatus({
              ...localStatus,
              unreadCorrectionNum: newUnreadCorrectionNum,
            });
          }

          const data = {
            correctionStatus:
              item.correctionStatus === 'unread'
                ? 'done'
                : item.correctionStatus,
            correctionStatus2:
              item.correctionStatus2 === 'unread'
                ? 'done'
                : item.correctionStatus2,
            correctionStatus3:
              item.correctionStatus3 === 'unread'
                ? 'done'
                : item.correctionStatus3,
          };
          // DBを更新
          await updateUnread(item.objectID, data);
          // reduxを更新
          editDiary(item.objectID, {
            ...item,
            ...data,
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

  const isEmpty = !isLoading && !refreshing && diaries.length < 1;
  const ListEmptyComponent = useCallback(() => {
    if (isEmpty) {
      return <EmptyMyDiaryList />;
    }
    return null;
  }, [isEmpty]);

  return (
    <View style={styles.container}>
      <MyDiaryListMenu
        navigation={navigation}
        isMenu={isMenu}
        nativeLanguage={profile.nativeLanguage}
        uid={user.uid}
        onClose={onClose}
      />
      <LoadingModal visible={isLoading} />
      <ModalStillCorrecting
        visible={!!correctingObjectID}
        isLoading={isStillLoading}
        onPress={onPressModalStill}
      />
      <FlatList
        // emptyの時のレイアウトのため
        contentContainerStyle={isEmpty ? styles.flatList : null}
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
  const isDesktopOrLaptopDevice = navigation.getParam(
    'isDesktopOrLaptopDevice'
  );
  const nativeLanguage = navigation.getParam('nativeLanguage');
  const uid = navigation.getParam('uid');

  return {
    ...DefaultNavigationOptions,
    ...DefaultSearchBarOptions,
    headerTitle: (): JSX.Element => (
      <SearchBarButton
        title={I18n.t('myDiaryList.headerTitle')}
        onPress={onPressSearch}
      />
    ),
    headerRight: (): JSX.Element =>
      isDesktopOrLaptopDevice ? (
        <MyDiaryListMenuWebPc
          navigation={navigation}
          uid={uid}
          nativeLanguage={nativeLanguage}
        />
      ) : (
        <HeaderRight name="dots-horizontal" onPress={onPressMenu} />
      ),
  };
};

export default MyDiaryListScreen;
