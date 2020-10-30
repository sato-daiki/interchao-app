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
  translation: '翻訳',
  speech: '読む',
  copy: 'コピー',
  slow: '遅く',
  back: '戻る',
};

// web
const helmet = {
  keyword:
    '英語,中国語,簡体字,韓国語,語学学習,勉強,学習,日記,言語交換,添削,外国語',
  description:
    '日本語、英語、中国語、韓国語を無料で勉強することができる相互学習アプリ。あなたが書いた日記をネイティブにチェックしてもらえます。代わりにあなたがネイティブの言語を先生としてチェックしてあげましょう',
  ogTitle: 'Interchao-ネイティブに日記を添削してもらえるアプリ',
  ogDescription:
    '日本語、英語、中国語、韓国語を無料で勉強することができる相互学習アプリ。あなたが書いた日記をネイティブにチェックしてもらえます。代わりにあなたがネイティブの言語を先生としてチェックしてあげましょう',
};

const web = {
  firstViewTitle: '話す"は、"書く"から"',
  firstViewSubTitle: 'ネイティブに日記を添削してもらえるアプリ',
  firstViewStart: 'Interchaoを始めよう',
  wahtTitle: 'What is Interchao?',
  wahtText1:
    'Interchaoとは日本語、英語、中国語、韓国語を無料で勉強することができる相互学習アプリ',
  wahtText2:
    'あなたが書いた日記をネイティブにチェックしてもらえます。代わりにあなたがネイティブの言語を先生としてチェックしてあげましょう',
  whyTitle: '書くことが必要な理由',
  whyText: '文章を書くことは語学学習において最適な方法です',
  whyCnatText1: '「How are you?」',
  whyCnatText2: "「I'm fine,thank you,and you?」",
  whyCnatText3: "「I'm fine...(どうしよう、ここから会話が進まない)」",
  reasonTitle1: '書けない文章は話せない',
  reasonText11: '文章で書けないことを話すことはできません',
  reasonText12: '書くことはスピーキングのトレーニングにもなります',
  reasonTitle2: 'ネイティブにみてもらう',
  reasonText21: 'せっかく文章を書いても間違っているかもしれません',
  reasonText22:
    '文法/単語は正しいか？相手に意味が伝わるか？などをネイティブにチェックしてもらいましょう',
  reasonTitle3: '自分の言葉で書く',
  reasonText31: '教科書や映画のセリフを勉強しても日常生活では使えません',
  reasonText32:
    'あなたの言葉をアウトプットすることにより、あなたが普段使う言葉を学習することができます',
  correctTitle: '日記を添削してポイントGET！',
  correctText1:
    ' あなたのネイティブな言語の日記を添削すると10ポイント貯まります。この10ポイントを使って日記を書こう！',
  exampleTitle: '添削事例',
  exampleText: '実際の添削事例をご紹介​',
  exampleDetailTitle1: 'あなたが作成した日記​',
  exampleDetailText1: '早速日記を投稿！​​',
  exampleDetailTitle2: '添削結果',
  exampleDetailText2: '間違った表現を箇所を指摘してもらいました',
  exampleDetailTitle3: '日記の総評​​',
  exampleDetailText3: '最後に総評をもらいました',
  startTitle: 'さっそく始めてみよう',
  startText:
    'アプリインストールで100pt（10日記分）が貰えます。早速日記を書いて添削してもらおう！',
};

const modalAppSuggestion = {
  title: 'Interchaoアプリがおすすめ',
  text:
    '届いた添削を見逃さない。Interchaoアプリで開くと全ての機能をより快適に使えます。',
};

// タブ
const mainTab = {
  myDiary: 'マイ日記',
  postDiary: '日記を書く',
  teachDiary: '添削する日記',
  myPage: 'マイページ',
};

