// 共通のワード
const common = {
  cancel: 'キャンセル',
  close: '닫기',
  confirmation: '確認',
  error: 'エラー',
  done: '完了',
  edit: '編集',
  register: '등록',
  sending: '전송',
  next: '次へ',
  publish: '投稿',
  draft: '下書き保存',
  skip: '건너뛰기',
  add: '追加',
  delete: '削除',
  translation: '번역',
  back: '戻る',
};

// タブ
const mainTab = {
  myDiary: 'マイ日記',
  postDiary: '日記を書く',
  teachDiary: '{{nativeLanguage}}の日記',
};

// 共通のエラーメッセージ
const errorMessage = {
  other: 'エラーが発生しました',
  wrongPassword: '비밀번호가 일치하지 않습니다',
  invalidEmail: 'メールアドレスの形式が正しくありません',
  weakPassword: 'パスワードは6桁以上で入力してください',
  userNotFound: '입력된 이메일 주소가 존재하지 않습니다',
  emailAlreadyInUse: 'このメールアドレスはすでに登録されています',
  tooManyRequests:
    '오류 횟수가 일정 횟수를 초과했습니다. 나중에 다시 시도해 주세요',
  network: '通信エラーが発生しました。時間をおいて再度お試し下さい。',
  defaultError: 'エラーが発生しました。{{message}}',
  emptyUserName: '사용자명을 입력해 주세요',
  invalidUserName:
    '사용자명에는 영숫자, _ (밑줄문자), . (마침표) 만 사용 가능합니다',
  initialUserName: '첫번째 글자로는 영숫자만 사용 가능합니다',
  userNameAlreadyInUse: '이미 등록된 사용자명입니다',
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
    '文字数{{textLength}}の日記を投稿するには{{usePoint}}ポイントが必要です。ポイントは{{nativeLanguage}}の日記を添削することで溜めることができます。',
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
  summaryAlert: 'まとめが編集中です',
  commentAlert: 'コメントが編集中です',
  titleComment: 'コメントする',
  titleSummary: 'まとめを書く',
  titleDone: '投稿する',
  menuEdit: '編集する',
  menuCommentDelete: 'コメントを削除する',
  menuSummaryDelete: 'まとめを削除する',
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
  learn: '勉強中',
  native: '話せる言語',
  spoken: 'その他の\n話せる言語',
};

const editPassword = {
  headerTitle: 'パスワード変更',
  forgetText: '',
  link: '비밀번호를 잊어버리셨나요?',
  currentPassword: '現在のパスワード',
  newPassword: '新しいパスワード（６ケタ以上）',
};

const editUserName = {
  headerTitle: 'ユーザーネーム',
  userName: 'ユーザーネーム',
};

const foregetPassword = {
  headerTitle: '비밀번호 재설정',
  email: '이메일 주소',
  title: '이메일 주소를 입력해 주세요',
  subText: '입력한 이메일 주소로 비밀번호 변경을 위한 URL이 전송됩니다',
};

const initialize = {
  start: '시작하기',
  acount: '',
  link: '이미 계정이 있으신가요?',
};

const inputUserName = {
  headerTitle: '사용자명 등록',
  title: ' 사용자명을 입력해 주세요',
  subText: '사용자명은 언제든지 변경할 수 있습니다',
};

const myDiary = {
  menuDelete: '삭제하기',
  confirmMessage: '정말로 삭제하시겠습니까?',
};

const myDiaryList = {
  headerTitle: '내 일기 검색하기',
  diaryList: {
    one: '내 일기 리스트{{count}}건',
    other: '내 일기 리스트{{count}}건',
    zero: '내 일기 목록',
  },
};

const myDiarySerch = {
  placeholder: 'タイトルと本文で検索',
};

const myPage = {
  headerTitle: '마이 페이지',
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
  headerTitle: '下書きを編集',
};

const registerEmailPassword = {
  headerTitle: 'メールアドレス/パスワード登録',
  title: '이메일 주소와 비밀번호를 입력해 주세요',
  subText:
    '기종 변경시, 기존 데이터를 이어받기 위해 필요한 절차이며 지금 바로 원하지 않을시 나중에 등록 가능합니다.',
  email: '이메일 주소',
  password: '비밀번호 (6자리 이상)',
};

