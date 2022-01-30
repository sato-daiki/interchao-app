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
  save: '저장',
  add: '추가',
  delete: '삭제',
  translation: '번역',
  speech: '읽기',
  copy: '복사',
  slow: '느림',
  back: 'Back',
  begin: '시작하기',
  time: '시간을 선택하세요',
};

// web
const helmet = {
  keyword: '일본어,영어,중국어 간체,어학 학습, 일기, 첨삭, 공부,언어 교환',
  description:
    'Interchao는 일본어, 영어, 중국어, 한국어를 무료로 공부할 수 있는 상호 학습 애플리케이션입니다. 내가 쓴 일기를 원어민이 직접 읽고 체크해 줍니다. 나도 자신의 모국어 선생님이 되어 다른 사람의 일기를 체크해 줄 수 있습니다.',
  ogTitle: '원어민이 직접 일기를 체크해주는 앱',
  ogDescription:
    'Interchao는 일본어, 영어, 중국어, 한국어를 무료로 공부할 수 있는 상호 학습 애플리케이션입니다. 내가 쓴 일기를 원어민이 직접 읽고 체크해 줍니다. 나도 자신의 모국어 선생님이 되어 다른 사람의 일기를 체크해 줄 수 있습니다.',
};

const web = {
  firstViewTitle: '"말하기"는 "쓰기"에서 시작',
  firstViewSubTitle: '원어민이 직접 일기를 체크해주는 앱',
  firstViewStart: '오늘 Interchao에 가입하세요.',
  wahtTitle: 'What is Interchao?',
  wahtText1:
    'Interchao는 일본어, 영어, 중국어, 한국어를 무료로 공부할 수 있는 상호 학습 애플리케이션입니다.',
  wahtText2:
    '내가 쓴 일기를 원어민이 직접 읽고 체크해 줍니다. 나도 자신의 모국어 선생님이 되어 다른 사람의 일기를 체크해 줄 수 있습니다',
  whyTitle: '쓰기가 필요한 이유',
  whyText: '어학 공부에 있어서 문장 쓰기는 가장 효율적인 방법입니다',
  whyCnatText1: '「How are you?」',
  whyCnatText2: "「I'm fine,thank you,and you?」",
  whyCnatText3: "「I'm fine...(어쩌지... 더 이상 뭐라고 해야 할지 모르겠어)」",
  reasonTitle1: '쓸 수 없는 문장은 말할 수 없다',
  reasonText11: '문장으로 쓸 수 없으면 말할 수도 없습니다.',
  reasonText12: '쓰기는 곧 말하기 트레이닝으로도 연결됩니다.',
  reasonTitle2: '원어민이 체크',
  reasonText21: '열심히 문장을 썼지만, 혹시 틀렸다면?',
  reasonText22:
    '문법/단어는 올바를까? 상대방에게 의미가 잘 전달될까? 원어민이 정확하게 체크해 줍니다.',
  reasonTitle3: '내가 원하는 글쓰기',
  reasonText31:
    '교과서에 나오는 표현이나 영화 대본을 공부해도 일상생활에는 적용하기 어렵습니다.',
  reasonText32:
    '내가 원하는 문장을 쓰면 자연스럽게 평상시에 사용하는 표현을 학습할 수 있습니다.',
  correctTitle: '일기를 첨삭해서 포인트를 GET!',
  correctText1:
    '당신의 모국어로 쓰인 일기를 첨삭하면 10포인트가 쌓입니다. 이 10포인트를 사용해서 일기를 써 봅시다!',
  exampleTitle: '첨삭 사례',
  exampleText: '실제 첨삭 사례를 소개',
  exampleDetailTitle1: '당신이 작성한 일기',
  exampleDetailText1: '쓴 일기를 투고!',
  exampleDetailTitle2: '첨삭 결과',
  exampleDetailText2: '잘못된 표현이 있는 곳을 체크해 줍니다',
  exampleDetailTitle3: '일기의 총평',
  exampleDetailText3: '마지막으로 종합적인 평가를 받습니다',
  startTitle: '먼저 무료로 일기를 써 보세요',
  startText:
    '앱 설치시 30pt(일기 3일분)를 증정합니다<. 일기를 써서 첨삭 지도를 받아봅시다!',
  operator: 'Operator',
};

