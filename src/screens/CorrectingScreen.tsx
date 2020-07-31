import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  SafeAreaView,
  Platform,
  FlatList,
} from 'react-native';
import { split, Syntax } from 'sentence-splitter';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HeaderText, HeaderButton, LoadingModal } from '../components/atoms';
import { CorrectingHeader } from '../components/molecules';
import ModalCorrectingDone from '../components/organisms/ModalCorrectingDone';
import ModalTimeUp from '../components/organisms/ModalTimeUp';

import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { User, Diary, Profile, Correction, TextInfo } from '../types';
import I18n from '../utils/I18n';
import { getUsePoints } from '../utils/diary';
import { getProfile } from '../utils/profile';
import { updateDone, onUpdateTimeUp, onClose } from '../utils/correcting';
import { getCorrection } from '../utils/corrections';
import Corrections from '../components/organisms/Corrections';
import CorrectingListItem from '../components/organisms/CorrectingListItem';
import { mainColor } from '../styles/Common';

type RightButtonState = 'comment' | 'summary' | 'done' | 'nothing';

export interface Props {
  user: User;
  currentProfile: Profile;
  teachDiary: Diary;
}

interface DispatchProps {
  setUser: (user: User) => void;
  editTeachDiary: (objectID: string, diary: Diary) => void;
}

type ScreenType = React.ComponentType<
  Props & DispatchProps & NavigationStackScreenProps
> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingTop: 16,
  },
  main: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#FFF',
  },
  commentCard: {
    marginHorizontal: 16,
  },
  headerLeft: {
    paddingLeft: Platform.OS === 'android' ? 16 : 0,
  },
});

/**
 * 添削中
 */
