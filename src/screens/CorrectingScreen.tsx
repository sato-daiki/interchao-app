import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Platform,
} from 'react-native';
import { split } from 'sentence-splitter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import {
  HeaderText,
  HeaderButton,
  LoadingModal,
  Space,
} from '../components/atoms';
import { CorrectingHeader, KeyboardHideButton } from '../components/molecules';
import ModalCorrectingDone from '../components/organisms/ModalCorrectingDone';
import ModalTimeUp from '../components/organisms/ModalTimeUp';

import { User, Diary, Profile, Correction, TextInfo, Diff } from '../types';
import I18n from '../utils/I18n';
import { getUsePoints } from '../utils/diary';
import { getProfile } from '../utils/profile';
import { updateDone, onUpdateTimeUp, onClose } from '../utils/correcting';
import { getCorrection } from '../utils/corrections';
import CorrectingListItem from '../components/organisms/CorrectingListItem';
import { mainColor } from '../styles/Common';
import Corrections from '../components/organisms/Corrections';
import { ModalConfirm } from '../components/organisms';
import CorrectingSummaryNative from '../components/organisms/CorrectingSummaryNative';
import CorrectingSummaryWeb from '../components/organisms/CorrectingSummaryWeb';
import {
  ModalCorrectingStackNavigationProp,
  ModalCorrectingStackParamList,
} from '../navigations/ModalNavigator';

export interface Props {
  user: User;
  currentProfile: Profile;
  teachDiary?: Diary;
}

interface DispatchProps {
  setUser: (user: User) => void;
  editTeachDiary: (objectID: string, diary: Diary) => void;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalCorrectingStackParamList, 'Correcting'>,
  ModalCorrectingStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
} & Props &
  DispatchProps;

type Info =
  | {
      fix: string | null;
      diffs: Diff[] | null;
    }
  | {
      detail: string | null;
    };

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  scrollView: {
    paddingBottom: 32,
  },
  header: {
    paddingTop: 16,
  },
});

/**
 * 添削中
 */
