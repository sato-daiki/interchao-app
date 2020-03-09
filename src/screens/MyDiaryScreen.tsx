import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import firebase from '../constants/firebase';
import { Diary } from '../types';
import DiaryCorrection from '../components/organisms/DiaryCorrection';
import { DiaryOriginal } from '../components/molecules';
import { ModalReview, ModalConfirm } from '../components/organisms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { primaryColor } from '../styles/Common';

interface Props {
  deleteDiary: (objectID: string) => void;
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
    paddingVertical: 8,
  },
});

/**
 * 日記詳細
 */
const MyDiaryScreen: ScreenType = ({ navigation, deleteDiary }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [isModalReview, setIsModalReview] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const { item }: { item: Diary } = navigation.state.params!;

  const onPressDeleteMenu = useCallback(() => {
    setIsModalDelete(true);
  }, []);
  const onPressEditPublicMenu = useCallback(() => {
    setIsModalEdit(true);
  }, []);

  const onPressMore = useCallback(() => {
    const options = ['削除する', '公開設定を変更する', 'キャンセル'];
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: 0,
        cancelButtonIndex: 2,
      },
      index => {
        switch (index) {
          case 0:
            onPressDeleteMenu();
            break;
          case 1:
            onPressEditPublicMenu();
            break;
          default:
        }
      }
    );
  }, [onPressDeleteMenu, onPressEditPublicMenu, showActionSheetWithOptions]);

  useEffect(() => {
    navigation.setParams({
      onPressMore,
      title: item.title,
    });
  }, [item.title, onPressMore]);

  const onPressUser = useCallback(() => {}, []);
  const onPressReview = useCallback(() => {
    setIsModalReview(true);
  }, []);

  const onPressDelete = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!item.objectID) return;
      await firebase
        .firestore()
        .collection('diaries')
        .doc(item.objectID)
        .delete();
      setIsModalDelete(false);

      // reduxの設定
      deleteDiary(item.objectID);
      navigation.goBack();
    };
    f();
  }, [item.objectID]);

  // const { item } = navigation.state.params!;
  const { isReview, correction } = item;
  return (
    <View style={styles.container}>
      <ModalConfirm
        visible={isModalDelete}
        title="確認"
        message="本当に削除してよろしいでしょうか？"
        mainButtonText="削除する"
        onPressMain={onPressDelete}
        onPressClose={(): void => setIsModalDelete(false)}
      />
      {correction ? (
        <ModalReview
          name={correction.profile.name}
          photoUrl={correction.profile.photoUrl}
          visible={isModalReview}
          onPressClose={(): void => setIsModalReview(false)}
        />
      ) : null}
      <ScrollView style={styles.container}>
        <DiaryOriginal diary={item} />
        {correction ? (
          <DiaryCorrection
            isMyDiary
            isReview={isReview}
            correction={correction}
            onPressUser={onPressUser}
            onPressReview={onPressReview}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

MyDiaryScreen.navigationOptions = ({ navigation }): NavigationStackOptions => {
  const onPressMore = navigation.getParam('onPressMore');
  const title = navigation.getParam('title');
  return {
    ...DefaultNavigationOptions,
    title,
    headerRight: (): JSX.Element => (
      <MaterialCommunityIcons
        size={28}
        color={primaryColor}
        name="dots-horizontal"
        onPress={onPressMore}
      />
    ),
  };
};

export default connectActionSheet(MyDiaryScreen);
