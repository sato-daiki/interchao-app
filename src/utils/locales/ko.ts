// 共通のワード
const common = {
  cancel: '취소',
  close: '닫기',
  confirmation: '확인',
  error: '오류',
  done: '완료',
  edit: '편집',
  register: '등록',
  sending: '전송',
  next: 'Next',
  publish: '업로드',
  draft: '임시 보관함',
  skip: '건너뛰기',
  add: '추가',
  delete: '삭제',
  translation: '번역',
  back: 'Back',
};

// タブ
const mainTab = {
  myDiary: '내 일기',
  postDiary: '일기 쓰기',
  teachDiary: '첨삭하는 일기',
};

// 共通のエラーメッセージ
const errorMessage = {
  other: '오류가 발생했습니다.',
  wrongPassword: '비밀번호가 일치하지 않습니다',
  invalidEmail: '이메일 주소 형식이 올바르지 않습니다',
  weakPassword: '비밀번호는 6 자리 이상으로 입력',
  userNotFound: '입력된 이메일 주소가 존재하지 않습니다',
  emailAlreadyInUse: '이 이메일 주소는 이미 등록되어 있습니다',
  tooManyRequests:
    '오류 횟수가 일정 횟수를 초과했습니다. 나중에 다시 시도해 주세요',
  network: '통신 오류가 발생했습니다. 시간을두고 다시 시도해주십시오.',
  defaultError: '오류가 발생했습니다. {{message}}',
  emptyUserName: '사용자명을 입력해 주세요',
  invalidUserName:
    '사용자명에는 영숫자, _ (밑줄문자), . (마침표) 만 사용 가능합니다',
  initialUserName: '첫번째 글자로는 영숫자만 사용 가능합니다',
  userNameAlreadyInUse: '이미 등록된 사용자명입니다',
  notFound: '페이지를 열 수 없습니다. 오류가 발생했습니다',
  cantLogout: '이메일 주소가 등록되어 있지 않기 때문에 로그아웃할 수 없습니다.',
  invalidRaiting: '별은 1〜5로 입력해주세요',
  correctionAlready:
    '해당 일기는 이미 다른 사용자가 첨삭을 시작했습니다. 다른 일기를 검색해 주세요.',
  deleteTargetUser:
    '계정이 삭제되었을 가능성이 있는 사용자로 정보를 찾을 수 없습니다.',
  deleteTargetPage: '해당 페이지가 삭제되었을 가능성이 있어 찾을 수 없습니다.',
  emptyTitile: '제목이 입력되지 않았습니다.',
  emptyText: '본문이 작성되지 않았습니다.',
  emptyEmail: '이메일 주소가 입력되지 않았습니다.',
  emptyMessage: '메시지가 입력되지 않았습니다.',
  lackPointsTitle: '포인트 부족',
  lackPointsText:
    '글자수{{textLength}인 일기를 업로드하려면 {{usePoint}}포인트가 필요합니다. 포인트는 일기를 첨삭하면 얻을 수 있습니다.',
};
const app = {
  updateTitle: '최신버전으로 이용가능합니다',
  updateMessage: '앱을 최신버전으로 업데이트해주세요',
  updateOk: '앱 업데이트',
};

// 各画面ごとの文字
const correcting = {
  headerTitle: '첨삭하기',
  header: '다른 사용자의 첨삭 목록',
  deleteAlert: '편집중인 첨삭이 모두 삭제됩니다. 그래도 괜찮으십니까?',
  summaryAlert: '총평이 편집중입니다',
  commentAlert: '코멘트가 편집중입니다',
  titleComment: '코멘트하기',
  titleSummary: '총평 쓰기',
  titleDone: '업로드하기',
  menuEdit: '편집하기',
  menuCommentDelete: '코멘트 삭제하기',
  menuSummaryDelete: '총평 삭제하기',
  commentList: '코멘트 목록',
};

const deleteAcount = {
  headerTitle: '회원 탈퇴에 대해서',
  text:
    '회원을 탈퇴하면 업로드된 일기 정보가 완전히 삭제되어 복원할 수 없습니다.\n\n그래도 회원 탈퇴를 원하시는 분은 하단에 있는 버튼을 눌러 탈퇴해주세요.',
  withdrawal: '탈퇴하기',
};