const CorrectingScreen: React.FC<ScreenType> = ({
  navigation,
  user,
  currentProfile,
  teachDiary,
  setUser,
  editTeachDiary,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // keyboardはshowはKeyboardのaddListenerで管理し、HideはTextInputのendeditingで管理
  const [isKeyboard, setIsKeyboard] = useState(false);

  // Profile関連
  const [targetProfile, setTargetProfile] = useState<Profile>();
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isCorrectionLoading, setIsCorrectionLoading] = useState(true);
  const [correction, setCorrection] = useState<Correction>();
  const [correction2, setCorrection2] = useState<Correction>();

  const [isModalDone, setIsModalDone] = useState(false); // 投稿完了後のアラートモーダル
  const [isModalTimeUp, setIsModalTimeUp] = useState(false); // タイムアップモーダル
  const [isModalConfirmation, setIsModalConfirmation] = useState(false); // 閉じる押した時
  const [isModalNoComment, setIsModalNoComment] = useState(false); // コメントがない場合のアラート

  /* 総評関連 */
  const [summary, setSummary] = useState(''); // まとめ

  /* テキストの情報 */
  const [textInfos, setTextInfos] = useState<TextInfo[]>([]); // まとめ

  /* 一つでも修正したらたつフラグ */
  const [isFirstEdit, setIsFirstEdit] = useState(false);

  const initTextsInfo = useCallback((): void => {
    if (!teachDiary) return;
    const splitTexts = split(teachDiary.text);
    const newTextInfos = splitTexts
      .filter(i => i.raw.trim().length > 0)
      .map((item, index) => {
        return {
          rowNumber: index,
          original: item.raw,
          fix: null,
          detail: null,
          diffs: null,
        };
      });
    setTextInfos(newTextInfos);
  }, [teachDiary]);

  /**
   * 閉じる処理
   */
  const close = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isLoading) return;
      setIsLoading(true);
      await onClose(
        isLoading,
        teachDiary,
        setIsLoading,
        user,
        editTeachDiary,
        setUser,
        navigation
      );
      setIsLoading(false);
      setIsModalConfirmation(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 完了する
   */
  const onPressSubmitButton = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!teachDiary) return;
      const comments = textInfos.filter(item => item.diffs !== null);
      if (comments.length === 0) {
        setIsModalNoComment(true);
        return;
      }
      if (isLoading) return;
      setIsLoading(true);

      await updateDone({
        summary,
        teachDiary,
        currentProfile,
        user,
        comments,
        editTeachDiary,
        setUser,
      });

      setIsLoading(false);
      setIsModalDone(true);
    };
    f();
  }, [
    textInfos,
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
    setIsModalConfirmation(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * ヘッダーに初期値設定
   */
  useEffect(() => {
    navigation.setOptions({
      headerLeft: (): JSX.Element => (
        <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />
      ),
      headerRight: (): JSX.Element | null =>
        isFirstEdit ? (
          <HeaderButton
            title={I18n.t('correcting.titleDone')}
            color={mainColor}
            onPress={onPressSubmitButton}
          />
        ) : null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstEdit, onPressSubmitButton]);

  /*
   * 添削完了
   */
  const onPressCloseDone = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'TeachDiaryTab',
      params: { screen: 'TeachDiaryList' },
    });
    setIsModalDone(false);
  }, [navigation]);

  /**
   * 30分が経過した時の処理
   */
  const onTimeUp = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!teachDiary) return;
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
    navigation.navigate('Home', {
      screen: 'TeachDiaryTab',
      params: { screen: 'TeachDiaryList' },
    });
  }, [navigation]);

  /* キーボード閉じる */
  const onHideKeyboard = (): void => {
    setIsKeyboard(false);
  };

  const editText = useCallback(
    (index: number, info: Info): void => {
      const newTextInfos = textInfos.map(item => {
        if (item.rowNumber === index) {
          return {
            ...item,
            ...info,
          };
        }
        return item;
      });
      setTextInfos(newTextInfos);
    },
    [textInfos]
  );

  if (!teachDiary) {
    return null;
  }

  const getPoints = getUsePoints(
    teachDiary.text.length,
    teachDiary.profile.learnLanguage
  );

  type RenderItemProps = { item: TextInfo; index: number };
  const renderItem = ({ item, index }: RenderItemProps): JSX.Element => {
    return (
      <CorrectingListItem
        item={item}
        editText={(info: Info): void => editText(index, info)}
        editFirst={(): void => setIsFirstEdit(true)}
        onHideKeyboard={onHideKeyboard}
      />
    );
  };

  const listHeaderComponent = (
    <View style={styles.header}>
      <CorrectingHeader
        isProfileLoading={isProfileLoading}
        teachDiary={teachDiary}
        targetProfile={targetProfile}
        onTimeUp={onTimeUp}
      />
    </View>
  );

  const renderSummary = (): JSX.Element | null => {
    if (!isFirstEdit) return null;

    if (Platform.OS === 'web') {
      return (
        <CorrectingSummaryWeb
          summary={summary}
          onHideKeyboard={onHideKeyboard}
          onChangeText={(text: string): void => setSummary(text)}
        />
      );
    }

    return (
      <CorrectingSummaryNative
        summary={summary}
        onHideKeyboard={onHideKeyboard}
        onChangeText={(text: string): void => setSummary(text)}
      />
    );
  };

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
        <ModalConfirm
          visible={isModalConfirmation}
          isLoading={isLoading}
          title={I18n.t('common.confirmation')}
          message={I18n.t('correcting.deleteAlert')}
          mainButtonText="OK"
          onPressMain={async (): Promise<void> => {
            await close();
          }}
          onPressClose={(): void => setIsModalConfirmation(false)}
        />
        <ModalConfirm
          visible={isModalNoComment}
          title={I18n.t('common.error')}
          message={I18n.t('correcting.nothing')}
          mainButtonText={I18n.t('common.close')}
          onPressMain={(): void => setIsModalNoComment(false)}
        />
        <KeyboardAwareScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={32}
        >
          <FlatList
            data={textInfos}
            keyExtractor={(item: TextInfo): string => String(item.rowNumber)}
            renderItem={renderItem}
            ListHeaderComponent={listHeaderComponent}
          />
          {renderSummary()}
          {correction ? <Space size={32} /> : null}
          <Corrections
            isLoading={isCorrectionLoading}
            headerTitle={I18n.t('correcting.header')}
            correction={correction}
            correction2={correction2}
            textLanguage={teachDiary.profile.learnLanguage}
            nativeLanguage={currentProfile.nativeLanguage}
          />
          <Space size={32} />
        </KeyboardAwareScrollView>
      </View>
      <KeyboardHideButton
        isKeyboard={isKeyboard}
        setIsKeyboard={setIsKeyboard}
      />
    </SafeAreaView>
  );
};

export default CorrectingScreen;