const modalAppSuggestion = {
  title: 'Interchao는 앱에서 사용하는 것이 더 좋습니다',
  text: 'Interchao 앱에서 열어 전체 기능을 활용하세요.',
};

// タブ
const mainTab = {
  myDiary: '내 일기',
  postDiary: '일기 쓰기',
  teachDiary: '첨삭하는 일기',
  myPage: '마이 페이지',
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
  exceedingCharacter:
    '최대 문자 수를 초과합니다. 최대 문자 수 : {{textLength}}',
  video: '동영상을 재생하는 중에 오류가 발생했습니다',
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
  titleDone: '업로드하기',
  nothing: '수정이 없습니다',
  summary: '총평',
};

const deleteAcount = {
  headerTitle: '회원 탈퇴에 대해서',
  text:
    '회원을 탈퇴하면 업로드된 일기 정보가 완전히 삭제되어 복원할 수 없습니다.\n\n그래도 회원 탈퇴를 원하시는 분은 하단에 있는 버튼을 눌러 탈퇴해주세요.',
  withdrawal: '탈퇴하기',
  confirmation: '정말 삭제하시겠습니까?',
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
  imageButton: '이미지를 변경하려면',
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
  confirmMessage: '정말 삭제하시겠습니까?',
  posted: '게시 됨',
  fairCopy: '정서',
  closeAlert: '저장되지 않은 사항은 사라집니다. 그래도 계속 하시겠습니까?',
  permissionAudio: '이 기능을 사용하려면 오디오 녹음 권한을 활성화해야합니다',
  voiceTitle: '음독 교육',
  myVoice: '녹음 된 음성 듣기',
  machine: '기계의 음성 듣기',
  record: '음성 녹음',
  recommend: '효율적인 공부 방법은?',
};

const myDiaryList = {
  headerTitle: '내 일기',
  diaryList: {
    one: '내 일기 리스트{{count}}건',
    other: '내 일기 리스트{{count}}건',
    zero: '내 일기 목록',
  },
  notficationSetting:
    'Interchao 앱 알림이 꺼져 있습니다. 일기 첨삭이 도착하면 확인 하시려면 "설정"에서 "알림"을 선택하자',
  emptyDiary: '일기 없음',
  theme: '테마',
};

const myDiarySerch = {
  placeholder: '제목 및 본문으로 검색',
};

const myPage = {
  headerTitle: '마이 페이지',
  editButton: '편집하기',
  adGetPoints: '동영상 광고를 보고 {{points}}점 획득',
  timeOut: '다음 동영상 광고를 볼 수 있는 시간 {{activeHour}}',
};

const notice = {
  headerTitle: '알림',
  finishCorrection: '내 일기 첨삭 완료 시',
  finishReview: '리뷰 도착 시',
  push: '푸시 알림',
  mail: '이메일 알림',
  operation: '경영진의 알림',
  noMail:
    '※이메일 주소가 등록되어 있지 않습니다. 메일 통지를 이용하는 경우는 "이메일 주소/비밀번호 등록" 화면에서 설정하십시오',
};

const onboarding = {
  reminderInitial: '공부 시간 설정',
  reminderSelectTime: '공부 시간 설정',
  reminderSelectDay: '요일 선택',
  pushSetting: '알림 켜기',
};

const reminderInitial = {
  text:
    '공부는 습관화하는 것이 중요합니다. 공부하는 시간을 고정합시다. 알림을 설정하면 공부 시작 시간에 알림을받을 수 있습니다.',
  submit: '설정',
};

