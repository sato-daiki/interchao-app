import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Algolia from '../utils/Algolia';
import { GrayHeader, LoadingModal } from '../components/atoms';
import { User, Diary } from '../types';
import MyDiaryListItem from '../components/organisms/MyDiaryListItem';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import MyDiaryListMenu from '../components/organisms/MyDiaryListMenu';
import { Logo } from '../images';
import { primaryColor } from '../styles/Common';

export interface Props {
  currentUser: User;
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
  logo: {
    width: 150,
    height: 26,
  },
});

const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * マイ日記一覧
 */
const MyDiaryListScreen: ScreenType = ({ currentUser, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [isMenu, setIsMenu] = useState(false);
  const [diaries, setDiaries] = useState();

  // 第二引数をなしにするのがポイント
  useEffect(() => {
    navigation.setParams({ onPressMenu: () => setIsMenu(true) });
  }, []);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      const index = await Algolia.getDiaryIndex();
      const res = await index.search('', {
        filters: `profile.uid: ${currentUser.uid}`,
        page: 0,
        hitsPerPage: 20,
      });

      if (res.hits.length === 0) {
        // 検索結果0
        setDiaries([]);
      } else {
        setDiaries(res.hits);
      }
      setLoading(false);
    };
    f();
  }, []);

  const onClose = useCallback(() => {
    setIsMenu(false);
  }, []);

  const onPressUser = useCallback(() => {
    navigation.navigate('MyPage');
  }, [navigation]);

  const onPressItem = useCallback(
    item => {
      navigation.navigate('MyDiary', { item });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Diary }): JSX.Element => {
      return (
        <MyDiaryListItem
          screenName="my"
          item={item}
          onPressUser={onPressUser}
          onPressItem={onPressItem}
        />
      );
    },
    [onPressItem, onPressUser]
  );

  const listHeaderComponent = (
    <GrayHeader title={`マイ日記一覧(${diaries ? diaries.length : 0}件)`} />
  );

  return (
    <View style={styles.container}>
      <MyDiaryListMenu
        navigation={navigation}
        isMenu={isMenu}
        onClose={onClose}
      />

      <LoadingModal visible={loading} />
      <FlatList
        data={diaries}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
      />
    </View>
  );
};

MyDiaryListScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressMenu = navigation.getParam('onPressMenu');
  return {
    ...DefaultNavigationOptions,
    headerTitle: (): JSX.Element => <Image source={Logo} style={styles.logo} />,
    headerRight: (): JSX.Element => (
      <MaterialCommunityIcons
        size={28}
        color={primaryColor}
        name="dots-horizontal"
        onPress={onPressMenu}
      />
    ),
  };
};

export default MyDiaryListScreen;