const draftDiary = {
  headerTitle: '임시 보관함',
  diaryList: {
    one: '임시 보관함{{count}}건',
    other: '임시 보관함{{count}}건',
    zero: '임시 보관함',
  },
  empty: '임시 보관함에 일기가 없습니다',
};

const editCorrectionComment = {
  headerTitle: '코멘트 삭제하기',
};

const editCorrectionSummary = {
  headerTitle: '총평 편집하기',
};

const editEmail = {
  headerTitle: '이메일 주소 변경',
  title: '새로운 이메일 주소를 입력해 주세요',
  labelEmail: '새로운 이메일 주소',
  labelPassword: '현재 비밀번호',
};

const editMyProfile = {
  headerTitle: '프로필 변경',
  name: '이름',
  userName: '사용자명',
  placeholderIntroduction: '자기소개 (200글자 이내)',
  learn: '공부중',
  native: '원어민',
  spoken: '기타 할 줄 아는 언어',
};

const editPassword = {
  headerTitle: '암호 변경',
  forgetText: '',
  link: '비밀번호를 잊어버리셨나요?',
  currentPassword: '현재 비밀번호',
  newPassword: '새로운 비밀번호 (6자리 이상)',
};

const editUserName = {
  headerTitle: '사용자명',
  userName: '사용자명',
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
  placeholder: '제목 및 본문으로 검색',
};

const myPage = {
  headerTitle: '마이 페이지',
  editButton: '편집하기',
};

const notice = {
  headerTitle: '알림',
  finishCorrection: '내 일기 첨삭 완료 시',
  finishReview: '리뷰 도착 시',
};

const postDiary = {
  headerTitle: '새로운 일기',
};

const postDraftDiary = {
  headerTitle: '작성중인 일기 수정하기',
};

const registerEmailPassword = {
  headerTitle: '이메일 주소/비밀번호 등록',
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
  sameLanguageAlert:
    '"배우고 싶은 언어"와 "원어민 언어"는 다른 언어를 선택하십시오',
  add: '추가하기',
};

const setting = {
  headerTitle: '설정',
  title: '기본 설정',
  notice: '알림',
  editEmail: '이메일 주소 변경',
  editPassword: '비밀번호 변경',
  registerEmailPassword: '이메일 주소/비밀번호 등록',
  tutorial: '튜토리얼',
  deleteAcount: '회원 탈퇴',
  logout: '로그아웃',
  inquiry: '문의',
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
  headerTitle: '일기',
  start: '첨삭하기',
};

const teachDiaryList = {
  headerTitle: '일기 찾기',
  diaryList: '당신이 원어민 언어의 일기 목록',
  empty: '일기가 없습니다',
};

const teachDiarySerch = {
  searchBar: '제목 및 본문으로 검색',
};

const tutorialList = {
  headerTitle: '튜토리얼 목록',
  correcting: '첨삭 방법',
  postDiary: '일기를 쓰는 방법',
  points: '포인트에 대해서',
};

const userProfile = {
  headerTitle: '프로필',
  moreRead: '{{count}}건의 리뷰를 모두 보기',
  blocked: '차단',
  unBlocked: '차단 해제',
  report: '신고',
  diaryList: {
    one: '일기 목록{{count}}건',
    other: '일기 목록{{count}}건',
    zero: '일기 목록',
  },
  topReview: '최신리뷰',
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
  points: '포인트',
};

const userPointsBig = {
  points: '현재 포인트',
};

//  molecules
const commentInput = {
  original: '원문',
  fix: '수정문',
  detail: '코멘트',
  paste: '붙여넣기',
  optional: '필수사항 아님',
};

const correctionFooterButton = {
  correction: '첨삭 방법',
};

const emptyDiary = {
  empty: '일기가 아직 없습니다.',
};

const emptyReview = {
  empty: '리뷰가 아직 없습니다',
};

const myDiaryCorrectionFooter = {
  finText: '해당 일기의 리뷰 작성이 완료되었습니다',
  title: '첨삭 리뷰하기',
  promptText: '첨삭에 대한 감사와 리뷰를 부탁드립니다',
};

const profileLanguage = {
  learn: '공부중인 언어',
  native: '원어민 언어',
  spoken: '기타 할 줄 아는 언어',
};

const profileNationality = {
  nationality: '국적',
};

const summaryInput = {
  title: '총평',
};