const reminderSelectTime = {
  title: '공부를 예약하십시오',
  fix: '매일 같은 시간',
  custom: '사용자 정의',
  studyDay: '요일',
  time: '시간',
  start: '시작 시간',
  end: '종료 시간',
  notificationLable: '통지시기',
  notificationStart: '시작 시간에 알림',
  notificationEnd: '종료 시간 알림',
  notificationStartTitle: '시작 시간',
  notificationStartBody: '오늘도 화이팅 !!',
  notificationEndTitle: '종료 시간',
  notificationEndBody: '훌륭한 일!',
  notficationAlert:
    '알림 설정이 off로되어 있기 때문에 미리 알림 기능이 작동하지 않습니다. 장치 설정에서 Interchao의 통지를 on으로합니다.',
};

const reminderSelectDay = {
  title: '공부할 요일을 선택하세요',
};

const pushSetting = {
  title: '알림 켜기',
  description:
    '일기 첨삭이 도착했을 때 알림을 설정 한 시간이되었을 때 등에 소식을받을 수 있습니다.',
  submit: '켜다',
};

const editMyDiaryList = {
  headerTitle: '일기 목록 편집',
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
  sameSpokenAlert:
    '"기타 원어민 수준의 언어"와 "배우고 싶은 언어"와 "원어민 언어"는 다른 언어를 선택하십시오',
  add: '추가하기',
};

const setting = {
  headerTitle: '설정',
  title: '기본 설정',
  reminder: '알림',
  notice: '알림',
  editEmail: '이메일 주소 변경',
  editPassword: '비밀번호 변경',
  registerEmailPassword: '이메일 주소/비밀번호 등록',
  tutorial: '튜토리얼',
  deleteAcount: '회원 탈퇴',
  logout: '로그아웃',
  inquiry: '문의',
  about: 'Interchao는 무엇입니까?',
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
  headerTitle: '일기 목록',
  searchText: '일기 찾기',
  diaryList: '당신이 원어민 언어의 일기 목록',
  empty: '일기가 없습니다',
};

const teachDiarySerch = {
  searchBar: '제목 및 본문으로 검색',
};

const tutorialList = {
  headerTitle: '튜토리얼 목록',
  postDiary: '일기를 쓰는 방법',
  points: '포인트에 대해서',
};

const notFound = {
  text: '찾고있는 페이지를 찾을 수 없습니다',
  link: '맨위로',
};

const record = {
  headerTitle: '녹음',
  confirmMessage: '삭제 하시겠습니까?',
  save: '저장',
  delete: '삭제하기',
  notSave: '2 분 이상의 오디오는 저장할 수 없습니다',
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
  optional: '필수사항 아님',
};

const firstDiary = {
  first: '첫 업로드',
};

const userPoints = {
  points: '포인트',
};

const userPointsBig = {
  points: '현재 포인트',
};

//  molecules
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

const inquiry = {
  headerTitle: '문의',
  email: '이메일 주소',
  message: 'Message',
  title: '문의 감사합니다.',
  thanks: '확인하는대로 즉시 회신합니다. 조금만 더 기다려보세요',
};

// organisms
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
  publish: '일기가 공개되었습니다',
  share: '공개 일기를 모두 알려 드리죠',
  first: '첫 번째 게시물에 감사드립니다\n내일도 최선을 다합시다.',
  runningDays: '{{runningDays}} 일 연속 일기장입니다\n큰!',
  runningWeeks: '{{runningWeeks}} 주 연속 일기장\n계속 최선을 다합시다.',
  good: '게시물 수고하셨습니다\n내일도 노력합시다',
};

