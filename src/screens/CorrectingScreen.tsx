import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Alert, SafeAreaView } from 'react-native';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import firebase from '../constants/firebase';
import { EmptyList } from '../components/molecules';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import {
  HeaderText,
  HeaderButton,
  LoadingModal,
  Space,
  CommentCard,
  SummaryCard,
} from '../components/atoms';
import { User, Diary, InfoComment, Profile, Selection } from '../types';
import {
  getDisplayProfile,
  getComments,
  getUsePoints,
  updateYet,
} from '../utils/diary';
import { getUuid } from '../utils/common';
import ModalCorrectingDone from '../components/organisms/ModalCorrectingDone';
import TutorialCorrecting from '../components/organisms/TutorialCorrecting';
import ModalTimeUp from '../components/organisms/ModalTimeUp';
import CorrectionHeader from '../components/organisms/CorrectionHeader';
import { mainColor, green, primaryColor } from '../styles/Common';

type RightButtonState =
  | 'comment'
  | 'reComment'
  | 'summary'
  | 'done'
  | 'nothing';

interface ButtonInfo {
  title: string;
  color: string;
}

interface Props {
  user: User;
  currentProfile: Profile;
  teachDiary: Diary;
  setUser: (user: User) => void;
  editTeachDiary: (objectID: string, diary: Diary) => void;
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 16,
  },
  commentCard: {
    paddingHorizontal: 16,
  },
});

const keyExtractor = (item: InfoComment, index: number): string =>
  String(index);

const getStateButtonInfo = (state: RightButtonState): ButtonInfo => {
  if (state === 'comment') {
    return { title: 'コメントする', color: mainColor };
  }
  if (state === 'reComment') {
    return { title: '範囲を変更', color: mainColor };
  }
  if (state === 'summary') {
    return { title: 'まとめを書く', color: primaryColor };
  }

  if (state === 'done') {
    return { title: '投稿する', color: green };
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
  const [tutorialCorrectiong, setTutorialCorrectiong] = useState(
    user.tutorialCorrectiong
  );

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

  /**
   * コメントを追加する
   */
  const onAddComment = useCallback((): void => {
    if (isSummary) {
      Alert.alert('', 'まとめが編集中です');
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
      if (!teachDiary.objectID) return;
      if (isLoading) return;
      setIsLoading(true);

      const displayProfile = getDisplayProfile(currentProfile);
      const comments = getComments(infoComments);
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      const getPoints = getUsePoints(
        teachDiary.text.length,
        teachDiary.profile.learnLanguage
      );
      const newPoints = user.points + getPoints;

      await firebase.firestore().runTransaction(async transaction => {
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
          createdAt: timestamp,
          updatedAt: timestamp,
        });

        // 日記のステータスを未読に変更する
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

        // correctingsの削除
        const correctingRef = firebase
          .firestore()
          .doc(`correctings/${teachDiary.objectID}`);
        transaction.delete(correctingRef);

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
    teachDiary,
    isLoading,
    currentProfile,
    infoComments,
    user,
    editTeachDiary,
    setUser,
    summary,
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
      '確認',
      '編集中の添削は全て削除されますが、よろしいでしょうか？',
      [
        {
          text: 'キャンセル',
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

    if (selection && selection.start !== selection.end) {
      if (!isCommentInput) {
        newState = 'comment';
      } else {
        newState = 'reComment';
      }
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
    const options = ['編集する', 'まとめを削除する', 'キャンセル'];
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
      const options = ['編集する', 'コメントを削除する', 'キャンセル'];
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
   * 初回チュートリアル
   */
  const onPressTutorial = useCallback((): void => {
    const f = async (): Promise<void> => {
      if (isTutorialLoading) return;
      if (user.tutorialCorrectiong) {
        setTutorialCorrectiong(true);
        return;
      }
      setIsTutorialLoading(true);
      await firebase
        .firestore()
        .doc(`users/${user.uid}`)
        .update({
          tutorialCorrectiong: true,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setUser({
        ...user,
        tutorialCorrectiong: true,
      });
      setIsTutorialLoading(false);
      setTutorialCorrectiong(true);
    };
    f();
  }, [isTutorialLoading, setUser, user]);

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

  const listEmptyComponent = isCommentInput ? null : (
    <>
      <EmptyList
        iconName="cursor-pointer"
        message="文章をタップして添削を始めましょう"
        paddingTop={0}
      />
      <Space size={32} />
    </>
  );

  const listFooterComponent = (
    <View style={styles.commentCard}>
      <SummaryCard summary={summary} isEdit onPressMore={onPressMoreSummary} />
    </View>
  );

  const listHeaderComponent = (
    <CorrectionHeader
      isCommentInput={isCommentInput}
      isSummary={isSummary}
      original={original}
      teachDiary={teachDiary}
      infoComments={infoComments}
      onTimeUp={onTimeUp}
      onPressSubmitComment={onPressSubmitComment}
      onPressCloseComment={onPressCloseComment}
      onPressSubmitSummary={onPressSubmitSummary}
      onPressCloseSummary={(): void => setIsSummary(false)}
      setSelection={setSelection}
    />
  );

  const renderItem = useCallback(
    ({ item, index }: { item: InfoComment; index: number }): JSX.Element => {
      return (
        <View style={styles.commentCard}>
          <CommentCard
            index={index}
            original={item.original}
            fix={item.fix}
            detail={item.detail}
            isEdit
            onPressMore={(): void => onPressMoreComment(item)}
          />
        </View>
      );
    },
    [onPressMoreComment]
  );

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
        <TutorialCorrecting
          isLoading={isTutorialLoading}
          displayed={tutorialCorrectiong}
          onPress={onPressTutorial}
        />
        <FlatList
          data={infoComments}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={listHeaderComponent}
          ListFooterComponent={listFooterComponent}
          ListEmptyComponent={listEmptyComponent}
        />
        {/* <CorrectionFooterButton
          nextActionText={buttonInfo}
          onPressNextAction={onPressSubmitButton}
          onPressHowTo={(): void => setTutorialCorrectiong(false)}
        /> */}
        <KeyboardSpacer />
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
    title: '添削する',
    headerLeft: (): JSX.Element => (
      <HeaderText title="閉じる" onPress={onPressClose} />
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
