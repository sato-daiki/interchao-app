// 共通のワード
const common = {
  cancel: 'キャンセル',
  close: '閉じる',
  confirmation: '確認',
  error: 'エラー',
  done: '完了',
  edit: '編集',
  register: '登録',
};

// 共通のエラーメッセージ
const errorMessage = {
  network: 'ネットワークエラーです',
  wrongPassword: 'パスワードが違います',
  invalidEmail: 'メールアドレスの形式が正しくありません',
  weakPassword: 'パスワードは6桁以上で入力してください',
  userNotFound: 'メールアドレスが存在しません',
  emailAlreadyInUse: 'このメールアドレスはすでに登録されています',
};

const initializeScreen = {
  initializeStart: 'はじめる',
  initializeHaveAcconut: 'アカウントをお持ちの方は',
  initializeHere: 'こちら',
};

// 各画面ごとの文字
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

const deleteAcount = {
  headerTitle: '退会について',
  text:
    '退会すると投稿した日記の情報が完全に消去され、復元することはできません。\n\nそれでも退会を希望する方は下のボタンから退会してください。',
  withdrawal: '退会する',
};

const draftDiary = {
  headerTitle: '下書き',
  diaryList: {
    one: '下書き一覧{{count}}件',
    other: '下書き一覧{{count}}件',
    zero: '下書き一覧',
  },
  empty: '下書き一覧はありません',
};

const editCorrectionComment = {
  headerTitle: 'コメントを編集する',
};

const editCorrectionSummary = {
  headerTitle: 'まとめを編集する',
};

const editEmail = {
  headerTitle: 'メールアドレス変更',
  title: '新しいメールアドレスを入力してください',
  labelEmail: '新しいメールアドレス',
  labelPassword: '現在のパスワード',
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
  deleteAcount,
  draftDiary,
  editCorrectionComment,
  editCorrectionSummary,
  editEmail,
  myDiaryList,
  ...initializeScreen,
};

export default ja;