// 共通のエラーメッセージ
const errorMessage = {
  other: 'エラーが発生しました',
  wrongPassword: 'パスワードが違います',
  invalidEmail: 'メールアドレスの形式が正しくありません',
  weakPassword: 'パスワードは6桁以上で入力してください',
  userNotFound: 'メールアドレスが存在しません',
  emailAlreadyInUse: 'このメールアドレスはすでに登録されています',
  tooManyRequests:
    'エラーの数が一定数を超えました。時間をおいてから再度お試しください',
  network: '通信エラーが発生しました。時間をおいて再度お試し下さい。',
  defaultError: 'エラーが発生しました。{{message}}',
  emptyUserName: 'ユーザーネームを入力してください',
  invalidUserName:
    'ユーザーネームは半角英数字と_（アンダーバー）と.（ピリオド）以外使えません',
  initialUserName: '先頭の文字は半角英数字以外使えません',
  userNameAlreadyInUse:
    'すでにこのユーザーネームを使用しているユーザーがいます',
  notFound: 'ページが開けません。エラーが発生しました',
  cantLogout: 'メールアドレスが登録されていないため、ログアウトできません。',
  invalidRaiting: '星は1〜5で入力してください',
  correctionAlready:
    'この日記は他の人が添削を始めました。他の日記を再度検索ください。',
  deleteTargetUser:
    'このページは開けません。対象のユーザは削除された可能性があります。',
  deleteTargetPage:
    'このページは開けません。対象のページは削除された可能性があります。',
  emptyTitile: 'タイトルが入力されていません',
  emptyText: '本文が入力されていません',
  emptyEmail: 'メールアドレスが入力されていません',
  emptyMessage: 'メッセージが入力されていません',
  lackPointsTitle: 'ポイント不足',
  lackPointsText:
    '文字数{{textLength}}の日記を投稿するには{{usePoint}}ポイントが必要です。ポイントは日記を添削することで溜めることができます',
  exceedingCharacter:
    '文字数オーバーです。{{textLength}}以下で投稿してください',
};
const app = {
  updateTitle: '最新版が利用可能です',
  updateMessage: 'アプリを最新版に更新してください',
  updateOk: 'アプリを更新',
};

// 各画面ごとの文字
const correcting = {
  headerTitle: '添削する',
  header: '他の人の添削一覧',
  deleteAlert: '編集中の添削は全て削除されますが、よろしいでしょうか？',
  titleDone: '投稿する',
  nothing: '修正がありません',
  summary: 'まとめ',
};