const reviewList = {
  headerTitle: '리뷰 목록',
  reviewList: '리뷰 목록',
};

const review = {
  headerTitle: '리뷰하기',
  placeholder: '코멘트 (필수사항 아님)',
  confirmation: '편집중인 리뷰가 다 삭제됩니다. 괜찮습니까?',
};

const selectLanguage = {
  headerTitle: '언어 및 국적 선택',
  title: '언어와 국적을 선택해 주세요',
  learn: '배우고 싶은 언어',
  native: '원어민 언어',
  spoken: '기타 원어민 수준의 언어',
  nationality: '국적',
  placeholder: '국적을 선택해 주세요',
  change: '변경하기',
  nationalityCodeAlert: '국적을 선택해 주세요',
  add: '추가하기',
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
};

const signIn = {
  headerTitle: '로그인',
  email: '이메일 주소',
  password: '비밀번호',
  login: '로그인',
  forgetText: '',
  link: '비밀번호를 잊어버리셨나요?',
};

const signUp = {
  headerTitle: '이메일 주소 등록',
  title: '이메일 주소와 비밀번호를 입력해 주세요',
  subText:
    '기종 변경시, 기존 데이터를 이어받기 위해 필요한 절차이며 지금 바로 원하지 않을시 나중에 등록 가능합니다.',
  email: '이메일 주소',
  password: '비밀번호 (6자리 이상)',
};

const teachDiary = {
  headerTitle: '日記',
  start: '添削する',
};

const teachDiaryList = {
  headerTitle: '{{nativeLanguage}}の日記を探す',
  diaryList: '{{nativeLanguage}}を勉強している人の日記一覧',
  empty: '日記がありません',
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
  original: '원문',
  fix: '수정문',
  detail: '코멘트',
};

const firstDiary = {
  first: '첫 업로드',
};

const summaryCard = {
  title: '총평',
};

const userPoints = {
  points: 'ポイント',
};

const userPointsBig = {
  points: '現在のポイント',
};

