import React, {
  useCallback,
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  NavigationStackScreenComponent,
  NavigationStackOptions,
} from 'react-navigation-stack';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import { profile, diary } from '../utils/testdata';
import {
  ProfileHeader,
  DiaryListItem,
  EmptyDiary,
} from '../components/molecules';
import { GrayHeader } from '../components/atoms';
import { Diary } from '../types';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { subTextColor, primaryColor } from '../styles/Common';
import Report from '../components/organisms/Report';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 8,
  },
});

const keyExtractor = (item: Diary, index: number): string => String(index);

/**
 * ユーザページ
 */
const UserProfileScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { name, photoUrl, introduction } = profile;
  const [isReport, setIsReport] = useState(false);

  const [diaries, setDiaries] = useState([diary, diary]);
  const { showActionSheetWithOptions } = useActionSheet();

  const onPressUser = useCallback(() => {}, []);
  const onPressEdit = useCallback(() => {}, []);

  const closePanel = useCallback(() => {
    setIsReport(false);
  }, []);

  const onPressBlock = useCallback(() => {
    navigation.navigate('Block');
  }, [navigation]);

  const onPressReport = useCallback(() => {
    setIsReport(true);
  }, []);

  const onPressItem = useCallback(
    item => {
      navigation.navigate('UserDiary', { item });
    },
    [navigation]
  );

  const onPressMore = useCallback(() => {
    const options = ['ブロック', '報告する', 'キャンセル'];
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 2,
        destructiveButtonIndex: 0,
      },
      index => {
        switch (index) {
          case 0:
            onPressBlock();
            break;
          case 1:
            onPressReport();
            break;
          default:
        }
      }
    );
  }, [onPressBlock, onPressReport, showActionSheetWithOptions]);

  const listHeaderComponent = (
    <GrayHeader title={`日記一覧(${diaries ? diaries.length : 0}件)`} />
  );

  const renderItem = useCallback(
    ({ item }: { item: Diary }): JSX.Element => {
      return (
        <DiaryListItem
          screenName="teach"
          item={item}
          onPressUser={onPressUser}
          onPressItem={onPressItem}
        />
      );
    },
    [onPressItem, onPressUser]
  );

  return (
    <View style={styles.container}>
      <Report isReport={isReport} closePanel={closePanel} />
      <ProfileHeader
        name={name}
        photoUrl={photoUrl}
        introduction={introduction}
        onPressUser={onPressUser}
        onPressButton={onPressEdit}
      />
      <FlatList
        data={diaries}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        ListEmptyComponent={<EmptyDiary />}
      />
    </View>
  );
};

UserProfileScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  return {
    ...DefaultNavigationOptions,
    title: 'プロフィール',
  };
};

export default connectActionSheet(UserProfileScreen);
