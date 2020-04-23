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
import { Diary, Profile } from '../types';
import MyDiaryCorrection from '../components/organisms/MyDiaryCorrection';
import { MyDiaryStatus } from '../components/molecules';
import { ModalConfirm } from '../components/organisms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import {
  primaryColor,
  subTextColor,
  fontSizeM,
  fontSizeS,
} from '../styles/Common';
import { getAlgoliaDate } from '../utils/diary';
import { Correction } from '../types/correction';
import { getCorrection } from '../utils/corrections';
import { LoadingModal } from '../components/atoms';
import I18n from '../utils/I18n';

export interface Props {
  diary?: Diary;
  profile: Profile;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
  deleteDiary: (objectID: string) => void;
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
  // editDiary,
  deleteDiary,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [correction, setCorrection] = useState<Correction>();
  // const [proCorrection, setProCorrection] = useState<Correction>();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalDelete, setIsModalDelete] = useState(false);
  // const [isModalPublic, setIsModalPublic] = useState(false);

  const onPressDeleteMenu = useCallback(() => {
    setIsModalDelete(true);
  }, []);
  // const onPressPublicMenu = useCallback(() => {
  //   setIsModalPublic(true);
  // }, []);

  const onPressMore = useCallback(() => {
    const options = [
      I18n.t('myDiary.menuDelete'),
      // I18n.t('myDiary.menuChangePublic'),
      I18n.t('common.cancel'),
    ];
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
          // case 1:
          //   onPressPublicMenu();
          //   break;
          default:
        }
      }
    );
  }, [onPressDeleteMenu, showActionSheetWithOptions]);

  useEffect(() => {
    navigation.setParams({
      onPressMore,
      title: diary ? diary.title : '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diary]);

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (!diary) return;
      // 添削がある場合データを取得

      if (diary.correction) {
        const newCorrection = await getCorrection(diary.correction.id);
        if (newCorrection) {
          setCorrection(newCorrection);
        }
      }
      // if (diary.proCorrection) {
      //   const newProCorrection = await getCorrection(diary.proCorrection.id);
      //   if (newProCorrection) {
      //     setProCorrection(newProCorrection);
      //   }
      // }
      setIsLoading(false);
    };
    f();
  }, [diary]);

  // const onPressSubmitPublic = useCallback(
  //   (changedIsPublic: boolean) => {
  //     const f = async (): Promise<void> => {
  //       if (!diary || !diary.objectID) return;
  //       if (isLoading) return;
  //       setIsLoading(true);
  //       await firebase
  //         .firestore()
  //         .collection('diaries')
  //         .doc(diary.objectID)
  //         .update({
  //           isPublic: changedIsPublic,
  //           updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  //         });
  //       editDiary(diary.objectID, {
  //         ...diary,
  //         isPublic: changedIsPublic,
  //       });
  //       setIsModalPublic(false);
  //       setIsLoading(false);
  //     };
  //     f();
  //   },
  //   [diary, editDiary, isLoading]
  // );

  const onPressDelete = useCallback(() => {
    if (!diary || !diary.objectID) return;
    setIsLoading(true);
    firebase
      .firestore()
      .collection('diaries')
      .doc(diary.objectID)
      .delete();
    setIsModalDelete(false);
    // reduxの設定
    deleteDiary(diary.objectID);
    navigation.goBack();
    setIsLoading(false);
  }, [deleteDiary, diary, navigation]);

  if (!diary) {
    return null;
  }

  const { createdAt, title, text, isReview } = diary;
  const postDate = getAlgoliaDate(createdAt);
  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <ModalConfirm
        visible={isModalDelete}
        isLoading={isLoading}
        title={I18n.t('common.confirmation')}
        message={I18n.t('myDiary.confirmMessage')}
        mainButtonText={I18n.t('myDiary.menuDelete')}
        onPressMain={onPressDelete}
        onPressClose={(): void => setIsModalDelete(false)}
      />
      {/* <ModalEditPublic
        visible={isModalPublic}
        isLoading={isLoading}
        isPublic={isPublic}
        onPressSubmit={onPressSubmitPublic}
        onPressClose={(): void => setIsModalPublic(false)}
      /> */}
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
            onPressReview={(): void => {
              navigation.navigate('Review', { objectID: diary.objectID });
            }}
          />
        ) : null}
        {/* {proCorrection ? (
          <MyDiaryCorrection
            isReview={isReview}
            correction={proCorrection}
            onPressUser={(uid): void => {
              navigation.navigate('UserProfile', { uid });
            }}
            onPressReview={(): void => {
              navigation.navigate('Review');
            }}
          />
        ) : null} */}
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