const modalAppReviewRequest = {
  title: 'Interchao의 응원을 부탁합니다!',
  improveTitle: 'Interchao 기능 개선에 협력 부탁합니다!',
  text:
    '항상 Interchao를 이용해 주셔서 감사합니다. 추가 개선을위한 의견을 들려주세요',
  thanks:
    '댓글 감사합니다. 개선에 큰 도움이됩니다. 앞으로도 Interchao를 잘 부탁합니다',
  improve: '개선했으면 좋겠다 것을 쓴다',
  review: '리뷰하기',
  notYet: '나중에 쓰기',
  never: '리뷰하지',
  supplement: '☆을 눌러 평가하십시오',
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

const modalAdPointsGet = {
  title: '포인트 획득',
  text: '동영상 시청에 감사드립니다. {{getPoints}}포인트 획득.',
};

const modalCorrectingDone = {
  title: '첨삭 완료',
  text: '첨삭 감사합니다. {{getPoints}}포인트 획득.',
};

const modalDeleteAcount = {
  title: '회원 탈퇴',
  text: '비밀번호를 입력하고 "탈퇴하기" 버튼을 눌러주세요.',
  button: '탈퇴하기',
};

const modalDiaryCancel = {
  message: '저장되지 않은 사항은 사라집니다. 그래도 계속 하시겠습니까?',
  button: '임시 보관함 저장',
};

const modalLackPoint = {
  title: '포인트 부족',
  text:
    '포인트가 부족합니다. 일기를 업로드하려면 {{learnCharacters}}글자마다 10포인트가 필요합니다. 임시보관함에서는 포인트 사용없이 저장할 수 있습니다.\n\n또는 동영상 광고를 보면 10점이 적립됩니다.',
  submit: '계속하기',
  close: '첨삭이 필요한 일기 찾기',
  watchAd: '동영상 광고 보기',
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
  hint: '슬라이드를 복습하기',
};

const sns = {
  app: '앱을 SNS로 공유하기',
  diary: '일기를 SNS로 공유',
};

const teachDiaryCorrection = {
  header: '첨삭 결과',
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
  done: '첨삭 완료',
  correcting: '첨삭중',
  unread: '안읽음',
  posted: '게시일시',
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
  ko: '한국어',
};

const selectDiaryType = {
  headerTitle: '유형 선택',
  recommend: '추천',
  titleFree: '자유 작문',
  titleTheme: '주제에서 선택',
  textFree:
    '일기, 오늘은 말할 수 없었던 것, 좋아하는 영화 등 원하는 주제에 대해 적어보세요.',
  textTheme: '표제에 따라 문장을 씁시다. 쓸 내용이 생각 나지 않는 경우 추천.',
};

const firstList = {
  selfIntroduction: '자기 소개',
  hobby: '취미',
  job: '일',
  study: '외국어를 공부해야하는 이유',
  dream: '미래를위한 꿈',
  trip: '여행 추억',
  reborn: '다시 태어난다면',
};

const selectThemeSubcategory = {
  headerTitle: '테마 선택',
  firstList,
};

const themeGuide = {
  swipeStart: '화면을 넘겨\n슬라이드를 이동합시다.',
  swipeEnd:
    '슬라이드를 복습하고 싶을 때는\n스와이프로 화면을 되돌릴 수 있습니다.',
  introduction: '시작하기',
  guideTipTitle: '자주 사용하는 표현',
  expression: '표현',
  example: '예문',
  word: '단어 목록',
  guideEndText:
    '이것으로 슬라이드는 끝입니다.\n자, 그럼 이제 실제로 글을 써보실까요?',
};

const selfIntroduction = {
  introduction:
    '첫번 째는 자기소개를 써보겠습니다. 자기소개는 새로운 사람과 만나면 꼭 하게 되죠.\n\n{{learnLanguage}}로 한 번 문장을 작성해 두면 실제로 말할 때 막힘없이 말할 수 있습니다.',
  expression1: '이름, 호칭',
  expression2: '출신지, 자란 마을',
  expression3: '회사명, 직업',
  expression4: '취미',
  example1: '다나카 하나입니다. 하나라고 불러 주세요.',
  example2: '가나가와에서 태어나 도쿄에서 자랐습니다.',
  example3: '인터차오에서 마케팅 디렉터로 일하고 있습니다.',
  example4: '기타 치는 것을 좋아합니다.',
  wordTitle: '자기소개에서 사용할 수 있는 표현 일람',
  word1: '만나서 반갑습니다.',
  word2: 'XX(이)라고 불러 주세요.',
  word3: 'XX에서 태어나고 자랐습니다.',
  word4: '일본에서 왔습니다.',
  word5: '동생이 있습니다.',
  word6: '아내와 결혼한 지 5년째입니다.',
  word7: '대학에서 심리학을 전공하고 있습니다.',
  word8: 'XX 업계에서 일하고 있습니다.',
  word9: '여행하는 것을 정말 좋아합니다.',
  word10: '만나서 반가웠습니다.',
};

const hobby = {
  introduction:
    '새로운 친구가 생겼을 때, 동료와 술자리를 할 때, 취미에 대해서 말하는 경우가 많죠? {{learnLanguage}}도 마찬가지입니다.\n\n취미는 단골 화제입니다. 오늘은 "당신의 취미"에 대해서 이야기 해보도록 하겠습니다.',
  expression1: '취미 이름',
  expression2: '취미 이름, 취미를 시작한 계기',
  expression3: '앞으로에 대해',
  example1: '제 취미는 달리기입니다.',
  example2:
    '저는 풀 마라톤에 참가했던 것을 계기로 달리기를 시작하게 되었습니다.',
  example3: '저는 앞으로도 운동을 계속해 나가고 싶습니다.',
  wordTitle: '취미 일람',
  word1: '쇼핑',
  word2: '영화감상',
  word3: '야구',
  word4: '영어 공부',
  word5: '꽃꽂이',
  word6: '웹사이트 운영',
  word7: '여행',
  word8: '온천 탐방',
  word9: '사진',
};

const job = {
  introduction:
    '3번째 테마는 직장입니다. 글을 쓰는 게 이제는 익숙해지셨나요?\n\n오늘은 "당신이 어떤 일을 하고 있는가"를 쓸 수 있도록 해봅시다.',
  expression1: '근무처 이름',
  expression2: '직업',
  expression3: '전문 분야',
  example1: '저는 Interchao Center에서 일하고 있습니다.',
  example2: '저의 직업은 영어 선생님입니다.',
  example3: '당사는 1:1 레슨을 전문으로 하고 있습니다.',
  wordTitle: '직업 일람',
  word1: '변호사',
  word2: '회계사',
  word3: '엔지니어',
  word4: '접수원',
  word5: '비서',
  word6: '회사원',
  word7: '제조업자',
  word8: '판매업자',
  word9: '은행원',
  word10: '요리사',
  word11: '공무원',
  word12: '교사',
  word13: '의사',
  word14: '약사',
  word15: '간호사',
  word16: '사업가',
  word17: '연구원',
  word18: '작가',
};

const study = {
  introduction:
    '당신은 왜 {{learnLanguage}}를 공부하기 시작했습니까?\n\n어학원이나 유학을 하러 가면 꼭 받는 질문입니다. 이유를 {{learnLanguage}}로 말할 수 있도록 합시다.',
  expression1: '언어, 이유',
  expression2: '언어, 이유',
  expression3: '언어, 이유',
  example1:
    '제가 영어 를 공부하는 이유는 새 직장에서 고객과 기본적으로 영어를 써야하기 때문입니다.',
  wordTitle: '이유 일람',
  word1: '취미나 여가',
  word2: '다른 나라 사람들과의 만남',
  word3: '여행을 위해 영어 배우기',
  word4: '외국인과 말할 수 있게 되기',
  word5: '직장에서 승진하기',
  word6: '이직',
  word7: '영어 능력이 필요한 직업 갖기',
};

const dream = {
  introduction:
    '당신은 장래에 무엇이 되고 싶나요?\n\n오늘은 장래 희망과 목표를 써보겠습니다.',
  expression1: '장래 꿈',
  expression2: '과거의 경험',
  expression3: '꿈을 통해서 실현하고 싶은 일',
  example1: '저의 꿈은 내 가게를 갖는 것입니다.',
  example2: '저는 어릴 적부터 요리를 좋아했습니다.',
  example3: '많은 사람이 제가 만든 음식을 먹고 기뻐했으면 좋겠습니다.',
  wordTitle: '장래희망 예시 일람',
  word1: '초등학교 선생님이 되기',
  word2: '일러스트레이터가 되기',
  word3: '프로 축구 선수가 되기',
  word4: '국제적 봉사활동에 참여하기',
  word5: '축구 잡지를 제작하는 사람이 되기',
  word6: '아프리카에서 일하기',
  word7: '장래 괌에서 살며 일하기',
  word8: '일본 일주',
  word9: '아직 장래의 꿈이 없다',
};

const trip = {
  introduction:
    '이번 테마는 여행입니다. 친구에게 여행 이야기를 듣는 것은 즐거운 일입니다.\n\n당신도 {{learnLanguage}}로 여행 토크를 하나 준비해 둡시다.',
  expression1: '가 본 나라 이름(도시 이름)·함께 간 사람',
  expression2: '방문한 장소, 기간',
  expression3: '가장 기억에 남는 추억',
  example1: '저는 가족과 함께 이탈리아에 갔습니다.',
  example2: '우리는 10일간 로마와 베네치아, 나폴리를 방문했습니다.',
  example3: '가장 기억에 남는 건 보트를 타고 푸른 동굴에 갔던 것입니다.',
  wordTitle: '여행 추억관련 표현 일람',
  word1: '하이킹으로 중국을 방문했습니다.',
  word2: '하와이 해변에 갔습니다.',
  word3: '한국에서 쇼핑을 했습니다.',
  word4: '현지 요리는 정말로 맛있어요.',
  word5: '현지 사람들이 정말로 친절했습니다.',
  word6: '가게에서 정말 재미있는 상품을 발견했습니다.',
  word7: '그레이트배리어리프로 유명한 케언스에 갔습니다.',
  word8: '여행지에선 무엇이든 해보는 게 이득.',
  word9: '또 가보고 싶다고 생각합니다.',
};

const reborn = {
  introduction:
    '이번 장의 마지막 테마입니다. "혹시 XX였다면・・・."\n\n은 대화할 때 많이 쓰는 표현이죠. 오늘은 "만약 다시 태어난다면"에 대해서 써보겠습니다.',
  expression1: '다시 태어난다면 하고 싶은 일',
  expression2: '이유',
  example1: '다시 태어난다면 1945년쯤에 태어나고 싶습니다.',
  example2: '왜냐하면 1960년대 살았던 심리학자에게 배우고 싶기 때문입니다.',
  wordTitle: '표현 일람',
  word1: '혹시 내가 다시 태어난다면, 새가 되고 싶다.',
  word2: '나 자신으로 다시 태어나고 싶다.',
  word3: '혹시 다시 태어난다면, 의사가 되고 싶다.',
  word4: '혹시 다시 태어난다면, 세계 일주 여행에 도전할 것이다.',
};

const first = {
  selfIntroduction,
  hobby,
  job,
  study,
  dream,
  trip,
  reborn,
};

const ko = {
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
  onboarding,
  reminderInitial,
  reminderSelectTime,
  reminderSelectDay,
  pushSetting,
  editMyDiaryList,
  postDiary,
  postDraftDiary,
  registerEmailPassword,
  review,
  reviewList,
  selectLanguage,
  selectDiaryType,
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
  modalAdPointsGet,
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
  selectThemeSubcategory,
  themeGuide,
  first,
};

export default ko;
