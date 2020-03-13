import React, { useCallback, useState, useEffect, ReactNode } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from '../constants/firebase';
import { Diary, User } from '../types';
import DiaryCorrection from '../components/organisms/DiaryCorrection';
import { DiaryOriginal } from '../components/molecules';
import { ModalAlertCorrection } from '../components/organisms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { LoadingModal, SubmitButton } from '../components/atoms';

interface Props {
  user: User;
  teachDiary: Diary;
  editTeachDiary: (objectID: string, diary: Diary) => void;
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
  correctionButton: {
    padding: 16,
  },
});

/**
 * 日記詳細
 */
const TeachDiaryScreen: ScreenType = ({
  user,
  navigation,
  teachDiary,
  editTeachDiary,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalCorrection, setIsModalCorrection] = useState(false);
  const {
    isReview,
    correction,
    correctionStatus,
    proCorrection,
    isPublic,
  } = teachDiary;
  const { confirmCorrection } = user;

  useEffect(() => {
    navigation.setParams({
      title: teachDiary.title,
    });
  }, []);

  const onPressSubmitCorrection = useCallback(
    checked => {
      const f = async (): Promise<void> => {
        setIsLoading(true);
        if (checked) {
          // TODO: 添削中かどうかのチェック

          // 以後添削モーダルを表示しないようにする
          const userRef = firebase
            .firestore()
            .collection('users')
            .doc(user.uid);
          await userRef.update({
            confirmCorrection: true,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }

        // 日記のステータスを添削中に変更する
        const diaryRef = firebase
          .firestore()
          .collection('diaries')
          .doc(teachDiary.objectID);
        await diaryRef.update({
          correctionStatus: 'doing',
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        editTeachDiary(teachDiary.objectID!, {
          ...teachDiary,
          correctionStatus: 'doing',
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        navigation.navigate('CorrectinDoing', { teachDiary });
        setIsLoading(false);
        setIsModalCorrection(false);
      };
      f();
    },
    [editTeachDiary, navigation, teachDiary, user.uid]
  );

  const onPressCorrection = useCallback(() => {
    // 添削モーダルはチェックを入れると２回目以降表示されなくなる
    if (confirmCorrection) {
      onPressSubmitCorrection(false);
    } else {
      setIsModalCorrection(true);
    }
  }, [confirmCorrection, onPressSubmitCorrection]);

  const onPressUser = useCallback(() => {}, []);

  const renderDiaryCorrection = (): ReactNode => {
    if (correctionStatus === 'yet') {
      return (
        <View style={styles.correctionButton}>
          <SubmitButton
            isLoading={isLoading}
            title="添削する"
            onPress={(): void => setIsModalCorrection(true)}
          />
        </View>
      );
    }
    if (correction) {
      return (
        <DiaryCorrection
          isMyDiary
          isReview={isReview}
          correction={correction}
          onPressUser={onPressUser}
          onPressCorrection={onPressCorrection}
        />
      );
    }
    return null;
  };

  const renderProDiaryCorrection = (): ReactNode => {
    if (proCorrection) {
      return (
        <DiaryCorrection
          isMyDiary
          isReview={isReview}
          correction={proCorrection}
          onPressUser={onPressUser}
          onPressCorrection={onPressCorrection}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <ModalAlertCorrection
        visible={isModalCorrection}
        isLoading={isLoading}
        onPressSubmit={onPressSubmitCorrection}
        onPressClose={(): void => setIsModalCorrection(false)}
      />
      <ScrollView style={styles.container}>
        <DiaryOriginal diary={teachDiary} />
        {renderDiaryCorrection()}
        {renderProDiaryCorrection()}
      </ScrollView>
    </View>
  );
};

TeachDiaryScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const title = navigation.getParam('title');
  return {
    ...DefaultNavigationOptions,
    title,
  };
};

export default TeachDiaryScreen;
