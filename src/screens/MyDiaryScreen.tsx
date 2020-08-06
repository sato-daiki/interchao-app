import React, { useCallback, useState, useEffect, ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Share,
  Linking,
  ActivityIndicator,
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
import { LoadingModal, GrayHeader, Space } from '../components/atoms';
import I18n from '../utils/I18n';
import Sns from '../components/organisms/Sns';
import RichText from '../components/organisms/RichText';

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
  headerTitleStyle: {
    width: Dimensions.get('window').width - 140,
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
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
    paddingBottom: 16,
  },
  textLength: {
    color: subTextColor,
    fontSize: fontSizeS,
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  snsContainer: {
    paddingVertical: 56,
    alignSelf: 'center',
  },
  activityIndicator: {
    marginVertical: 16,
  },
});

/**
 * 日記詳細
 */
const MyDiaryScreen: ScreenType = ({
  navigation,
  profile,
  diary,
  deleteDiary,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [correction, setCorrection] = useState<Correction>();
  const [correction2, setCorrection2] = useState<Correction>();
  const [correction3, setCorrection3] = useState<Correction>();
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrectionLoading, setIsCorrectionLoading] = useState(true);
  const [isModalDelete, setIsModalDelete] = useState(false);

  const url =
    profile.nativeLanguage === 'ja'
      ? 'https://interchao.app/jp/share.html'
      : 'https://interchao.app/en/share.html';
  const shareMessage = encodeURI(url);

  const onPressShare = (): void => {
    Share.share({
      message: `${shareMessage}`,
    });
  };

  const onPressFacebook = (): void => {
    Linking.openURL(
      `https://www.facebook.com/sharer/sharer.php?u=${shareMessage}`
    );
  };

  const onPressTwitter = (): void => {
    Linking.canOpenURL('twitter://post')
      .then(() => {
        Linking.openURL(`twitter://post?message=${shareMessage}`)
          .then(() => undefined)
          .catch((): void => {
            Linking.openURL(`http://twitter.com/share?text=${shareMessage}`);
          });
      })
      .catch(() => undefined);
  };

  const onPressDeleteMenu = useCallback(() => {
    setIsModalDelete(true);
  }, []);

  const onPressMore = useCallback(() => {
    const options = [I18n.t('myDiary.menuDelete'), I18n.t('common.cancel')];
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
      if (diary.correction2) {
        const newCorrection = await getCorrection(diary.correction2.id);
        if (newCorrection) {
          setCorrection2(newCorrection);
        }
      }
      if (diary.correction3) {
        const newCorrection = await getCorrection(diary.correction3.id);
        if (newCorrection) {
          setCorrection3(newCorrection);
        }
      }
      setIsCorrectionLoading(false);
    };
    f();
  }, [diary]);

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

  const { createdAt, title, text, isReview, isReview2, isReview3 } = diary;
  const postDate = getAlgoliaDate(createdAt);

  const renderMyDiaryCorrection = (
    correctedNum: number,
    prmCorrection: Correction,
    prmIsReview: boolean | undefined
  ): ReactNode => {
    return (
      <MyDiaryCorrection
        isReview={prmIsReview}
        nativeLanguage={profile.nativeLanguage}
        correction={prmCorrection}
        onPressUser={(uid): void => {
          navigation.navigate('UserProfile', { uid });
        }}
        onPressReview={(): void => {
          navigation.navigate('Review', {
            objectID: diary.objectID,
            correctedNum,
          });
        }}
      />
    );
  };

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
      <ScrollView style={styles.scrollView}>
        <View style={styles.diaryOriginal}>
          <View style={styles.header}>
            <Text style={styles.postDayText}>{postDate}</Text>
            <MyDiaryStatus diary={diary} />
          </View>
          <RichText
            style={styles.title}
            text={title}
            nativeLanguage={profile.nativeLanguage}
          />
          <RichText
            style={styles.text}
            text={text}
            nativeLanguage={profile.nativeLanguage}
          />
          <Text style={styles.textLength}>
            {I18n.t('postDiaryComponent.textLength')}
            {` ${text.length}`}
          </Text>
        </View>
        {isCorrectionLoading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="small" />
          </View>
        ) : (
          <>
            {correction ? (
              <GrayHeader title={I18n.t('myDiaryCorrection.header')} />
            ) : null}
            {correction
              ? renderMyDiaryCorrection(1, correction, isReview)
              : null}
            {correction2
              ? renderMyDiaryCorrection(2, correction2, isReview2)
              : null}
            {correction3
              ? renderMyDiaryCorrection(3, correction3, isReview3)
              : null}
            <Space size={64} />
            <Sns
              containerStyle={styles.snsContainer}
              onPressShare={onPressShare}
              onPressFacebook={onPressFacebook}
              onPressTwitter={onPressTwitter}
            />
            <Space size={16} />
          </>
        )}
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
    headerTitleStyle: styles.headerTitleStyle,
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
