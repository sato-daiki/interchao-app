import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
  Vibration,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';

import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import {
  PanGestureHandlerGestureEvent,
  LongPressGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import firebase from '../constants/firebase';
import {
  fontSizeS,
  subTextColor,
  primaryColor,
  fontSizeM,
} from '../styles/Common';
import {
  UserDiaryStatus,
  EmptyList,
  CorrectionFooterButton,
} from '../components/molecules';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import {
  HeaderText,
  LoadingModal,
  ProfileIconHorizontal,
  Space,
  CommentCard,
  GrayHeader,
  SummaryCard,
} from '../components/atoms';
import { User, Diary, InfoComment, Profile } from '../types';
import { getAlgoliaDate, getDisplayProfile, getComments } from '../utils/diary';
import CorrectionText from '../components/organisms/CorrectionText';
import CommentInputCard from '../components/organisms/CommentInputCard';
import { ActiveWord, InitialWord, LongPressWord } from '../types/correcting';
import SummaryInputCard from '../components/organisms/SummaryInputCard';
import CorrectionUnderline from '../components/organisms/CorrectionUnderline';
import { getUuid } from '../utils/common';

const VIBRATION_DURATION = 500;
const LINE_HEIGHT = fontSizeM * 1.7;
const LINE_SPACE = LINE_HEIGHT - fontSizeM;

type RightButtonState = 'summary' | 'done' | 'nothing';

interface Props {
  user: User;
  currentProfile: Profile;
  teachDiary: Diary;
  setPoints: (points: number) => void;
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
  scrollView: {
    flex: 1,
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
  commentCard: {
    paddingHorizontal: 16,
  },
});

const keyExtractor = (item: InfoComment, index: number): string =>
  String(index);

const getStateButtonTitle = (state: RightButtonState): string => {
  if (state === 'summary') {
    return 'まとめを書く';
  }
  if (state === 'done') {
    return '完了';
  }
  return '';
};

/**
 * 添削中
 */
const CorrectingScreen: ScreenType = ({
  navigation,
  user,
  currentProfile,
  teachDiary,
  setPoints,
  editTeachDiary,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [isLoading, setIsLoading] = useState(false);
  const [longPressWord, setLongPressWord] = useState<LongPressWord>();
  const [startWord, setStartWord] = useState<ActiveWord>();
  const [endWord, setEndWord] = useState<ActiveWord>();
  const [initialWords, setInitialWords] = useState<InitialWord[]>([]);

  const [isModalComment, setIsModalComment] = useState(false); // コメントするのメニューのon/offフラグ

  /* 右上と画面下のボタン関連 */
  const [state, setState] = useState<RightButtonState>('nothing'); // 状態推移
  const [buttonTitle, setButtonTitle] = useState(''); // ボタン

  /* コメント関連 */
  const [original, setOriginal] = useState(''); // 新規追加時の修正文
  const [isCommentInput, setIsCommentInput] = useState(false); // コメントの追加のon/offフラグ
  const [infoComments, setInfoComments] = useState<InfoComment[]>([]); // コメントをlistデータ

  /* 総評関連 */
  const [summary, setSummary] = useState(''); // まとめ
  const [isSummary, setIsSummary] = useState(false); // 総評の追加のon/offフラグ
  const { createdAt, title, text, profile } = teachDiary;
  const { userName, photoUrl } = profile;

  /**
   * 完了ボタンを押下した時の処理
   */
  const onPressDone = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!teachDiary.objectID) return;
      if (isLoading) return;
      setIsLoading(true);
      const displayProfile = getDisplayProfile(currentProfile);
      const comments = getComments(infoComments);
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      const correctionsDoc = await firebase
        .firestore()
        .collection('corrections')
        .add({
          objectID: teachDiary.objectID,
          profile: displayProfile,
          correctionStatus: 'unread',
          comments,
          summary,
          createdAt: timestamp,
          updatedAt: timestamp,
        });

      // 日記のステータスを未読に変更する
      const newCorrection = {
        id: correctionsDoc.id,
        profile: displayProfile,
      };
      const diaryRef = firebase
        .firestore()
        .doc(`diaries/${teachDiary.objectID}`);
      await diaryRef.update({
        correctionStatus: 'unread',
        correction: newCorrection,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // ポイントを増やす
      const newPoints = user.points + 10;
      const userRef = firebase.firestore().doc(`users/${user.uid}`);
      await userRef.update({
        points: newPoints,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // reduxに追加
      editTeachDiary(teachDiary.objectID, {
        ...teachDiary,
        correctionStatus: 'unread',
      });
      setPoints(newPoints);

      navigation.goBack(null);
      setIsLoading(false);
    };
    f();
  }, [
    teachDiary,
    isLoading,
    currentProfile,
    infoComments,
    summary,
    user.points,
    user.uid,
    editTeachDiary,
    setPoints,
    navigation,
  ]);

  /**
   * 総評ボタンを押下した時の処理
   */
  const onPressSummary = useCallback(() => {
    setIsSummary(true);
  }, []);

  /**
   * 右上or画面下のボタンが押下された時の処理
   */
  const onPressSubmitButton = useCallback((): void => {
    if (state === 'done') {
      onPressDone();
    } else if (state === 'summary') {
      onPressSummary();
    }
  }, [onPressDone, onPressSummary, state]);

  /**
   * 閉じる処理
   */
  const close = async (): Promise<void> => {
    if (isLoading) return;
    if (!teachDiary.objectID) return;
    setIsLoading(true);
    // 日記のステータスを添削中に変更する
    const diaryRef = firebase.firestore().doc(`diaries/${teachDiary.objectID}`);
    await diaryRef.update({
      correctionStatus: 'yet',
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    editTeachDiary(teachDiary.objectID, {
      ...teachDiary,
      correctionStatus: 'yet',
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
    const isComments = infoComments.length > 0;
    if (summary.length > 0 && !isSummary && isComments) {
      newState = 'done';
    } else if (!isSummary && !isCommentInput && isComments) {
      newState = 'summary';
    }

    const newButtonTitle = getStateButtonTitle(newState);
    setState(newState);
    setButtonTitle(newButtonTitle);
  }, [isSummary, isCommentInput, summary.length, infoComments.length]);

  /**
   * ヘッダーに初期値設定
   */
  useEffect(() => {
    navigation.setParams({
      buttonTitle,
      onPressClose,
      onPressSubmitButton,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonTitle]);

  const getPositionInfo = useCallback(
    (index: number): ActiveWord | undefined => {
      const targetPosition = initialWords.find(
        element => element.index === index
      );
      if (!targetPosition) return undefined;
      return {
        index,
        startX: targetPosition.startX,
        endX: targetPosition.endX,
        width: targetPosition.width,
        line: targetPosition.line,
      };
    },
    [initialWords]
  );

  const onLongPress = useCallback(
    (index: number, event: LongPressGestureHandlerStateChangeEvent) => {
      const f = async (): Promise<void> => {
        if (event.nativeEvent.state === State.ACTIVE) {
          const y = event.nativeEvent.absoluteY - event.nativeEvent.y;
          const indexInfo = getPositionInfo(index);
          if (!indexInfo) return undefined;

          setStartWord(indexInfo);
          setEndWord(indexInfo);
          setLongPressWord({
            y,
            line: indexInfo.line,
          });
        } else if (event.nativeEvent.state === State.END) {
          setIsModalComment(true);
        }
      };
      f();
    },
    [getPositionInfo]
  );

  const onLayout = (
    index: number,
    word: string,
    event: LayoutChangeEvent
  ): void => {
    const { x, y, width } = event.nativeEvent.layout;
    setInitialWords([
      ...initialWords,
      {
        index,
        word,
        startX: x,
        endX: x + width - 4,
        width,
        line: Math.floor(y / LINE_HEIGHT) + 1,
      },
    ]);
  };

  const findCellIndex = useCallback(
    (absoluteX: number, absoluteY: number): InitialWord | undefined => {
      if (!longPressWord) return undefined;
      const moveY = longPressWord.y - absoluteY;
      let moveLine = 0;
      if (moveY > LINE_SPACE) {
        // 上に動いた時
        if (moveY < LINE_HEIGHT + LINE_SPACE) {
          moveLine = 1;
        } else {
          moveLine = Math.floor(moveY / LINE_HEIGHT) + 1;
        }
      } else if (moveY < -LINE_HEIGHT) {
        // 下に動いた時
        moveLine = Math.floor(moveY / LINE_HEIGHT) + 1;
      }
      const resPosition = initialWords.find(
        p =>
          p.startX <= absoluteX &&
          p.endX >= absoluteX &&
          p.line === longPressWord.line - moveLine
      );
      return resPosition;
    },
    [initialWords, longPressWord]
  );

  const onGestureEventTop = useCallback(
    (event: PanGestureHandlerGestureEvent): void => {
      const { absoluteX, absoluteY } = event.nativeEvent;
      const resPosition = findCellIndex(absoluteX, absoluteY);
      if (resPosition && endWord && resPosition.index <= endWord.index) {
        setStartWord({
          index: resPosition.index,
          startX: resPosition.startX,
          endX: resPosition.endX,
          width: resPosition.width,
          line: resPosition.line,
        });
      }
    },
    [endWord, findCellIndex]
  );

  const onGestureEventEnd = (event: PanGestureHandlerGestureEvent): void => {
    const { absoluteX, absoluteY } = event.nativeEvent;
    const resPosition = findCellIndex(absoluteX, absoluteY);
    if (resPosition && startWord && resPosition.index >= startWord.index) {
      // 後ろのピンが前のピンより手前にはいけないようにする
      setEndWord({
        index: resPosition.index,
        startX: resPosition.startX,
        endX: resPosition.endX,
        width: resPosition.width,
        line: resPosition.line,
      });
    }
  };

  /**
   * まとめを編集する画面で確定ボタンを押した後の処理
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
   * 総評を追加する
   */
  const onPressSubmitSummary = useCallback((summaryText: string): void => {
    setSummary(summaryText);
    setIsSummary(false);
  }, []);

  /**
   * コメントするボタンを押下した後の処理
   */
  const onPressComment = useCallback((): void => {
    if (isSummary) {
      Alert.alert('', 'まとめが編集中です');
      setStartWord(undefined);
      setEndWord(undefined);
      setOriginal('');
      setIsCommentInput(false);
      return;
    }

    initialWords.sort((a, b) => {
      return a.index - b.index;
    });
    if (!startWord || !endWord) return;

    let newOriginal = '';
    for (let i = startWord.index; i <= endWord.index; i += 1) {
      newOriginal += `${initialWords[i].word} `;
    }

    const newInitialWords = initialWords.map(item => {
      if (item.index >= startWord.index && item.index <= endWord.index) {
        return {
          ...item,
          isComment: true,
        };
      }
      return item;
    });
    setInitialWords(newInitialWords);

    // 新規コメントを初期化して表示する
    setIsCommentInput(true);
    setOriginal(newOriginal);

    // コメントするのメニューを非表示にする
    setIsModalComment(false);
  }, [initialWords, startWord, endWord, isSummary]);

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

  /**
   * 新規追加のコメントを追加する
   */
  const onPressSubmitComment = useCallback(
    (fix: string, detail: string): void => {
      const f = async (): Promise<void> => {
        if (!startWord || !endWord) return;
        const uuid = await getUuid();
        const newInfoComments = [
          ...infoComments,
          {
            id: uuid,
            startWord,
            endWord,
            original,
            fix,
            detail,
          },
        ];
        newInfoComments.sort((a, b) => {
          return a.startWord.index - b.startWord.index;
        });
        setInfoComments(newInfoComments);
        setStartWord(undefined);
        setEndWord(undefined);
        setOriginal('');
        setIsCommentInput(false);
      };
      f();
    },
    [infoComments, original, startWord, endWord]
  );

  /**
   * 新規追加のコメントを閉じる
   */
  const onPressCloseComment = useCallback((): void => {
    setStartWord(undefined);
    setEndWord(undefined);
    setOriginal('');
    setIsCommentInput(false);
  }, []);

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

  const listHeaderComponent =
    infoComments.length > 0 ? (
      <>
        <GrayHeader title="コメント一覧" />
        <Space size={16} />
      </>
    ) : null;

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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LoadingModal visible={isLoading} />
        <View style={styles.main}>
          <ProfileIconHorizontal userName={userName} photoUrl={photoUrl} />
          <Space size={8} />
          <View style={styles.header}>
            <Text style={styles.postDayText}>{getAlgoliaDate(createdAt)}</Text>
            <UserDiaryStatus diary={teachDiary} />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <CorrectionText
            text={text}
            isModalComment={isModalComment}
            startWord={startWord}
            endWord={endWord}
            onLongPress={onLongPress}
            onGestureEventTop={onGestureEventTop}
            onGestureEventEnd={onGestureEventEnd}
            onLayout={onLayout}
            onPressComment={onPressComment}
            initialWords={initialWords}
          />
          <CorrectionUnderline infoComments={infoComments} />
        </View>
        <Space size={32} />
        {/* 新規でコメント追加 */}
        {isCommentInput ? (
          <View style={styles.commentCard}>
            <CommentInputCard
              original={original}
              onPressSubmit={onPressSubmitComment}
              onPressClose={onPressCloseComment}
            />
          </View>
        ) : null}
        {/* 総評の追加 */}
        {isSummary ? (
          <View style={styles.commentCard}>
            <SummaryInputCard
              onPressSubmit={onPressSubmitSummary}
              onPressClose={(): void => setIsSummary(false)}
            />
          </View>
        ) : null}
        {/* 追加後のコメント一覧 */}
        <FlatList
          data={infoComments}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={listHeaderComponent}
          ListEmptyComponent={listEmptyComponent}
        />

        {/* まとめ */}
        <View style={styles.commentCard}>
          <SummaryCard
            summary={summary}
            isEdit
            onPressMore={onPressMoreSummary}
          />
        </View>
      </ScrollView>
      <CorrectionFooterButton
        nextActionText={buttonTitle}
        onPressNextAction={onPressSubmitButton}
        onPressHowTo={() => console.log('')}
      />
    </View>
  );
};

CorrectingScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const buttonTitle = navigation.getParam('buttonTitle');
  const onPressSubmitButton = navigation.getParam('onPressSubmitButton');
  const onPressClose = navigation.getParam('onPressClose');

  return {
    ...DefaultNavigationOptions,
    title: '添削する',
    headerLeft: (): JSX.Element => (
      <HeaderText title="閉じる" onPress={onPressClose} />
    ),
    headerRight: (): JSX.Element => (
      <HeaderText title={buttonTitle} onPress={onPressSubmitButton} />
    ),
  };
};

export default connectActionSheet(CorrectingScreen);
