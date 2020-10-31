import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import { View, StyleSheet, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import '@expo/match-media';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import MyDiaryListFlatList from '@/components/organisms/MyDiaryList/MyDiaryListFlatList';
import { LoadingModal, HeaderText } from '@/components/atoms';
import FirstPageComponents from '@/components/organisms/FirstPageComponents';
import SearchBarButton from '@/components/molecules/SearchBarButton';
import Algolia from '@/utils/Algolia';
import { getMarkedDates, updateUnread } from '@/utils/diary';
import { getUnreadCorrectionNum } from '@/utils/localStatus';
import { LocalStatus } from '@/types/localStatus';
import I18n from '@/utils/I18n';
import { alert } from '@/utils/ErrorAlert';
import firebase from '@/constants/firebase';
import {
  MyDiaryTabStackParamList,
  MyDiaryTabNavigationProp,
} from '@/navigations/MyDiaryTabNavigator';
import { ModalConfirm } from '@/components/organisms';
import { commonAlert } from '@/utils/locales/alert';
import MyDiaryListCalendar from '@/components/organisms/MyDiaryList/MyDiaryListCalendar';
import { User, Diary, Profile } from '@/types';
import { CustomMarking } from 'react-native-calendars';
import { useFirstScreen } from './useFirstScreen';

const EDIT_WIDTH = 48;

export interface Props {
  user: User;
  profile: Profile;
  diaries: Diary[];
  diaryTotalNum: number;
  localStatus: LocalStatus;
}

export interface MarkedDates {
  [date: string]: CustomMarking;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
  setUser: (user: User) => void;
  setDiaries: (diaries: Diary[]) => void;
  setLocalStatus: (localStatus: LocalStatus) => void;
  setDiaryTotalNum: (diaryTotalNum: number) => void;
}

type MyDiaryListNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyDiaryTabStackParamList, 'MyDiaryList'>,
  MyDiaryTabNavigationProp
>;

type ScreenType = {
  navigation: MyDiaryListNavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const HIT_PER_PAGE = 20;

/**
 * マイ日記一覧
 */
const MyDiaryListScreen: React.FC<ScreenType> = ({
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
  // const [markedDates, setMarkedDates] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const elRefs = useRef<Swipeable[]>([]);

  const page = useRef<number>(0);
  const readingNext = useRef(false);
  const readAllResults = useRef(false);

  const onPressSearch = useCallback(() => {
    navigation.navigate('MyDiarySearch');
  }, [navigation]);

  const markedDates = useMemo(() => getMarkedDates(diaries), [diaries]);

  // const onPressEdit = useCallback(() => {
  //   navigation.navigate('EditMyDiaryList');
  // }, [navigation]);

  // 第二引数をなしにするのがポイント
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (): JSX.Element => (
        <SearchBarButton
          title={I18n.t('myDiaryList.searchText')}
          onPress={onPressSearch}
        />
      ),
      // headerRight: (): JSX.Element | null => {
      //   if (diaryTotalNum > 0) {
      //     return (
      //       <HeaderText text={I18n.t('common.edit')} onPress={onPressEdit} />
      //     );
      //   }
      //   return null;
      // },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diaryTotalNum]);

  const getNewDiary = useCallback(async (): Promise<void> => {
    try {
      const index = await Algolia.getDiaryIndex();
      await Algolia.setSettings(index);
      const res = await index.search('', {
        filters: `profile.uid: ${user.uid}`,
        page: 0,
        hitsPerPage: HIT_PER_PAGE,
      });

      const { hits, nbHits } = res;
      const newDiaries = hits as Diary[];
      setDiaries(newDiaries);
      setDiaryTotalNum(nbHits);
      setIsLoading(false);

      // ユーザ情報も更新し直す（badgeのカウントの対応のため）
      const newUnreadCorrectionNum = await getUnreadCorrectionNum(user.uid);
      if (newUnreadCorrectionNum !== null) {
        Notifications.setBadgeCountAsync(newUnreadCorrectionNum);
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
  }, [localStatus, setDiaries, setDiaryTotalNum, setLocalStatus, user.uid]);

  const onRefresh = useCallback(async (): Promise<void> => {
    setRefreshing(true);
    await getNewDiary();
    setRefreshing(false);
  }, [getNewDiary]);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      await getNewDiary();
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFirstScreen({
    user,
    localStatus,
    onResponseReceived: onRefresh,
    setLocalStatus,
  });

  const loadNextPage = useCallback(async (): Promise<void> => {
    if (!readingNext.current && !readAllResults.current) {
      try {
        const nextPage = page.current + 1;
        readingNext.current = true;

        const index = await Algolia.getDiaryIndex();
        const res = await index.search('', {
          filters: `profile.uid: ${user.uid}`,
          page: nextPage,
          hitsPerPage: HIT_PER_PAGE,
        });
        const { hits } = res;

        if (hits.length === 0) {
          readAllResults.current = true;
          readingNext.current = false;
        } else {
          setDiaries([...diaries, ...(hits as Diary[])]);
          page.current = nextPage;
          readingNext.current = false;
        }
      } catch (err) {
        readingNext.current = false;
        alert({ err });
      }
    }
  }, [diaries, setDiaries, user.uid]);

  const handlePressItem = useCallback(
    async (item: Diary): Promise<void> => {
      if (!item.objectID) return;

      if (item.diaryStatus === 'draft') {
        if (Platform.OS === 'web') {
          navigation.navigate('ModalPostDraftDiaryWeb', {
            screen: 'PostDraftDiaryWeb',
            params: { item, objectID: item.objectID },
          });
        } else {
          navigation.navigate('ModalPostDraftDiary', {
            screen: 'PostDraftDiary',
            params: { item, objectID: item.objectID },
          });
        }
        return;
      }

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
          Notifications.setBadgeCountAsync(newUnreadCorrectionNum);
          setLocalStatus({
            ...localStatus,
            unreadCorrectionNum: newUnreadCorrectionNum,
          });
        }

        const data = {
          correctionStatus:
            item.correctionStatus === 'unread' ? 'done' : item.correctionStatus,
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
      navigation.navigate('MyDiary', {
        objectID: item.objectID,
        userName: profile.userName,
      });
    },
    [
      editDiary,
      isLoading,
      localStatus,
      navigation,
      profile.userName,
      setLocalStatus,
    ]
  );

  const onPressUser = useCallback(
    (uid: string, userName: string) => {
      navigation.navigate('UserProfile', { userName });
    },
    [navigation]
  );

  const onDeleteDiary = useCallback(
    async (item: Diary, index: number) => {
      if (!item.objectID) return;
      setIsLoading(true);

      await firebase
        .firestore()
        .collection('diaries')
        .doc(item.objectID)
        .delete();

      setDiaries(diaries.filter(c => c.objectID !== item.objectID));
      setDiaryTotalNum(diaryTotalNum - 1);

      if (elRefs.current[index]) {
        elRefs.current[index].close();
      }
      setIsLoading(false);
    },
    [diaries, diaryTotalNum, setDiaries, setDiaryTotalNum]
  );

  const handlePressDelete = useCallback(
    (item: Diary, index: number) => {
      commonAlert({
        title: I18n.t('common.confirmation'),
        message: I18n.t('myDiary.confirmMessage'),
        buttons: [
          {
            text: 'Cancel',
            onPress: (): void => undefined,
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async (): Promise<void> => onDeleteDiary(item, index),
          },
        ],
        options: { cancelable: false },
      });
    },
    [onDeleteDiary]
  );

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <FirstPageComponents user={user} setUser={setUser} />
      {'aaa' === 'aaa' ? (
        <MyDiaryListCalendar diaries={diaries} markedDates={markedDates} />
      ) : (
        <MyDiaryListFlatList
          // emptyの時のレイアウトのため
          elRefs={elRefs}
          isEmpty={!isLoading && !refreshing && diaries.length < 1}
          refreshing={refreshing}
          diaries={diaries}
          diaryTotalNum={diaryTotalNum}
          loadNextPage={loadNextPage}
          onPressUser={onPressUser}
          onRefresh={onRefresh}
          handlePressItem={handlePressItem}
          handlePressDelete={handlePressDelete}
        />
      )}
    </View>
  );
};

export default MyDiaryListScreen;