const inquiry = {
  headerTitle: '문의',
  email: '이메일 주소',
  message: 'Message',
  title: '문의 감사합니다.',
  thanks: '확인하는대로 즉시 회신합니다. 조금만 더 기다려보세요',
};

// organisms
const correctionOrigin = {
  messageIOS: '수정할 부분을 선택하여 첨삭을 시작합시다',
  messageAndroid:
    '수정할 부분을 복사하고 오른쪽 아래의\n"Plus"버튼을 눌러 첨삭을 시작합시다',
};

const diaryHitList = {
  empty: '검색한 조건에 맞는 일기를 찾을 수 없습니다',
  header: '검색 결과',
};

const draftListItem = {
  draft: '임시 보관함',
};

const emptyMyDiaryList = {
  text: '일기가 없습니다.\n일기를 쓰고 원어민에게 첨삭을 받아보세요!',
  hint: '여기서 시작하세요!\n일기를 무료로\n첨삭 받을 수 있어요!',
};

const modalAlertCorrection = {
  text1: '첨삭은 모두 ',
  text2:
    '로 해 주세요. 첨삭은 30분내로 끝내주세요.\n\n30분이 지나면 작성중인 첨삭 건이 사라지게 됩니다.\n\n한 사용자가 첨삭을 진행하는 일정 시간 동안에는 다른 사용자가 첨삭에 참여할 수 없습니다.',
  start: '첨삭 시작하기',
};

const modalAlertPublish = {
  confirmation:
    '{{usePoints}}포인트를 사용해 일기를 업로드합니다. 한번 업로드하면 편집 할 수 없습니다. 그래도 계속 하시겠습니까?',
  submit: '업로드하기',
};

const modalBlock = {
  blockedQuestion: '계정 차단',
  blockedSuccess: '{{userName}} 님 차단 함',
  unblockedQuestion: '{{userName}}님을 차단 해제 하시겠어요?',
  unblockedSuccess: '{{userName}} 차단 해제 됨',
  blockedMessage:
    '상대방은 Interchao에서 회원님의 프로필, 게시물 또는 스토리를 찾을 수 없습니다. Interchao은 회원님이 차단 한 사실을 상대 방에게 알리지 않습니다',
  unblockedMessage:
    '이제 상대방은 Interchao에서 회원님에게 팔로우를 요청할 수 있습니다. Interchao에서는 회원님이 차단 해제 한 사실을 상대방에게 알리지 않습니다.',
  blockedButton: '차단',
  unblockedButton: '차단 해제',
  blockedEndMessage: '상대의 프로필에서 언제든지 차단 해제 할 수 있습니다.',
  unblockedEndMessage: '상대방의 프로필에서 언제든지 차단할 수 있습니다.',
};

const modalCorrectingDone = {
  title: '첨삭 완료',
  text: '첨삭 감사합니다. {{getPoints}}포인트 획득.',
};

const modalDeleteAcount = {
  title: '회원 탈퇴',
  text: '비밀번호를 입력하고 "확정" 버튼을 눌러주세요.',
  button: '탈퇴하기',
};

const modalDiaryCancel = {
  message: '저장되지 않은 사항은 사라집니다. 그래도 계속 하시겠습니까?',
  button: '임시 보관함 저장',
};

const modalLackPoint = {
  title: '포인트 부족',
  text:
    '포인트가 부족합니다. 일기를 업로드하려면 {{learnCharacters}}글자마다 10포인트가 필요합니다.\n\n임시보관함에서는 포인트 사용없이 저장할 수 있습니다.',
  submit: '계속하기',
  close: '첨삭이 필요한 일기 찾기',
};

const modalSendEmail = {
  title: '메일 전송',
  text: '메일을 전송했습니다. 링크에 접속해서 비밀번호를 재설정해 주세요',
};

const modalStillCorrecting = {
  text: '중간에 첨삭이 중단되었습니다',
};

const modalTimeUp = {
  title: '타임업',
  text: '30분이 경과되어 다른 사용자에게 첨삭권이 넘어갔습니다',
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
  title: '신고',
  subTitle: '이 계정을 신고하는 이유는 무엇인가요?',
  description:
    '어떤 옵션을 선택해도 상대방은이를 알 수 없습니다. 누군가가 위급 한 상황에 있다고 생각 된다면 즉시 현지 응급 서비스 기관에 연락하시기 바랍니다.',
  spam: '스팸',
  inappropriate: '부적절합니다',
  reportedTitle: '알려 주셔서 고맙습니다',
  reportedDescription:
    '회원님의 소중한 의견은 Interchao 커뮤니티를 안전하게 유지하는 데 도움이됩니다.',
};

