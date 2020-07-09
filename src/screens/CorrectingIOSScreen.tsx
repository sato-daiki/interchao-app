import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Alert, SafeAreaView, Platform } from 'react-native';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  HeaderText,
  HeaderButton,
  LoadingModal,
  Space,
  SummaryCard,
  GrayHeader,
} from '../components/atoms';
import { CorrectionFooterButton, CommentCard } from '../components/molecules';
import ModalCorrectingDone from '../components/organisms/ModalCorrectingDone';
import ModalTutorialCorrecting from '../components/organisms/ModalTutorialCorrecting';
import ModalTimeUp from '../components/organisms/ModalTimeUp';
import CommentInputCardIOS from '../components/organisms/CommentInputCardIOS';
import SummaryInputCard from '../components/organisms/SummaryInputCard';
import CorrectionOrigin from '../components/organisms/CorrectionOrigin';

import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import {
  User,
  Diary,
  InfoComment,
  Profile,
  Selection,
  Correction,
} from '../types';
import I18n from '../utils/I18n';
import { getUsePoints } from '../utils/diary';
import { getUuid } from '../utils/common';
import { getProfile } from '../utils/profile';
import {
  getStateButtonInfo,
  updateDone,
  onUpdateTimeUp,
  onClose,
} from '../utils/correcting';
import { getCorrection } from '../utils/corrections';
import Corrections from '../components/organisms/Corrections';

type RightButtonState = 'comment' | 'summary' | 'done' | 'nothing';

interface ButtonInfo {
  title: string;
  color: string;
}

export interface PropsIOS {
  user: User;
  currentProfile: Profile;
  teachDiary: Diary;
}

interface DispatchProps {
  setUser: (user: User) => void;
  editTeachDiary: (objectID: string, diary: Diary) => void;
}

