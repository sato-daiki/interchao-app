import React, { useCallback, useState, useEffect, ReactNode } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from '../constants/firebase';
import { Diary, User } from '../types';
import DiaryCorrection from '../components/organisms/DiaryCorrection';
import { TeachDiaryOriginal, UserDiaryStatus } from '../components/molecules';
import { ModalAlertCorrection } from '../components/organisms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import {
  LoadingModal,
  SubmitButton,
  ProfileIconHorizontal,
  Space,
} from '../components/atoms';
import { getPostDay } from '../utils/diary';
import {
  subTextColor,
  fontSizeS,
  primaryColor,
  fontSizeM,
} from '../styles/Common';

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
    paddingVertical: 16,
  },
  correctionButton: {
    padding: 16,
  },
  main: {
    paddingHorizontal: 16,
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
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 32,
    lineHeight: fontSizeM * 1.3,
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
        // setIsLoading(true);
        // if (checked) {
        //   // TODO: 添削中かどうかのチェック

        //   // 以後添削モーダルを表示しないようにする
        //   const userRef = firebase
        //     .firestore()
        //     .collection('users')
        //     .doc(user.uid);
        //   await userRef.update({
        //     confirmCorrection: true,
        //     updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        //   });
        // }

        // // 日記のステータスを添削中に変更する
        // const diaryRef = firebase
        //   .firestore()
        //   .collection('diaries')
        //   .doc(teachDiary.objectID);
        // await diaryRef.update({
        //   correctionStatus: 'doing',
        //   updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        // });

        // editTeachDiary(teachDiary.objectID!, {
        //   ...teachDiary,
        //   correctionStatus: 'doing',
        //   updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        // });

        navigation.navigate('Correcting', { objectID: teachDiary.objectID });
        // setIsLoading(false);
        // setIsModalCorrection(false);
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

  const { createdAt, title, text, profile } = teachDiary;
  const { userName, photoUrl } = profile;
  const postDay = getPostDay(createdAt);
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
        <View style={styles.main}>
          <ProfileIconHorizontal
            userName={userName}
            photoUrl={photoUrl}
            onPress={onPressUser}
          />
          <Space size={8} />
          <View style={styles.header}>
            <Text style={styles.postDayText}>{postDay}</Text>
            <UserDiaryStatus diary={teachDiary} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
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