const postDiaryComponent = {
  usePoints: '소비 포인트',
  textLength: '글자수',
  points: '현재 포인트',
  textPlaceholder: '본문',
  draft: '임시 보관함 저장',
};

const sns = {
  title: '앱을 SNS로 공유하기',
};

const teachDiaryCorrection = {
  header: '첨삭 결과',
};

const tutorialCorrecting = {
  subTitle: '방법',
  title: '첨삭 방법',
  text1:
    '일기 중에 잘못된 부분 혹은 어색한 부분을 찾아보세요! 첨삭은 모두 {{teachDiaryLanguage}}로 해 주세요',
  subText1IOS:
    '① 해당 문장을 길게 눌러 범위를 지정하기\n② 화면 오른쪽 위의 "코멘트하기" 버튼을 클릭하기',
  subText1Android:
    '① 해당 문장을 선택하여 복사하기\n② 화면 오른쪽 위의 "코멘트하기" 버튼을 클릭하기',
  text2: '알맞은 문장으로 고쳐주세요!',
  subText2IOS:
    '① "수정문"에 알맞은 표현/자연스러운 표현 쓰기\n② "코멘트"에 해설 쓰기\n③ "추가하기" 버튼 클릭하기',
  subText2Android:
    '① 원문 쓰기 ("클립보드 붙여놓기"를 클릭)\n② "수정문"에 알맞은 표현/자연스러운 표현 쓰기\n③ "코멘트"에 해설 쓰기\n④ "추가하기" 버튼 클릭하기',
  text3:
    '코멘트는 {{teachDiaryCharacters}}글자에 대해 최대한 3개를 골라서 씁시다. 코멘트를 입력하면 회면 오른쪽 위의 "총평 쓰기" 클릭',
  text4: '일기에 대한 전체적인 소감을 씁시다.',
  subText4: '① 총평 쓰기\n② "추가하기" 버튼 클릭',
  text5:
    '수정 및 삭제는 오른쪽 상단의 메뉴 아이콘을 클릭하여 진행할 수 있습니다',
  text6:
    '첨삭 내용을 확인후, 마지막으로 화면 오른쪽 상단의 "업로드하기"를 클릭',
  text7: '첨삭 방법 안내가 끝났습니다! 바로 첨삭을 시작해 보세요!',
};

const tutorialPoints = {
  title: '포인트에 대해서',
  buttonText: '시작하기',
  text:
    '일기를 업로드하려면 최소 10포인트〜 필요합니다.\n 리뷰를 쓰면 최소 10포인트〜 획득할 수 있습니다.\n\n 소비 및 획득하게 될 포인트는 글자수와 언어에 따라 달라집니다.',
};

const tutorialPostDiary = {
  title: '일기 작성 방법',
  buttonText: '시작하기',
  text:
    '{{learnLanguage}}로 일기를 써보세요. {{learnCharacters}}글자마다 10포인트가 필요합니다. 일기를 업로드한 후에는 원어민이 첨삭을 해줍니다. 당신이 원어민 언어의 일기를 첨삭하면 10포인트를 받을 수 있습니다. 서로에게 든든한 언어 선생님이 되어주세요!',
};

const tutorialTeachDiaryList = {
  title: '첨삭하는 일기',
  buttonText: '시작하기',
  text1:
    '당신이 원어민 언어의 일기 목록입니다. 일기 한개당 최대 3명까지 첨삭이 가능합니다. \n\n상태가',
  text2:
    '인 일기를 우선적으로 첨삭해주세요. 첨삭을 완료하면 10포인트를 받을 수 있습니다.',
  textMainColor: ' 첨삭 안됨',
};

// util
const cameraRoll = {
  permitTitle: '접근 허용이 필요합니다',
  permitMessage:
    'Interchao는 기기의 사진, 미디어, 파일에 대한 접근 허용을 필요로 합니다',
  permitHowTo: '설정 방법',
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
  ja: '일본어',
  en: '영어',
  zh: '중국어 간체',
  ko: '한국',
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