const CorrectingScreen: ScreenType = ({
  navigation,
  user,
  currentProfile,
  teachDiary,
  setUser,
  editTeachDiary,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalTutorialCorrectiong, setIsModalTutorialCorrectiong] = useState(
    false
  );

  // Profile関連
  const [targetProfile, setTargetProfile] = useState<Profile>();
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isCorrectionLoading, setIsCorrectionLoading] = useState(true);
  const [correction, setCorrection] = useState<Correction>();
  const [correction2, setCorrection2] = useState<Correction>();

  const [isModalDone, setIsModalDone] = useState(false); // 投稿完了後のアラートモーダル
  const [isModalTimeUp, setIsModalTimeUp] = useState(false); // タイムアップモーダル

  /* 右上と画面下のボタン関連 */
  const [state, setState] = useState<RightButtonState>('nothing'); // 状態推移

  /* 総評関連 */
  const [summary, setSummary] = useState(''); // まとめ
  const [isSummary, setIsSummary] = useState(false); // 総評の追加のon/offフラグ

  /* テキストの情報 */
  const [textInfos, setTextInfos] = useState<TextInfo[]>([]); // まとめ

  /* 一つでも修正したらたつフラグ */
  const [isEdit, setIsEdit] = useState(false);

  const initTextsInfo = () => {
    const splitTexts = split(teachDiary.text);
    const newTextInfos = splitTexts.map((item, index) => {
      return {
        rowNumber: index,
        original: item.raw,
        fix: null,
        detail: null,
        diff: null,
      };
    });
    setTextInfos(newTextInfos);
  };
  /**
   * 閉じる処理
   */
  const close = useCallback(() => {
    const f = async (): Promise<void> => {
      await onClose(
        isLoading,
        teachDiary,
        setIsLoading,
        user,
        editTeachDiary,
        setUser,
        navigation
      );
    };
    f();
  }, [editTeachDiary, isLoading, navigation, setUser, teachDiary, user]);

  const getNewProfile = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!teachDiary) return;
      const newProfile = await getProfile(teachDiary.profile.uid);
      if (newProfile) {
        setTargetProfile(newProfile);
      }
      console.log('setIsProfileLoading');
      setIsProfileLoading(false);
    };
    f();
  }, [teachDiary]);

  const getNewCorrection = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!teachDiary) return;
      if (teachDiary.correction) {
        const newCorrection = await getCorrection(teachDiary.correction.id);
        if (newCorrection) {
          setCorrection(newCorrection);
        }
      }
      if (teachDiary.correction2) {
        const newCorrection = await getCorrection(teachDiary.correction2.id);
        if (newCorrection) {
          setCorrection2(newCorrection);
        }
      }
      setIsCorrectionLoading(false);
    };
    f();
  }, [teachDiary]);

  useEffect(() => {
    const f = async (): Promise<void> => {
      initTextsInfo();
      // プロフィールを取得
      await Promise.all([getNewProfile(), getNewCorrection()]);
    };
    f();
  }, [getNewCorrection, getNewProfile]);

  /**
   * 総評ボタンを追加する
   */
  const onAddSummary = useCallback(() => {
    setIsSummary(true);
  }, []);

  /**
   * 完了する
   */
  const onPressSubmitButton = useCallback(() => {
    const f = async (): Promise<void> => {
      const comments = textInfos.filter(item => !!item.diff);

      if (comments.length === 0) {
        Alert.alert('', I18n.t('common.nothing'));
        return;
      }

      await updateDone({
        isLoading,
        summary,
        teachDiary,
        currentProfile,
        user,
        comments,
        setIsLoading,
        setIsModalDone,
        editTeachDiary,
        setUser,
      });
    };
    f();
  }, [
    teachDiary,
    isLoading,
    currentProfile,
    user,
    summary,
    editTeachDiary,
    setUser,
  ]);

  /**
   * 左上の閉じるボタンが押下された時の処理
   */
  const onPressClose = useCallback(() => {
    Alert.alert(
      I18n.t('common.confirmation'),
      I18n.t('correcting.deleteAlert'),
      [
        {
          text: I18n.t('common.cancel'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async (): Promise<void> => {
            await close();
          },
        },
      ],
      { cancelable: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * ヘッダーに初期値設定
   */
  useEffect(() => {
    navigation.setParams({
      onPressClose,
      onPressSubmitButton,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
   * 添削完了
   */
  const onPressCloseDone = useCallback(() => {
    navigation.navigate('TeachDiaryList');
    setIsModalDone(false);
  }, [navigation]);

  /**
   * 30分が経過した時の処理
   */
  const onTimeUp = useCallback(() => {
    const f = async (): Promise<void> => {
      await onUpdateTimeUp(
        teachDiary,
        user,
        setIsLoading,
        editTeachDiary,
        setUser,
        setIsModalTimeUp
      );
    };
    f();
  }, [editTeachDiary, setUser, teachDiary, user]);

  /**
   * タイムアップ後のアラート画面での遷移
   */
  const onPressCloseTimeUp = useCallback(() => {
    navigation.navigate('TeachDiaryList');
  }, [navigation]);

  const getPoints = getUsePoints(
    teachDiary.text.length,
    teachDiary.profile.learnLanguage
  );

  const editText = (index: number, textInfo: TextInfo) => {
    const newTextInfos = textInfos.map(item => {
      if (item.rowNumber !== index) {
        return item;
      }
      return textInfo;
    });
    setTextInfos(newTextInfos);
  };

  const renderItem = useCallback(
    ({ item, index }: { item: TextInfo; index: number }): JSX.Element => {
      return (
        <CorrectingListItem
          item={item}
          editText={(textInfo: TextInfo) => editText(index, textInfo)}
          editFirst={() => setIsEdit(true)}
        />
      );
    },
    []
  );

  const listHeaderComponent = useCallback(() => {
    return (
      <View style={styles.header}>
        <CorrectingHeader
          isProfileLoading={isProfileLoading}
          teachDiary={teachDiary}
          targetProfile={targetProfile}
          onTimeUp={onTimeUp}
        />
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <LoadingModal visible={isLoading} />
        <ModalTimeUp
          visible={isModalTimeUp}
          onPressClose={onPressCloseTimeUp}
        />
        <ModalCorrectingDone
          visible={isModalDone}
          getPoints={getPoints}
          points={user.points}
          onPressClose={onPressCloseDone}
        />
        <KeyboardAwareScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={32}
        >
          <FlatList
            data={textInfos}
            keyExtractor={(item: TextInfo): string => String(item.rowNumber)}
            renderItem={renderItem}
            ListHeaderComponent={listHeaderComponent}
          />
          {/* TODO　他の人の修正 */}
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

CorrectingScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const isEdit = navigation.getParam('isEdit');
  const onPressSubmitButton = navigation.getParam('onPressSubmitButton');
  const onPressClose = navigation.getParam('onPressClose');
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('correcting.headerTitle'),
    headerLeft: (): JSX.Element => (
      <HeaderText
        containerStyle={styles.headerLeft}
        title={I18n.t('common.close')}
        onPress={onPressClose}
      />
    ),
    headerRight: (): JSX.Element | null =>
      isEdit ? (
        <HeaderButton
          title={I18n.t('correcting.titleDone')}
          color={mainColor}
          onPress={onPressSubmitButton}
        />
      ) : null,
  };
};

export default connectActionSheet(CorrectingScreen);