const deleteAcount = {
  headerTitle: '退会について',
  text:
    '退会すると投稿した日記の情報が完全に消去され、復元することはできません。\n\nそれでも退会を希望する方は下のボタンから退会してください。',
  withdrawal: '退会する',
  confirmation: '本当に退会してもよろしいですか？',
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

const editEmail = {
  headerTitle: 'メールアドレス変更',
  title: '新しいメールアドレスを入力してください',
  labelEmail: '新しいメールアドレス',
  labelPassword: '現在のパスワード',
};

const editMyProfile = {
  headerTitle: 'プロフィール変更',
  name: '名前',
  userName: 'ユーザーネーム',
  placeholderIntroduction: '自己紹介(200字以内)',
  learn: '勉強中',
  native: '話せる言語',
  spoken: 'その他の\n話せる言語',
  imageButton: '画像を変更する',
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
  subText: 'このユーザーネームはいつでも変更できます',
};

const myDiary = {
  menuDelete: '削除する',
  confirmMessage: '本当に削除してよろしいでしょうか？',
  posted: '投稿済',
  fairCopy: '清書',
  closeAlert: '保存されていない変更は失われます。閉じてよろしいですか？',
  permissionAudio:
    'マイクの権限がないため、起動できません。設定画面からマイクの設定をONにしてください',
  voiceTitle: '音読トレーニング',
  myVoice: '自分の音声を聞く',
  machine: '機械の音声を聞く',
  record: '録音する',
  recommend: '効率的な勉強方法とは？',
};

const myDiaryList = {
  headerTitle: 'マイ日記',
  searchText: 'マイ日記を探す',
  diaryList: {
    one: 'マイ日記一覧{{count}}件',
    other: 'マイ日記一覧{{count}}件',
    zero: 'マイ日記一覧',
  },
  notficationSetting:
    'Interchaoアプリの通知がオフになっています。日記の添削が届いた時にチェックできるように、『設定』から『通知』をオンにしましょう',
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
  finishCorrection: '日記の添削が届く',
  finishReview: 'レビューが届く',
  push: 'プッシュ通知',
  mail: 'メール通知',
  operation: '運営からのお知らせ',
  noMail:
    '※メールアドレスが登録されていません。メール通知を利用する場合は、メールアドレス/パスワード登録画面から設定してください',
};

const postDiary = {
  headerTitle: '新規日記',
};

const postDraftDiary = {
  headerTitle: '下書きを編集',
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
  placeholder: 'コメント （任意）',
  confirmation: '編集中のレビューは全て削除されますが、よろしいでしょうか？',
};

const selectLanguage = {
  headerTitle: '言語と国籍の選択',
  title: '言語と国籍を選択してください',
  learn: '学びたい言語',
  native: '話せる言語',
  spoken: 'その他の話せる言語',
  nationality: '国籍',
  placeholder: '国籍を選択してください',
  change: '変更する',
  nationalityCodeAlert: '国籍を選択してください',
  sameLanguageAlert: '"学びたい言語"と"話せる言語"は別の言語を選択してください',
  sameSpokenAlert:
    '"学びたい言語"と"話せる言語"と"その他の話せる言語"は別の言語を選択してください',
  add: '追加する',
};

const setting = {
  headerTitle: '設定',
  title: '基本設定',
  notice: '通知',
  editEmail: 'メールアドレスの変更',
  editPassword: 'パスワードの変更',
  registerEmailPassword: 'メールアドレス/パスワードの登録',
  tutorial: 'チュートリアル',
  deleteAcount: '退会について',
  logout: 'ログアウト',
  inquiry: 'お問い合わせ',
  about: 'Interchaoとは',
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
  headerTitle: '日記',
  start: '添削する',
};

const teachDiaryList = {
  headerTitle: '日記一覧',
  searchText: '日記を探す',
  diaryList: 'あなたが話せる言語の日記一覧',
  empty: '日記がありません',
};

const teachDiarySerch = {
  searchBar: 'タイトルと本文で検索',
};

const tutorialList = {
  headerTitle: 'チュートリアル一覧',
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

const notFound = {
  text: 'お探しのページは見つかりませんでした',
  link: 'Topへ',
};

const record = {
  headerTitle: '録音',
  confirmMessage: '削除してよろしいでしょうか？',
  save: '保存する',
  delete: '削除する',
  notSave: '2分以上の音声は保存できません',
};

// atoms
const commentCard = {
  original: '原文',
  fix: '修正文',
  detail: 'コメント',
  optional: '任意',
};

const firstDiary = {
  first: '初投稿',
};

const userPoints = {
  points: 'ポイント',
};

const userPointsBig = {
  points: '現在のポイント',
};

//  molecules
const emptyDiary = {
  empty: '日記がまだ投稿されていません。',
};

const emptyReview = {
  empty: 'レビューはまだありません',
};

const myDiaryCorrectionFooter = {
  finText: 'この日記はレビュー済みです',
  title: '添削のレビューをする',
  promptText: '添削のお礼とレビューをお願いします',
};

const profileLanguage = {
  learn: '勉強中の言語',
  native: '話せる言語',
  spoken: 'その他の話せる言語',
};

const profileNationality = {
  nationality: '国籍',
};

const inquiry = {
  headerTitle: '問合せ',
  email: 'メールアドレス',
  message: 'メッセージ',
  title: 'お問い合わせありがとうございます。',
  thanks: '確認次第すぐに返信いたいします。もうしばらくお待ちください',
};

// organisms
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
  text1: '添削は全て',
  text2:
    'で行ってください。\n\n添削は30分以内で行ってください。30分をすぎると添削は破棄されます。\n\n添削を始めると、ロックがかかり他の人は添削できなくなります。',
  start: '添削を始める',
};

const modalAlertPublish = {
  confirmation:
    '{{usePoints}}ポイントを使い日記を投稿します。一度投稿すると、編集ができませんが、よろしいですか？',
  submit: '投稿する',
  publish: '日記が公開されました',
  share: '公開した日記を\nみんなに教えてあげましょう',
  first:
    '初回の投稿おつかれさまです\n添削を待ちましょう！\n明日からも頑張りましょう',
  runningDays: '{{runningDays}}日連続の投稿です\n素晴らしい！',
  runningWeeks: '{{runningWeeks}}週連続の投稿です\nこれからも継続しましょう',
  good: '投稿おつかれさまです\n明日も頑張りましょう！',
};

const modalAppReviewRequest = {
  title: 'Interchaoの\n応援をお願いします！',
  improveTitle: 'Interchaoの\n機能改善にご協力お願いします！',
  text:
    'いつもInterchaoをご利用いただきありがとうございます。さらなる改善のため、ご意見をお聞かせください',
  thanks:
    'コメントありがとうございました。改善に役立たせていただきます。今後ともInterchaoをよろしくお願いします。',
  improve: '改善して欲しいことを書く',
  review: 'レビューする',
  notYet: 'いまはレビューを書かない',
  never: 'レビューしない',
  supplement: '☆をタップして評価してください',
};

const modalBlock = {
  blockedQuestion: '{{userName}}をブロックしますか？',
  blockedSuccess: '{{userName}}をブロックしました',
  unblockedQuestion: '{{userName}}のブロックを解除しますか？',
  unblockedSuccess: '{{userName}}のブロックを解除しました',
  blockedMessage:
    'ブロックした人はあなたのプロフィールや日記を見られなくなります。ブロックしたことは、相手に通知されません。',
  unblockedMessage:
    'ブロックを解除すると、この人はあなたのプロフィールや日記を見ることができるようになります。ブロックが解除されたことは、相手に通知されません。',
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
  title: '退会',
  text: 'パスワードを入力して"退会する"ボタンを押してください。',
  button: '退会する',
};

const modalDiaryCancel = {
  message: '保存されていない変更は失われます。閉じてよろしいですか？',
  button: '下書きとして保存',
};

const modalLackPoint = {
  title: 'ポイント不足',
  text:
    'ポイントが足りません。日記を投稿するには{{learnCharacters}}文字ごとに10ポイントが必要です。\n\n日記を添削すると10ポイントが貰えます。\n\n下書き保存はポイントの消費なしでできます。',
  submit: '続ける',
  close: '添削する日記を探す',
};

const modalSendEmail = {
  title: 'メール送信',
  text:
    'メールを送信しました。メールのリンクからパスワードを再設定してください',
};

const modalStillCorrecting = {
  text: '途中で添削が中断されました',
};

const modalTimeUp = {
  title: 'タイムアップ',
  text: '30分が経過したため、添削のロックを解除しました',
};

const myDiaryCorrection = {
  header: '添削結果',
  hide: '隠す',
  show: '表示する',
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
    'いただいた情報はInterchaoをより安全なものにするために役立たせていただきます。',
};

const postDiaryComponent = {
  usePoints: '消費ポイント',
  textLength: '文字数',
  points: '所持ポイント',
  textPlaceholder: '本文',
  draft: '下書き保存',
};

const sns = {
  app: 'アプリをSNSでシェア',
  diary: '日記をSNSでシェア',
};

const teachDiaryCorrection = {
  header: '添削結果',
};

const tutorialPoints = {
  title: 'ポイントについて',
  buttonText: '始める',
  text:
    '日記を投稿するには10ポイント〜が必要です。\nレビューをすると10ポイント〜を獲得できます。\n\n消費、獲得するポイントは文字数と言語により異なります。',
};

const tutorialPostDiary = {
  title: '日記の書き方',
  buttonText: '始める',
  text:
    '{{learnLanguage}}で日記を書いてみよう。{{learnCharacters}}文字ごとに10ポイントが必要です。\n\n日記を投稿するとネイティブがあなたの日記を添削してくれるかも！？またあなたが話せる言語の日記を添削すると10ポイントがもらえます。お互いに言語を教え合いましょう！',
};

const tutorialTeachDiaryList = {
  title: '添削する日記とは',
  buttonText: '始める',
  text1:
    'あなたが話せる言語の日記一覧です。1つの日記につき最大3人まで添削が可能です。\n\nステータスが',
  text2:
    'の日記を優先的に添削お願いします。添削すると10ポイントが手に入ります。',
  textMainColor: '未添削',
};

// util
const cameraRoll = {
  permitTitle: 'アクセス許可が必要です',
  permitMessage: 'Interchaoにカメラロールのアクセス許可が必要です',
  permitHowTo: '設定方法',
};

const myDiaryStatus = {
  yet: '添削待ち',
  correcting: '添削中',
  unread: '未読',
};

const userDiaryStatus = {
  yet: '未添削',
  correcting: '添削中',
  done: '{{correctedNum}}/3 添削完了',
};

const language = {
  ja: '日本語',
  en: '英語',
  zh: '中国語（簡体字）',
  ko: '韓国語',
};

const ja = {
  common,
  web,
  helmet,
  modalAppSuggestion,
  errorMessage,
  mainTab,
  app,
  correcting,
  deleteAcount,
  draftDiary,
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
  notFound,
  record,
  commentCard,
  firstDiary,
  userPoints,
  userPointsBig,
  emptyDiary,
  emptyReview,
  myDiaryCorrectionFooter,
  profileLanguage,
  profileNationality,
  diaryHitList,
  draftListItem,
  emptyMyDiaryList,
  modalAlertCorrection,
  modalAlertPublish,
  modalAppReviewRequest,
  modalBlock,
  modalCorrectingDone,
  modalDeleteAcount,
  modalDiaryCancel,
  modalLackPoint,
  modalSendEmail,
  modalStillCorrecting,
  modalTimeUp,
  myDiaryCorrection,
  myDiaryListMenu,
  report,
  postDiaryComponent,
  sns,
  teachDiaryCorrection,
  tutorialPoints,
  tutorialPostDiary,
  tutorialTeachDiaryList,
  cameraRoll,
  myDiaryStatus,
  userDiaryStatus,
  language,
  inquiry,
};

export default ja;
