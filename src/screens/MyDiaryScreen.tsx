import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
import { Diary, Review, Profile } from '../types';
import MyDiaryCorrection from '../components/organisms/MyDiaryCorrection';
import { MyDiaryStatus } from '../components/molecules';
import { ModalReview, ModalConfirm } from '../components/organisms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import {
  primaryColor,
  subTextColor,
  fontSizeM,
  fontSizeS,
} from '../styles/Common';
import ModalEditPublic from '../components/organisms/ModalEditPublic';
import { getPostDate } from '../utils/diary';

interface Props {
  diary: Diary;
  profile: Profile;
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
  diaryOriginal: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  postDayText: {
    color: subTextColor,
    fontSize: fontSizeS,
  },
  title: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
    paddingBottom: 16,
  },
  text: {
    lineHeight: fontSizeM * 1.3,
    fontSize: fontSizeM,
    color: primaryColor,
  },
  scrollView: {
    flex: 1,
  },
});

/**
 * 日記詳細
 */
const MyDiaryScreen: ScreenType = ({
  navigation,
  diary,
  profile,
  editDiary,
  deleteDiary,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessReview, setiISuccessReview] = useState(false);
  const [isModalReview, setIsModalReview] = useState(false);
  const [isModalReviewPro, setIsModalReviewPro] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalPublic, setIsModalPublic] = useState(false);
  const {
    createdAt,
    title,
    text,
    isReview,
    correction,
    proCorrection,
    isPublic,
  } = diary;

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
    [diary, editDiary]
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
  }, [deleteDiary, diary.objectID, navigation]);

  const onPressSubmitReview = useCallback(
    (rating: number, comment: string): void => {
      const f = async (): Promise<void> => {
        if (!diary.objectID) return;
        setIsLoading(true);
        const refDiary = firebase.firestore().doc(`diaries/${diary.objectID}`);
        await refDiary.update({
          isReview: true,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        const { currentUser } = firebase.auth();
        if (!currentUser || !diary.correction) {
          return;
        }

        const newReview = {
          reviewer: {
            uid: profile.uid,
            userName: profile.userName,
            photoUrl: profile.photoUrl,
          },
          revieweeUid: diary.correction.profile.uid,
          rating,
          comment,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        } as Review;

        await firebase
          .firestore()
          .collection(`reviews`)
          .add(newReview);

        await firebase
          .firestore()
          .collection('diaries')
          .doc(diary.objectID)
          .update({
            isReview: true,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });

        editDiary(diary.objectID, {
          ...diary,
          isReview: true,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        navigation.goBack();
        setIsLoading(false);
        setiISuccessReview(true);
      };
      f();
    },
    []
  );

  const postDate = getPostDate(createdAt);
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
          isSuccess={isSuccessReview}
          userName={correction.profile.userName}
          photoUrl={correction.profile.photoUrl}
          visible={isModalReview}
          onPressSubmit={onPressSubmitReview}
          onPressClose={(): void => setIsModalReview(false)}
        />
      ) : null}
      {proCorrection ? (
        <ModalReview
          isLoading={isLoading}
          isSuccess={isSuccessReview}
          userName={proCorrection.profile.userName}
          photoUrl={proCorrection.profile.photoUrl}
          visible={isModalReviewPro}
          onPressSubmit={onPressSubmitReview}
          onPressClose={(): void => setIsModalReviewPro(false)}
        />
      ) : null}
      <ScrollView style={styles.scrollView}>
        <View style={styles.diaryOriginal}>
          <View style={styles.header}>
            <Text style={styles.postDayText}>{postDate}</Text>
            <MyDiaryStatus diary={diary} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>

        {correction ? (
          <MyDiaryCorrection
            isReview={isReview}
            correction={correction}
            onPressUser={(uid): void => {
              navigation.navigate('UserProfile', { uid });
            }}
            onPressReview={(): void => setIsModalReview(true)}
          />
        ) : null}
        {proCorrection ? (
          <MyDiaryCorrection
            isReview={isReview}
            correction={proCorrection}
            onPressUser={(uid): void => {
              navigation.navigate('UserProfile', { uid });
            }}
            onPressReview={(): void => setIsModalReviewPro(true)}
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
      <TouchableOpacity onPress={onPressMore}>
        <MaterialCommunityIcons
          size={28}
          color={primaryColor}
          name="dots-horizontal"
        />
      </TouchableOpacity>
    ),
  };
};

export default connectActionSheet(MyDiaryScreen);
