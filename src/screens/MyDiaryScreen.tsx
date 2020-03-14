import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import firebase from '../constants/firebase';
import { Diary } from '../types';
import DiaryCorrection from '../components/organisms/DiaryCorrection';
import { MyDiaryOriginal } from '../components/molecules';
import { ModalReview, ModalConfirm } from '../components/organisms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { primaryColor } from '../styles/Common';
import ModalEditPublic from '../components/organisms/ModalEditPublic';

interface Props {
  diary: Diary;
  editDiary: (objectID: string, diary: Diary) => void;
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
const MyDiaryScreen: ScreenType = ({
  navigation,
  diary,
  editDiary,
  deleteDiary,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalReview, setIsModalReview] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalPublic, setIsModalPublic] = useState(false);
  const { isReview, correction, proCorrection, isPublic } = diary;

  const onPressDeleteMenu = useCallback(() => {
    setIsModalDelete(true);
  }, []);
  const onPressPublicMenu = useCallback(() => {
    setIsModalPublic(true);
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
            onPressPublicMenu();
            break;
          default:
        }
      }
    );
  }, [onPressDeleteMenu, onPressPublicMenu, showActionSheetWithOptions]);

  useEffect(() => {
    navigation.setParams({
      onPressMore,
      title: diary.title,
    });
  }, [diary.title, onPressMore]);

  const onPressUser = useCallback(() => {}, []);
  const onPressReview = useCallback(() => {
    setIsModalReview(true);
  }, []);

  const onPressSubmitPublic = useCallback(
    (changedIsPublic: boolean) => {
      const f = async (): Promise<void> => {
        setIsLoading(true);
        await firebase
          .firestore()
          .collection('diaries')
          .doc(diary.objectID)
          .update({
            isPublic: changedIsPublic,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        editDiary(diary.objectID!, {
          ...diary,
          isPublic: changedIsPublic,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setIsModalPublic(false);
        setIsLoading(false);
      };
      f();
    },
    [diary.objectID, editDiary]
  );

  const onPressDelete = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!diary.objectID) return;
      setIsLoading(true);
      await firebase
        .firestore()
        .collection('diaries')
        .doc(diary.objectID)
        .delete();
      setIsModalDelete(false);
      // reduxの設定
      deleteDiary(diary.objectID);
      navigation.goBack();
      setIsLoading(false);
    };
    f();
  }, [diary.objectID]);

  return (
    <View style={styles.container}>
      <ModalConfirm
        visible={isModalDelete}
        isLoading={isLoading}
        title="確認"
        message="本当に削除してよろしいでしょうか？"
        mainButtonText="削除する"
        onPressMain={onPressDelete}
        onPressClose={(): void => setIsModalDelete(false)}
      />
      <ModalEditPublic
        visible={isModalPublic}
        isLoading={isLoading}
        isPublic={isPublic}
        onPressSubmit={onPressSubmitPublic}
        onPressClose={(): void => setIsModalPublic(false)}
      />
      {correction ? (
        <ModalReview
          isLoading={isLoading}
          name={correction.profile.name}
          photoUrl={correction.profile.photoUrl}
          visible={isModalReview}
          onPressClose={(): void => setIsModalReview(false)}
        />
      ) : null}
      <ScrollView style={styles.container}>
        <MyDiaryOriginal diary={diary} />
        {correction ? (
          <DiaryCorrection
            isMyDiary
            isReview={isReview}
            correction={correction}
            onPressUser={onPressUser}
            onPressReview={onPressReview}
          />
        ) : null}
        {proCorrection ? (
          <DiaryCorrection
            isMyDiary
            isReview={isReview}
            correction={proCorrection}
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