type ScreenType = React.ComponentType<
  PropsIOS & DispatchProps & NavigationStackScreenProps
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
const CorrectingIOSScreen: ScreenType = ({
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
  const [buttonInfo, setButtonInfo] = useState<ButtonInfo>(); // ボタン

  /* コメント関連 */
  const [selection, setSelection] = useState<Selection>(); // 選択中の文字の位置
  const [original, setOriginal] = useState(''); // 新規追加時の修正文
  const [correctingSelection, setCorrectingSelection] = useState<Selection>(); // 編集中のselection
  const [isCommentInput, setIsCommentInput] = useState(false); // コメントの追加のon/offフラグ
  const [infoComments, setInfoComments] = useState<InfoComment[]>([]); // コメントをlistデータ

  /* 総評関連 */
  const [summary, setSummary] = useState(''); // まとめ
  const [isSummary, setIsSummary] = useState(false); // 総評の追加のon/offフラグ

  /* 隠す */
  const [hidden1, setHidden1] = useState(false);
  const [hidden2, setHidden2] = useState(false);

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
      // プロフィールを取得
      await Promise.all([getNewProfile(), getNewCorrection()]);
    };
    f();
  }, [getNewCorrection, getNewProfile]);

  /**
   * コメントを追加する
   */
  const onAddComment = useCallback((): void => {
    if (isSummary) {
      Alert.alert('', I18n.t('correcting.summaryAlert'));
      setOriginal('');
      setCorrectingSelection(undefined);
      setIsCommentInput(false);
      return;
    }
    if (!selection) return;
    const newOriginal = teachDiary.text.substring(
      selection.start,
      selection.end
    );

    // 新規コメントを初期化して表示する
    setIsCommentInput(true);
    setOriginal(newOriginal);
    setCorrectingSelection(selection);
  }, [isSummary, selection, teachDiary.text]);

  /**
   * 総評ボタンを追加する
   */
  const onAddSummary = useCallback(() => {
    setIsSummary(true);
  }, []);

  /**
   * 完了する
   */
  const onDone = useCallback(() => {
    const f = async (): Promise<void> => {
      await updateDone({
        isLoading,
        summary,
        teachDiary,
        currentProfile,
        user,
        infoComments,
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
    infoComments,
    user,
    summary,
    editTeachDiary,
    setUser,
  ]);

  /**
   * 右上or画面下のボタンが押下された時の処理
   */
  const onPressSubmitButton = useCallback((): void => {
    if (state === 'comment') {
      onAddComment();
    } else if (state === 'summary') {
      onAddSummary();
    } else if (state === 'done') {
      onDone();
    }
  }, [onAddComment, onAddSummary, onDone, state]);

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
   * 添削の状態を変更させていく
   */
  useEffect(() => {
    let newState = 'nothing' as RightButtonState;

    if (selection && selection.start !== selection.end && !isCommentInput) {
      newState = 'comment';
    } else if (
      !isSummary &&
      !isCommentInput &&
      infoComments.length > 0 &&
      summary.length === 0
    ) {
      newState = 'summary';
    } else if (
      summary.length > 0 &&
      infoComments.length > 0 &&
      !isSummary &&
      !isCommentInput
    ) {
      newState = 'done';
    }

    const newButtonInfo = getStateButtonInfo(newState);
    setState(newState);
    setButtonInfo(newButtonInfo);
  }, [
    isSummary,
    isCommentInput,
    summary.length,
    infoComments.length,
    selection,
  ]);

  /**
   * ヘッダーに初期値設定
   */
  useEffect(() => {
    navigation.setParams({
      buttonInfo,
      onPressClose,
      onPressSubmitButton,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonInfo]);

  const onPressCloseSummary = useCallback((): void => {
    setSummary('');
    setIsSummary(false);
  }, []);

  /**
   * まとめを完了する
   */
  const onPressSubmitSummary = useCallback((summaryText: string): void => {
    setSummary(summaryText);
    setIsSummary(false);
  }, []);

  /**
   * まとめの編集
   */
  const onPressSummaryEdit = useCallback((): void => {
    navigation.navigate('EditCorrectionSummary', {
      summary,
      onPressSubmit: (prmSummary: string): void => setSummary(prmSummary),
    });
  }, [navigation, summary]);

  /**
   * まとめのメニューアイコンをクリック
   */
  const onPressMoreSummary = useCallback(() => {
    const options = [
      I18n.t('correcting.menuEdit'),
      I18n.t('correcting.menuSummaryDelete'),
      I18n.t('common.cancel'),
    ];
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      index => {
        switch (index) {
          case 0:
            onPressSummaryEdit();
            break;
          case 1:
            setSummary('');
            break;
          default:
        }
      }
    );
  }, [showActionSheetWithOptions, setSummary, onPressSummaryEdit]);

  /**
   * 新規追加のコメントを追加する
   */
  const onPressSubmitComment = useCallback(
    (fix: string, detail: string): void => {
      const f = async (): Promise<void> => {
        if (!correctingSelection) return;
        const uuid = await getUuid();
        const newInfoComments = [
          ...infoComments,
          {
            id: uuid,
            original,
            fix,
            detail,
            start: correctingSelection.start,
            end: correctingSelection.end,
          },
        ];
        newInfoComments.sort((a, b) => {
          return a.start - b.start;
        });
        setInfoComments(newInfoComments);
        setOriginal('');
        setCorrectingSelection(undefined);
        setIsCommentInput(false);
      };
      f();
    },
    [correctingSelection, infoComments, original]
  );

  /**
   * 新規追加のコメントを閉じる
   */
  const onPressCloseComment = useCallback((): void => {
    setOriginal('');
    setCorrectingSelection(undefined);
    setIsCommentInput(false);
  }, []);

  /**
   * コメント編集画面で完了ボタン押下時
   */
  const onPressSubmitEditComment = useCallback(
    (id: string, fix: string, detail: string): void => {
      const newInfoComments = infoComments.map(item => {
        if (item.id !== id) {
          return item;
        }
        return {
          ...item,
          fix,
          detail,
        };
      });
      setInfoComments(newInfoComments);
    },
    [infoComments]
  );

  /**
   * コメントのメニューアイコンをクリック後、編集するボタンをクリック
   */
  const onPressCommentEdit = useCallback(
    (item: InfoComment) => {
      navigation.navigate('EditCorrectionComment', {
        item,
        onPressSubmit: onPressSubmitEditComment,
      });
    },
    [navigation, onPressSubmitEditComment]
  );

  /**
   * コメントのメニューアイコンをクリック後、削除するボタンをクリック
   */
  const onPressCommentDelete = useCallback(
    (id: string) => {
      const newComments = infoComments.filter(item => item.id !== id);
      setInfoComments(newComments);
    },
    [infoComments]
  );

  /**
   * コメントのメニューアイコンをクリック
   */
  const onPressMoreComment = useCallback(
    (item: InfoComment) => {
      const options = [
        I18n.t('correcting.menuEdit'),
        I18n.t('correcting.menuCommentDelete'),
        I18n.t('common.cancel'),
      ];
      showActionSheetWithOptions(
        {
          options,
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
        },
        index => {
          switch (index) {
            case 0:
              onPressCommentEdit(item);
              break;
            case 1:
              onPressCommentDelete(item.id);
              break;
            default:
          }
        }
      );
    },
    [onPressCommentEdit, onPressCommentDelete, showActionSheetWithOptions]
  );

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

  const onPressHidden = (prmCorrectedNum: number): void => {
    if (prmCorrectedNum === 1) setHidden1(!hidden1);
    if (prmCorrectedNum === 2) setHidden2(!hidden2);
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
        {/* 初回起動 or 画面下部の添削の仕方クリックで開かれる */}
        <ModalTutorialCorrecting
          isLoading={false}
          visible={isModalTutorialCorrectiong}
          teachDiaryLanguage={teachDiary.profile.learnLanguage}
          onPress={(): void => setIsModalTutorialCorrectiong(false)}
        />
        <KeyboardAwareScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={32}
        >
          <View style={styles.main}>
            <CorrectionOrigin
              isEmpty={!isCommentInput && infoComments.length === 0}
              isProfileLoading={isProfileLoading}
              teachDiary={teachDiary}
              targetProfile={targetProfile}
              onTimeUp={onTimeUp}
              setSelection={setSelection}
            />
            {correction ? <Space size={32} /> : null}
            <Corrections
              headerTitle={I18n.t('correcting.header')}
              correction={correction}
              correction2={correction2}
              hidden1={hidden1}
              hidden2={hidden2}
              onPressHidden={onPressHidden}
            />
            <Space size={32} />
            {/* 新規でコメント追加 */}
            {isCommentInput ? (
              <CommentInputCardIOS
                containerStyle={styles.commentCard}
                original={original}
                onPressSubmit={onPressSubmitComment}
                onPressClose={onPressCloseComment}
              />
            ) : null}
            {/* 総評の追加 */}
            {isSummary ? (
              <SummaryInputCard
                containerStyle={styles.commentCard}
                onPressSubmit={onPressSubmitSummary}
                onPressClose={onPressCloseSummary}
              />
            ) : null}
            {/* コメント一覧 */}
            {infoComments.length > 0 ? (
              <>
                <GrayHeader title={I18n.t('correcting.commentList')} />
                <Space size={16} />
              </>
            ) : null}
            {infoComments.map((item: InfoComment, index: number) => (
              <CommentCard
                key={item.id}
                containerStyle={styles.commentCard}
                index={index}
                original={item.original}
                fix={item.fix}
                detail={item.detail}
                isEdit
                onPressMore={(): void => onPressMoreComment(item)}
              />
            ))}
            {/* まとめ */}
            <SummaryCard
              containerStyle={styles.commentCard}
              summary={summary}
              isEdit
              onPressMore={onPressMoreSummary}
            />
          </View>
        </KeyboardAwareScrollView>
        <CorrectionFooterButton
          nextActionText={buttonInfo ? buttonInfo.title : ''}
          onPressNextAction={onPressSubmitButton}
          onPressHowTo={(): void => setIsModalTutorialCorrectiong(true)}
        />
      </View>
    </SafeAreaView>
  );
};

CorrectingIOSScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const buttonInfo = navigation.getParam('buttonInfo');
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
      buttonInfo ? (
        <HeaderButton
          title={buttonInfo.title}
          color={buttonInfo.color}
          onPress={onPressSubmitButton}
        />
      ) : null,
  };
};

export default connectActionSheet(CorrectingIOSScreen);
