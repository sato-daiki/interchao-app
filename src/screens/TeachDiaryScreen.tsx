import React, { useCallback, useState, useEffect, ReactNode } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import firebase from '../constants/firebase';
import { Diary, User } from '../types';
import TeachDiaryCorrection from '../components/organisms/TeachDiaryCorrection';
import { UserDiaryStatus } from '../components/molecules';
import { ModalAlertCorrection } from '../components/organisms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import {
  LoadingModal,
  SubmitButton,
  ProfileIconHorizontal,
  Space,
} from '../components/atoms';
import { getAlgoliaDate } from '../utils/diary';
import {
  subTextColor,
  fontSizeS,
  primaryColor,
  fontSizeM,
} from '../styles/Common';
import { getCorrection } from '../utils/corrections';
import { Correction } from '../types/correction';
import Algolia from '../utils/Algolia';

interface Props {
  user: User;
  teachDiary: Diary;
  editTeachDiary: (objectID: string, diary: Diary) => void;
  setUser: (user: User) => void;
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
  setUser,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [correction, setCorrection] = useState<Correction>();
  const [proCorrection, setProCorrection] = useState<Correction>();
  const [isModalCorrection, setIsModalCorrection] = useState(false);
  const { correctionStatus, correctionStatusPro } = teachDiary;
  const { confirmCorrection } = user;

  useEffect(() => {
    const f = async (): Promise<void> => {
      // 添削がある場合データを取得
      if (teachDiary.correction) {
        const newCorrection = await getCorrection(teachDiary.correction.id);
        if (newCorrection) {
          setCorrection(newCorrection);
        }
      }
      if (teachDiary.proCorrection) {
        const newProCorrection = await getCorrection(
          teachDiary.proCorrection.id
        );
        if (newProCorrection) {
          setProCorrection(newProCorrection);
        }
      }
      setIsLoading(false);
    };
    f();
  }, [teachDiary.correction, teachDiary.proCorrection]);

  useEffect(() => {
    navigation.setParams({
      title: teachDiary.title,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressSubmitCorrection = useCallback(
    checked => {
      const f = async (): Promise<void> => {
        if (!teachDiary.objectID) return;
        if (isLoading) return;
        setIsLoading(true);

        // 他の人が添削を開始していないかチェックする
        const index = await Algolia.getDiaryIndex(true);
        await Algolia.setSettings(index);
        const res = await index.search('', {
          filters: `objectID: ${teachDiary.objectID} AND correctionStatus: yet`,
          page: 0,
          hitsPerPage: 1,
        });

        if (res.nbHits !== 1) {
          Alert.alert(
            'エラー',
            'この日記は他の人が添削を始めました。他の日記を再度検索ください'
          );
          setIsLoading(false);
          return;
        }

        // 以後メッセージを表示しないにチェックが入っている時の処理
        if (checked) {
          const userRef = firebase.firestore().doc(`users/${user.uid}`);
          await userRef.update({
            confirmCorrection: true,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
          setUser({
            ...user,
            confirmCorrection: true,
          });
        }

        // // 日記のステータスを添削中に変更する
        const diaryRef = firebase
          .firestore()
          .doc(`diaries/${teachDiary.objectID}`);
        await diaryRef.update({
          correctionStatus: 'doing',
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        editTeachDiary(teachDiary.objectID, {
          ...teachDiary,
          correctionStatus: 'doing',
        });

        navigation.navigate('Correcting', { objectID: teachDiary.objectID });
        setIsLoading(false);
        setIsModalCorrection(false);
      };
      f();
    },
    [editTeachDiary, isLoading, navigation, setUser, teachDiary, user]
  );

  const onPressCorrection = useCallback(() => {
    // 添削モーダルはチェックを入れると２回目以降表示されなくなる
    if (confirmCorrection) {
      onPressSubmitCorrection(false);
    } else {
      setIsModalCorrection(true);
    }
  }, [confirmCorrection, onPressSubmitCorrection]);

  const onPressUser = useCallback(
    (uid: string): void => {
      navigation.navigate('UserProfile', { uid });
    },
    [navigation]
  );

  const renderDiaryCorrection = (): ReactNode => {
    if (correctionStatus === 'yet') {
      return (
        <View style={styles.correctionButton}>
          <SubmitButton
            isLoading={isLoading}
            title="添削する"
            onPress={onPressCorrection}
          />
        </View>
      );
    }
    if (correction) {
      return <TeachDiaryCorrection correction={correction} />;
    }
    return null;
  };

  // Proの実装は後回し
  // const renderProDiaryCorrection = (): ReactNode => {
  //   if (correctionStatusPro === 'yet') {
  //     return (
  //       <View style={styles.correctionButton}>
  //         <SubmitButton
  //           isLoading={isLoading}
  //           title="添削する"
  //           onPress={onPressCorrection}
  //         />
  //       </View>
  //     );
  //   }
  //   if (proCorrection) {
  //     return <TeachDiaryCorrection correction={proCorrection} />;
  //   }
  //   return null;
  // };

  const { createdAt, title, text, profile } = teachDiary;
  const { userName, photoUrl, uid } = profile;
  const postDate = getAlgoliaDate(createdAt);
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
            onPress={(): void => onPressUser(uid)}
          />
          <Space size={8} />
          <View style={styles.header}>
            <Text style={styles.postDayText}>{postDate}</Text>
            <UserDiaryStatus diary={teachDiary} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
        {renderDiaryCorrection()}
        {/* {renderProDiaryCorrection()} */}
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