//  molecules
const commentInput = {
  original: '원문',
  fix: '수정문',
  detail: '코멘트',
  paste: 'クリップボードの貼り付け',
  optional: '任意',
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

const myDiaryCorrectionFooter = {
  finText: '해당 일기의 리뷰 작성이 완료되었습니다',
  title: '첨삭 리뷰하기',
  promptText: '첨삭에 대한 감사와 리뷰를 부탁드립니다',
};

const profileLanguage = {
  learn: '勉強中の言語',
  native: '話せる言語',
  spoken: 'その他の話せる言語',
};

const profileNationality = {
  nationality: '国籍',
};

const summaryInput = {
  title: '총평',
};

const inquiry = {
  headerTitle: '問合せ',
  email: '이메일 주소',
  message: 'メッセージ',
  title: 'お問い合わせありがとうございます。',
  thanks: '確認次第すぐに返信いたいします。もうしばらくお待ちください',
};

// organisms
const correctionOrigin = {
  messageIOS: '修正する箇所を選択して、添削を始めましょう',
  messageAndroid:
    '修正する箇所をコピーして\n右下の“コメントする“ボタンを押して添削を始めましょう',
};

const diaryHitList = {
  empty: '検索条件の日記がありません',
  header: '検索結果',
};

const draftListItem = {
  draft: '下書き',
};

const emptyMyDiaryList = {
  text: '일기가 없습니다.\n일기를 쓰고 원어민에게 첨삭을 받아보세요!',
  hint: '여기서 시작하세요!\n일기를 무료로\n첨삭 받을 수 있어요!',
};

const modalAlertCorrection = {
  text:
    '添削は30分以内で行ってください。30分をすぎると添削は破棄されます。\n\n添削を始めると、ロックがかかり他の人は添削できなくなります。',
  start: '添削を始める',
  checkboxText: '以後、このメッセージを表示しない',
};

const modalAlertPublish = {
  confirmation:
    '{{usePoints}}ポイントを使い日記を投稿します。一度投稿すると、編集ができませんが、よろしいですか？',
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
  text: 'パスワードを入力して確定ボタンを押してください。',
  button: '退会する',
};

const modalDiaryCancel = {
  message: '保存されていない変更は失われます。閉じてよろしいですか？',
  button: '下書きとして保存',
};

const modalLackPoint = {
  title: 'ポイント不足',
  text:
    'ポイントが足りません。日記を投稿するには{{learnCharacters}}文字ごとに10ポイントが必要です。\n\n{{nativeLanguage}}の日記を添削すると10ポイントが貰えます。\n\n下書き保存はポイントの消費なしでできます。',
  submit: '続ける',
  close: '添削する日記を探す',
};

const modalSendEmail = {
  title: '메일 전송',
  text: '메일을 전송했습니다. 링크에 접속해서 비밀번호를 재설정해 주세요',
};

const modalStillCorrecting = {
  text: '途中で添削が中断されました',
};

const modalTimeUp = {
  title: 'タイムアップ',
  text: '30分が経過したため、添削のロックを解除しました',
};

const myDiaryCorrection = {
  header: '첨삭 결과',
  hide: '숨기기',
  show: '표시하기',
};

const myDiaryListMenu = {
  myPage: '마이 페이지',
  draftList: '임시 보관함',
  reviewList: '리뷰 목록',
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
  title: '앱을 SNS로 공유하기',
};

const teachDiaryCorrection = {
  header: '첨삭 결과',
};

const tutorialCorrecting = {
  subTitle: 'やり方',
  title: '添削方法',
  text1:
    '日記の中で誤っている箇所、またはネイティブから見ると違和感がある箇所を探しましょう！添削は全て{{nativeLanguage}}で行ってください',
  subText1IOS:
    '① 対象の文章を長押しして、範囲を指定\n② 画面の右上にある“コメントする“をクリック',
  subText1Android:
    '① 対象の文章を選択して、コピー\n② 画面の右下にある“コメントする“をクリック',
  text2: '正しい文章を教えてあげましょう',
  subText2IOS:
    '① 修正文に正しい表現/自然な表現を書く\n② コメントに補足を書く\n③ “追加“をクリック',
  subText2Android:
    '① 原文を書く（“クリップボードの貼り付け“をクリック）\n② 修正文に正しい表現/自然な表現を書く\n③ コメントに補足を書く\n④ “追加“をクリック',
  text3:
    'コメントは{{nativeCharacters}}文字に対して3つを目安に書きましょう。コメントの記載が終わったら画面の右上にある“まとめを書く“をクリック',
  text4: '日記の全体の感想などを書きましょう',
  subText4: '① まとめを書く\n② “追加“をクリック',
  text5: '修正や削除はカードの右上のメニューアイコンをクリックするとできます',
  text6: '添削内容を確認して、最後に画面の右上にある“投稿する“をクリック',
  text7: '以上です！早速添削を始めましょう',
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
    '{{learnLanguage}}で日記を書いてみよう。{{learnCharacters}}文字ごとに10ポイントが必要です。\n\n日記を投稿するとネイティブがあなたの日記を添削してくれるかも！？また{{nativeLanguage}}の日記を添削すると10ポイントがもらえます。お互いに言語を教え合いましょう！',
};

const tutorialTeachDiaryList = {
  title: '{{nativeLanguage}}の日記とは',
  buttonText: '始める',
  text1:
    'あなたが教えることができる言語を勉強をしているユーザの日記一覧です。1つの日記につき最大3人まで添削が可能です。\n\nステータスが',
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
  yet: '첨삭 대기중',
  correcting: '첨삭중',
  unread: '안읽음',
  yetReview: '리뷰 대기중',
};

const userDiaryStatus = {
  yet: '첨삭 안됨',
  correcting: '첨삭중',
  done: '{{correctedNum}}/3 첨삭 완료',
};

const language = {
  ja: '日本語',
  en: '英語',
  zh: '簡体中国語',
};

const ko = {
  common,
  errorMessage,
  mainTab,
  app,
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
  firstDiary,
  summaryCard,
  userPoints,
  userPointsBig,
  commentInput,
  correctionFooterButton,
  emptyDiary,
  emptyReview,
  myDiaryCorrectionFooter,
  profileLanguage,
  profileNationality,
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
  tutorialCorrecting,
  tutorialPoints,
  tutorialPostDiary,
  tutorialTeachDiaryList,
  cameraRoll,
  myDiaryStatus,
  userDiaryStatus,
  language,
  inquiry,
};

export default ko;
