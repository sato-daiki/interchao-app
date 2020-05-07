import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  HeaderText,
  HeaderButton,
  LoadingModal,
  Space,
  CommentCard,
  SummaryCard,
  GrayHeader,
  TextButtun,
} from '../components/atoms';
import ModalCorrectingDone from '../components/organisms/ModalCorrectingDone';
import ModalTutorialCorrecting from '../components/organisms/ModalTutorialCorrecting';
import ModalTimeUp from '../components/organisms/ModalTimeUp';
import CommentInputCardAndroid from '../components/organisms/CommentInputCardAndroid';
import SummaryInputCard from '../components/organisms/SummaryInputCard';
import CorrectionOrigin from '../components/organisms/CorrectionOrigin';

import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import firebase from '../constants/firebase';
import { User, Diary, Profile, InfoCommentAndroid } from '../types';
import I18n from '../utils/I18n';
import {
  getDisplayProfile,
  getComments,
  getUsePoints,
  updateYet,
} from '../utils/diary';
import { getUuid } from '../utils/common';
import { mainColor, green, primaryColor } from '../styles/Common';
import { getProfile } from '../utils/profile';
import { track, events } from '../utils/Analytics';

type RightButtonState = 'comment' | 'summary' | 'done' | 'nothing';

interface ButtonInfo {
  title: string;
  color: string;
}

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
  addComment: {
    position: 'absolute',
    zIndex: 1,
    bottom: 42,
    right: 16,
    backgroundColor: '#fff',
    width: 34,
    height: 34,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const getStateButtonInfo = (state: RightButtonState): ButtonInfo => {
  if (state === 'comment') {
    return { title: I18n.t('correcting.titleComment'), color: mainColor };
  }

  if (state === 'summary') {
    return { title: I18n.t('correcting.titleSummary'), color: primaryColor };
  }

  if (state === 'done') {
    return { title: I18n.t('correcting.titleDone'), color: green };
  }
  return { title: '', color: '' };
};

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
  const [isTutorialLoading, setIsTutorialLoading] = useState(false);
  const [isModalTutorialCorrectiong, setIsModalTutorialCorrectiong] = useState(
    false
  );

  // Profile関連
  const [targetProfile, setTargetProfile] = useState<Profile>();
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const [isModalDone, setIsModalDone] = useState(false); // 投稿完了後のアラートモーダル
  const [isModalTimeUp, setIsModalTimeUp] = useState(false); // タイムアップモーダル

  /* 右上と画面下のボタン関連 */
  const [state, setState] = useState<RightButtonState>('nothing'); // 状態推移
  const [buttonInfo, setButtonInfo] = useState<ButtonInfo>(); // ボタン

  /* コメント関連 */
  const [infoComments, setInfoComments] = useState<InfoCommentAndroid[]>([]); // コメントをlistデータ
  const [isCommentInput, setIsCommentInput] = useState(false); // コメントの追加のon/offフラグ

  /* 総評関連 */
  const [summary, setSummary] = useState(''); // まとめ
  const [isSummary, setIsSummary] = useState(false); // 総評の追加のon/offフラグ

  useEffect(() => {
    const f = async (): Promise<void> => {
      // プロフィールを取得
      const newProfile = await getProfile(teachDiary.profile.uid);
      if (newProfile) {
        setTargetProfile(newProfile);
      }
      setIsProfileLoading(false);
    };
    f();
  }, [teachDiary.profile.uid]);

  /**
   * コメントを追加する
   */
  const onAddComment = useCallback((): void => {
    if (isSummary) {
      Alert.alert('', I18n.t('correcting.summaryAlert'));
      setIsCommentInput(false);
      return;
    }

    // 新規コメントを初期化して表示する
    setIsCommentInput(true);
  }, [isSummary]);

  /**
   * 総評ボタンを追加する
   */
  const onAddSummary = useCallback(() => {
    if (isCommentInput) {
      Alert.alert('', I18n.t('correcting.commentAlert'));
      setIsSummary(false);
      return;
    }
    setIsSummary(true);
  }, [isCommentInput]);

  /**
   * 完了する
   */
  const onDone = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isLoading) return;
      setIsLoading(true);

      const displayProfile = getDisplayProfile(currentProfile);
      const comments = getComments(infoComments);

      const getPoints = getUsePoints(
        teachDiary.text.length,
        teachDiary.profile.learnLanguage
      );
      const newPoints = user.points + getPoints;

      await firebase.firestore().runTransaction(async transaction => {
        if (!teachDiary.objectID) return;

        //  correctionsの更新
        const correctionRef = firebase
          .firestore()
          .collection('corrections')
          .doc();
        transaction.set(correctionRef, {
          objectID: teachDiary.objectID,
          profile: displayProfile,
          comments,
          summary,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        // // 日記のステータスを未読に変更する
        const newCorrection = {
          id: correctionRef.id,
          profile: displayProfile,
        };
        const diaryRef = firebase
          .firestore()
          .doc(`diaries/${teachDiary.objectID}`);
        transaction.update(diaryRef, {
          correctionStatus: 'unread',
          correction: newCorrection,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        //  添削をしたuserの更新 ポイントを増やす correctingObjectIDをnull
        const currentUserRef = firebase.firestore().doc(`users/${user.uid}`);
        transaction.update(currentUserRef, {
          points: newPoints,
          correctingObjectID: null,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        // // correctingsの削除
        const correctingRef = firebase
          .firestore()
          .doc(`correctings/${teachDiary.objectID}`);
        transaction.delete(correctingRef);

        track(events.CREATED_CORRECTION, {
          objectID: teachDiary.objectID,
          getPoints,
          commentNum: comments.length,
          summaryCharacters: summary.length,
        });

        // reduxに追加
        editTeachDiary(teachDiary.objectID, {
          ...teachDiary,
          correctionStatus: 'unread',
          correction: newCorrection,
        });
        setUser({
          ...user,
          points: newPoints,
          correctingObjectID: null,
        });
        setIsLoading(false);
        setIsModalDone(true);
      });
    };
    f();
  }, [
    isLoading,
    currentProfile,
    infoComments,
    teachDiary,
    user,
    summary,
    editTeachDiary,
    setUser,
  ]);

  /**
   * 右上or画面下のボタンが押下された時の処理
   */
  const onPressSubmitButton = useCallback((): void => {
    if (state === 'summary') {
      onAddSummary();
    } else if (state === 'done') {
      onDone();
    }
  }, [onAddSummary, onDone, state]);

  /**
   * 閉じる処理
   */
  const close = async (): Promise<void> => {
    if (isLoading) return;
    if (!teachDiary.objectID) return;
    setIsLoading(true);
    // ステータスを戻す
    updateYet(teachDiary.objectID, user.uid);

    editTeachDiary(teachDiary.objectID, {
      ...teachDiary,
      correctionStatus: 'yet',
    });
    setUser({
      ...user,
      correctingObjectID: null,
    });
    setIsLoading(false);
    navigation.goBack(null);
  };

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

    if (
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
  }, [isSummary, isCommentInput, summary.length, infoComments.length]);

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
    (original: string, fix: string, detail: string): void => {
      const f = async (): Promise<void> => {
        const uuid = await getUuid();
        const newInfoComments = [
          ...infoComments,
          {
            id: uuid,
            original,
            fix,
            detail,
          },
        ];
        setInfoComments(newInfoComments);
        setIsCommentInput(false);
      };
      f();
    },
    [infoComments]
  );

  /**
   * 新規追加のコメントを閉じる
   */
  const onPressCloseComment = useCallback((): void => {
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
    (item: InfoCommentAndroid) => {
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
    (item: InfoCommentAndroid) => {
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

  // /**
  //  * 初回チュートリアル
  //  */
  // const onPressTutorial = useCallback((): void => {
  //   const f = async (): Promise<void> => {
  //     if (isTutorialLoading) return;
  //     if (user.tutorialCorrectiong) {
  //       // 画面下部の添削の仕方から呼ばれたときはここに入る
  //       setIsModalTutorialCorrectiong(false);
  //       return;
  //     }
  //     setIsTutorialLoading(true);
  //     await firebase
  //       .firestore()
  //       .doc(`users/${user.uid}`)
  //       .update({
  //         tutorialCorrectiong: true,
  //         updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  //       });
  //     setUser({
  //       ...user,
  //       tutorialCorrectiong: true,
  //     });
  //     console.log('user', user);
  //     setIsTutorialLoading(false);
  //     setIsModalTutorialCorrectiong(false);
  //     setIsModalFirsttutorialCorrectiong(false);
  //   };
  //   f();
  // }, [isTutorialLoading, setUser, user]);

  /**
   * 30分が経過した時の処理
   */
  const onTimeUp = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!teachDiary.objectID) return;
      setIsLoading(true);
      // ステータスを戻す
      updateYet(teachDiary.objectID, user.uid);

      editTeachDiary(teachDiary.objectID, {
        ...teachDiary,
        correctionStatus: 'yet',
      });
      setUser({
        ...user,
        correctingObjectID: null,
      });
      setIsLoading(false);
      setIsModalTimeUp(true);
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
          nativeLanguage={currentProfile.nativeLanguage}
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
            />
            <Space size={32} />
            {/* 新規でコメント追加 */}
            {isCommentInput ? (
              <CommentInputCardAndroid
                containerStyle={styles.commentCard}
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
            {infoComments.map((item: InfoCommentAndroid, index: number) => (
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
        <TouchableOpacity style={styles.addComment} onPress={onAddComment}>
          <MaterialCommunityIcons
            size={36}
            color={mainColor}
            name="plus-circle"
          />
        </TouchableOpacity>
        <TextButtun
          isBorrderTop
          isBorrderBottom
          title={I18n.t('correctionFooterButton.correction')}
          onPress={(): void => setIsModalTutorialCorrectiong(true)}
        />
      </View>
    </SafeAreaView>
  );
};

CorrectingScreen.navigationOptions = ({
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

export default connectActionSheet(CorrectingScreen);
