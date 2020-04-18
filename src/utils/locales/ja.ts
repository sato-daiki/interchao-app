// 共通のワード
const common = {
  cancel: 'キャンセル',
  close: '閉じる',
  confirmation: '確認',
  error: 'エラー',
  done: '完了',
  edit: '編集',
  register: '登録',
  sending: '送信',
  next: '次へ',
  publish: '投稿',
  draft: '下書き保存',
  skip: 'スキップ',
  add: '追加',
  delete: '削除',
};

// タブ
const mainTab = {
  myDiary: 'マイ日記',
  postDiary: '日記を書く',
  teachDiary: 'みんなの日記',
};

// 共通のエラーメッセージ
const errorMessage = {
  network: 'ネットワークエラーです',
  wrongPassword: 'パスワードが違います',
  invalidEmail: 'メールアドレスの形式が正しくありません',
  weakPassword: 'パスワードは6桁以上で入力してください',
  userNotFound: 'メールアドレスが存在しません',
  emailAlreadyInUse: 'このメールアドレスはすでに登録されています',
  tooManyRequests:
    'エラーの数が一定数を超えました。時間をおいてから再度お試しください',
  defaultError: 'エラーが発生しました。{{message}}',
  emptyUserName: 'ユーザネームを入力してください',
  invalidUserName:
    'ユーザーネームは半角英数字と_（アンダーバー）と.（ピリオド）以外使えません',
  initialUserName: '先頭の文字は半角英数字以外使えません',
  userNameAlreadyInUse:
    'すでにこのユーザーネームを使用しているユーザーがいます',
  notFound: 'ページが開けません。エラーが発生しました',
  cantLogout: 'メールアドレスが登録されていないため、ログアウトできません。',
  invalidRaiting: '評価は1〜5で入力してください',
  correctionAlready:
    'この日記は他の人が添削を始めました。他の日記を再度検索ください。',
  deleteTargetUser:
    'このページは開けません。対象のユーザは削除された可能性があります。',
  emptyTitile: 'タイトルが入力されていません',
  emptyText: '本文が入力されていません',
  lackPointsTitle: 'ポイント不足',
  lackPointsText:
    '文字数{{textLength}}の日記を投稿するには{{usePoint}}ポイントが必要です。ポイントは日本語の日記を添削することで溜めることができます。',
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

const editMyProfile = {
  headerTitle: 'プロフィール変更',
  name: '名前',
  userName: 'ユーザネーム',
  placeholderIntroduction: '自己紹介(200字以内)',
};

const editPassword = {
  headerTitle: 'パスワード変更',
  forgetText: 'パスワードをお忘れの方は',
  link: 'こちら',
  currentPassword: '現在のパスワード',
  newPassword: '新しいパスワード（６ケタ以上）',
};

const editUserName = {
  headerTitle: 'ユーザーネーム',
  userName: 'ユーザーネーム',
};

const foregetPassword = {
  headerTitle: 'パスワード再設定',
  email: 'メールアドレス',
  title: 'メールアドレスを入力してください',
  subText: 'メールアドレスにパスワードの変更URLを送ります',
};

const initialize = {
  start: 'はじめる',
  acount: 'アカウントをお持ちの方は',
  link: 'こちら',
};

const inputUserName = {
  headerTitle: 'ユーザーネーム登録',
  title: 'ユーザーネームを入力してください',
  subText: 'このユーザネームはいつでも変更できます',
};

const myDiary = {
  menuDelete: '削除する',
  menuChangePublic: '公開設定を変更する',
  confirmMessage: '本当に削除してよろしいでしょうか？',
};

const myDiaryList = {
  headerTitle: 'マイ日記を探す',
  diaryList: {
    one: 'マイ日記一覧{{count}}件',
    other: 'マイ日記一覧{{count}}件',
    zero: 'マイ日記一覧',
  },
};

const myDiarySerch = {
  placeholder: 'タイトルと本文で検索',
};

const myPage = {
  headerTitle: 'マイページ',
  editButton: '編集する',
};

const notice = {
  headerTitle: '通知',
  finishCorrection: 'マイ日記の添削が完了',
  finishReview: 'レビューが届く',
};

const postDiary = {
  headerTitle: '新規日記',
};

const postDraftDiary = {
  headerTitle: '下書を編集',
};

const registerEmailPassword = {
  headerTitle: 'メールアドレス/パスワード登録',
  title: 'メールアドレスとパスワードを入力してください',
  subText:
    '機種変更時などのデータの引き継ぎに必要になります。あとでも登録できます。',
  email: 'メールアドレス',
  password: 'パスワード（６ケタ以上）',
};

const reviewList = {
  headerTitle: 'レビュー一覧',
  reviewList: 'レビュー一覧',
};

const review = {
  headerTitle: 'レビューする',
  placeholder: 'コメント',
  confirmation: '編集中のレビューは全て削除されますが、よろしいでしょうか？',
};

const selectLanguage = {
  headerTitle: '言語の選択',
  title: '言語を選択してください',
  learn: '学びたい言語',
  native: 'ネイティブ言語',
};

const setting = {
  headerTitle: '設定',
  title: '基本設定',
  notice: '通知',
  editEmail: 'メールアドレスの変更',
  editPassword: 'パスワードの変更',
  registerEmailPassword: 'メールアドレス/パスワードの登録',
  tutorial: 'チュートリアル',
  management: '運営',
  privacy: 'プライバシーポリシー',
  deleteAcount: '退会について',
  logout: 'ログアウト',
};

const signIn = {
  headerTitle: 'ログイン',
  email: 'メールアドレス',
  password: 'パスワード',
  login: 'ログイン',
  forgetText: 'パスワードをお忘れの方は',
  link: 'こちら',
};

const signUp = {
  headerTitle: 'メールアドレス登録',
  title: 'メールアドレスとパスワードを入力してください',
  subText:
    '機種変更時などのデータの引き継ぎに必要になります。あとでも登録できます。',
  email: 'メールアドレス',
  password: 'パスワード（６ケタ以上）',
};

const teachDiary = {
  correcting: '添削する',
};

const teachDiaryList = {
  headerTitle: 'みんなの日記を探す',
  diaryList: '日本語を勉強している人の日記一覧',
  empty: 'みんなの日記一覧がありません',
};

const teachDiarySerch = {
  searchBar: 'タイトルと本文で検索',
};

const tutorialList = {
  headerTitle: 'チュートリアル一覧',
  correcting: '添削の仕方',
  postDiary: '日記の書き方',
  points: 'ポイントについて',
};

const userProfile = {
  headerTitle: 'プロフィール',
  moreRead: '{{count}}件のレビューを全部見る',
  blocked: 'ブロック',
  unBlocked: 'ブロックを解除する',
  report: '報告する',
  diaryList: {
    one: '日記一覧{{count}}件',
    other: '日記一覧{{count}}件',
    zero: '日記一覧',
  },
  topReview: 'トップレビュー',
};

// atoms
const commentCard = {
  original: '原文',
  fix: '修正文',
  detail: 'コメント',
};

const summaryCard = {
  title: 'まとめ',
};

const userPoints = {
  points: 'ポイント',
};

const userPointsBig = {
  points: '現在のポイント',
};

//  molecules
const commentInput = {
  original: '原文',
  fix: '修正文',
  detail: 'コメント',
};

const correctionFooterButton = {
  correction: '添削の仕方',
};

const emptyDiary = {
  empty: '日記がまだ投稿されていません。',
};

const emptyReview = {
  empty: 'レビューはまだありません',
};

const languageRadioBox = {
  ja: '日本語',
  en: '英語',
};

const myDiaryCorrectionFooter = {
  finText: 'この日記はレビュー済みです',
  title: '添削のレビューをする',
  promptText: '添削のお礼と評価をお願いします',
};

const profileLanguage = {
  learn: '勉強中の言語',
  native: 'ネイティブの言語',
};

const summaryInput = {
  title: 'まとめ',
};

// organisms
const correctionOrigin = {
  message: '文章をタップして添削を始めましょう',
};

const diaryHitList = {
  empty: '検索条件の日記がありません',
  header: '検索結果',
};

const draftListItem = {
  draft: '下書き',
};

const emptyMyDiaryList = {
  text:
    '日記がまだ投稿されていません。\n日記を書いてネィティブに添削してもらおう！',
  hint: 'まずはここから！\n日記を無料で\n添削してもらえるよ！',
};

const modalAlertCorrection = {
  text:
    '添削は30分以内で行ってください。30分をすぎると添削は破棄されます。\n\n本サービスは、１日記につき、１添削で行っています。添削を始めると、ロックがかかり他の人は添削できなくなります。',
  start: '添削を始める',
  checkboxText: '以後、このメッセージを表示しない',
};

const modalAlertPublish = {
  confirmation:
    'ポイントを使い日記を投稿します。一度投稿すると、編集ができませんが、よろしいですか？',
  subTitle: '公開設定',
  description:
    'InterChaoはWeb上でも添削された日記を閲覧できます。Webで公開すると他の学習者の手助けになります。公開設定は後からでも変更可能です。',
  publish: 'Webで公開',
  submit: '投稿する',
};

const modalBlock = {
  blockedQuestion: '{{userName}}をブロックしますか？',
  blockedSuccess: '{{userName}}をブロックしました',
  unblockedQuestion: '{{userName}}のブロックを解除しますか？',
  unblockedSuccess: '{{userName}}のブロックを解除しました',
  blockedMessage:
    'ブロックした人はあなたのプロフィールや日記を見られなくなります。ブロックしたことは、相手に通知されません。',
  unblockedMessage:
    'ブロックを解除すると、この人はあなたの日記を見たり、フォローできるようになります。ブロックが解除されたことは、相手に通知されません。',
  blockedButton: 'ブロックする',
  unblockedButton: 'ブロックを解除',
  blockedEndMessage:
    'ブロックした相手のプロフィールから、いつでもブロックを解除できます。',
  unblockedEndMessage: '相手のプロフィールからいつでもブロックができます。',
};

const modalCorrectingDone = {
  title: '添削完了',
  text: '添削ありがとうございます。{{getPoints}}ポイント獲得。',
};

const modalDeleteAcount = {
  title: '退会確定処理',
  text: 'パスワードを入力して確定ボタンを押してください。',
  button: '退会する',
};

const modalDiaryCancel = {
  message: '保存されていない変更は失われます。閉じてよろしいですか？',
  button: '下書きとして保存',
};

const modalEditPublic = {
  title: '公開設定を変更する',
  description:
    'InterChaoはWeb上でも添削された日記を閲覧できます。Webで公開すると、TwitterやFacebookで添削結果を投稿することができます。また、他の学習者の手助けになります。',
  publish: 'Webで公開',
  button: '更新する',
};

const modalLackPoint = {
  title: 'ポイント不足',
  text:
    ' ポイントが足りません。日記を投稿するには600文字ごとに10ポイントが必要です。\n\n日本語の日記を添削すると10ポイントが貰えます。\n\n下書き保存はポイントの消費なしでできます。',
  submit: '続ける',
  close: '添削する日記を探す',
};

const modalSendEmail = {
  title: 'メール送信',
  text:
    'メールを送信しました。メールのリンクからパスワードを再設定してください。',
};

const modalStillCorrecting = {
  text: '途中で添削が中断されました。',
};

const modalTimeUp = {
  title: 'タイムアップ',
  text: '30分が経過したため、添削のロックを解除しました。',
};

const myDiaryCorrection = {
  header: '添削結果',
};

const myDiaryListMenu = {
  myPage: 'マイページ',
  draftList: '下書き一覧',
  reviewList: 'レビュー一覧',
};

const report = {
  title: '報告',
  subTitle: 'このアカウントを報告する理由',
  description:
    'どのアクションを実行しても、相手に通知されることはありません。差し迫った危険に直面する人がいた場合は、今すぐ地域の警察または消防機関に緊急通報してください。',
  spam: 'スパムである',
  inappropriate: '不適切である',
  reportedTitle: 'ご報告ありがとうございます',
  reportedDescription:
    'いただいた情報はインターチャオをより安全なものにするために役立たせていただきます。',
};

const postDiaryComponent = {
  usePoints: '消費ポイント',
  textLength: '文字数',
  points: '所持ポイント',
  textPlaceholder: '本文',
  draft: '下書き保存',
};

const signInUpForm = {
  email: 'メールアドレス',
  password: 'パスワード（６ケタ以上）',
  login: 'ログイン',
  forgetText: 'パスワードをお忘れの方は',
  link: 'こちら',
};

const teachDiaryCorrection = {
  header: '添削結果',
};

const tutorialCorrecting = {
  title: '添削の仕方',
  buttonText: '始める',
  text:
    '誤っている箇所を長押しして、選択して「正しい表現」と「補足」をしてあげましょう。\n\n間違っている場所がない場合は、「より良くなる表現」を教えてあげましょう。\n\nコメントは600文字に対して3つを目安に入れてあげましょう！\n\n最後にまとめとして、全体の評価をしてあげましょう！',
};

const tutorialPoints = {
  title: 'ポイントについて',
  buttonText: '始める',
  text:
    '日記を投稿するには10ポイント〜が必要です。\nレビューをすると10ポイント〜を獲得できます。\n\n消費、獲得するポイントは文字数と言語により異なります。英語は600文字ごと、日本語は200文字ごとに10ポイント消費または獲得できます。',
};

const tutorialPostDiary = {
  title: '日記の書き方',
  buttonText: '始める',
  text:
    '英語で日記を書いてみよう。 600文字ごとに10ポイントが必要です。\n\n日記を投稿するとネイティブがあなたの日記を添削してくれるかも！？日本語を勉強している人の日記を添削すると10ポイントがもらえます。お互いに言語を教え合いましょう！',
};

const tutorialTeachDiaryList = {
  title: '日本語日記一覧とは',
  buttonText: '始める',
  text1: '日本語を勉強をしているユーザの日記一覧です。\n\nステータスが',
  text2: 'のものを探して添削して10ポイントをゲットしよう。',
  textMainColor: '添削待ち',
};

// util
const cameraRoll = {
  permitTitle: 'アクセス許可が必要です',
  permitMessage: '{{name}}にカメラロールのアクセス許可が必要です',
  permitHowTo: '設定方法',
};

const diaryStatus = {
  yet: '未添削',
  correcting: '添削中',
  unread: '未読',
  yetReview: 'レビュー待ち',
};

const language = {
  ja: '日本語',
  en: '英語',
};

const ja = {
  common,
  errorMessage,
  mainTab,
  correcting,
  deleteAcount,
  draftDiary,
  editCorrectionComment,
  editCorrectionSummary,
  editEmail,
  editMyProfile,
  editPassword,
  editUserName,
  foregetPassword,
  initialize,
  inputUserName,
  myDiary,
  myDiaryList,
  myDiarySerch,
  myPage,
  notice,
  postDiary,
  postDraftDiary,
  registerEmailPassword,
  review,
  reviewList,
  selectLanguage,
  setting,
  signIn,
  signUp,
  teachDiary,
  teachDiaryList,
  teachDiarySerch,
  tutorialList,
  userProfile,
  commentCard,
  summaryCard,
  userPoints,
  userPointsBig,
  commentInput,
  correctionFooterButton,
  emptyDiary,
  emptyReview,
  languageRadioBox,
  myDiaryCorrectionFooter,
  profileLanguage,
  summaryInput,
  correctionOrigin,
  diaryHitList,
  draftListItem,
  emptyMyDiaryList,
  modalAlertCorrection,
  modalAlertPublish,
  modalBlock,
  modalCorrectingDone,
  modalDeleteAcount,
  modalDiaryCancel,
  modalEditPublic,
  modalLackPoint,
  modalSendEmail,
  modalStillCorrecting,
  modalTimeUp,
  myDiaryCorrection,
  myDiaryListMenu,
  report,
  postDiaryComponent,
  signInUpForm,
  teachDiaryCorrection,
  tutorialCorrecting,
  tutorialPoints,
  tutorialPostDiary,
  tutorialTeachDiaryList,
  cameraRoll,
  diaryStatus,
  language,
};

export default ja;
