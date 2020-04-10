// 共通のワード
const common = {
  cancel: 'キャンセル',
  close: '閉じる',
  confirmation: '確認',
  error: 'エラー',
};

// 共通のエラーメッセージ
const errorMessage = {
  network: 'ネットワークエラーです',
};

const initializeScreen = {
  initializeStart: 'はじめる',
  initializeHaveAcconut: 'アカウントをお持ちの方は',
  initializeHere: 'こちら',
};

const correcting = {
  deleteAlert: '編集中の添削は全て削除されますが、よろしいでしょうか？',
  summaryAlert: 'まとめが編集中です',
  headerTitle: '添削する',
  titleComment: 'コメントする',
  titleSummary: 'まとめを書く',
  titleDone: '投稿する',
  menuEdit: '編集する',
  menuCommentDelete: 'コメントを削除する',
  menuSummaryDelete: 'コメントを削除する',
  commentList: 'コメント一覧',
};

const myDiaryList = {
  headerTitle: 'マイ日記を探す',
  diaryList: {
    one: 'マイ日記一覧{{count}}件',
    other: 'マイ日記一覧{{count}}件',
    zero: 'マイ日記一覧',
  },
};

const ja = {
  common,
  errorMessage,
  correcting,
  myDiaryList,
  ...initializeScreen,
};

export default ja;
