// 共通のワード
const common = {
  cancel: 'Cancel',
  close: 'Close',
  confirmation: 'Confirmation',
  error: 'Error',
  done: 'Done',
  edit: 'Edit',
  register: 'Register',
  sending: 'Send',
  next: 'Next',
  publish: 'Publish',
  draft: 'Save',
  skip: 'Skip',
  add: 'Add',
  delete: 'Delete',
  translation: 'Translation',
  speech: 'Speak',
  copy: 'Copy',
  slow: 'Slow',
  back: 'Back',
};

// web
const web = {
  firstViewTitle: '“Speaking” starts from “Writing”',
  firstViewSubTitle: 'Interactive language learning app',
  firstViewStart: 'Join Interchao today.',
  wahtTitle: 'What is Interchao?',
  wahtText1:
    'Interchao is a free, interactive language learning app for Japanese, English, Chinese, and Korean learners.',
  wahtText2:
    'Your journal entry will be read and marked by native speakers. Let’s mark others’ journal entry as a native teacher as a return!',
  whyTitle: 'Why is it necessary to write?',
  whyText: 'Writing is the optimal language learning method',
  whyCnatText1: '「最近調子はどうですか？」',
  whyCnatText2: '「絶好調です。あなたは？」',
  whyCnatText3:
    '「元気です...(Oh no, I can’t keep the conversation going...)」',
  reasonTitle1: 'You can’t speak more than what you can write',
  reasonText11: 'You can’t talk what you cannot pen down.',
  reasonText12: 'Writing is a training for speaking.',
  reasonTitle2: 'Make your articles checked by native speakers',
  reasonText21:
    'Since you have written down something, you want to know if there were mistakes.',
  reasonText22:
    'Are the words and grammar correct? Are you making sense? Let’s have your articles checked by native speakers!',
  reasonTitle3: 'Write in your own words',
  reasonText31:
    'Textbooks and scripts from movies are sometimes not applicable in our daily life.',
  reasonText32:
    'Through outputting something in your own words, you are able to learn in a practical way.',
  correctTitle: 'Correct entries to get points',
  correctText1:
    'Mark a journal entry in your native language and get 10 points.',
  correctText2: 'Use the points for writing your own journal entry!',
  exampleTitle: 'Example of a Correction',
  exampleText: 'Take a look at an actual example.',
  exampleDetailTitle1: 'Your Journal Entry',
  exampleDetailText1: 'Hurry up and publish an entry.',
  exampleDetailTitle2: 'Correction Results',
  exampleDetailText2: 'The incorrect phrases or areas will be listed here.',
  exampleDetailTitle3: 'General Comments on the Entry',
  exampleDetailText3: '',
  startTitle: 'Start by writing a journal entry for free',
  startText:
    'By registering for a free account, you can receive 100 pts (10 journal entry’s worth). Hurry and write a journal entry so you can have it corrected!',
};

// タブ
const mainTab = {
  myDiary: 'My Entries',
  postDiary: 'Write an Entry',
  teachDiary: 'Entries to Correct',
  myPage: 'My Page',
};

// 共通のエラーメッセージ
const errorMessage = {
  other: 'There is an error.',
  wrongPassword: 'This password is incorrect.',
  invalidEmail: 'Please enter a valid email address',
  weakPassword: 'Please enter a password with at least 6 digits',
  userNotFound: 'This email address does not exist.',
  emailAlreadyInUse: 'This email address is already registered',
  tooManyRequests:
    'You have made too many failed attempts. Please try again later.',
  network: 'There has been a network error.',
  defaultError: 'There is an error. {{message}}',
  emptyUserName: 'Please enter a username.',
  invalidUserName:
    'Only alphanumeric characters, _ (the underbar), and . (period) can be used.',
  initialUserName: 'The first character must be an alphanumeric character.',
  userNameAlreadyInUse: 'This username has already been taken.',
  notFound: 'This page cannot be opened. There is an error.',
  cantLogout:
    'Because you have not registered an email address, you cannot logout.',
  invalidRaiting: 'Please rate between 1~5.',
  correctionAlready:
    'Someone else has started correcting this entry. Please search for another entry.',
  deleteTargetPage: 'This page cannot be opened.',
  deleteTargetUser: 'This page cannot be opened. The user may have deleted it.',
  emptyTitile: 'There is no title.',
  emptyText: 'There is no text.',
  emptyEmail: 'There is no email address.',
  emptyMessage: 'There is no message.',
  lackPointsTitle: 'You do not have enough points.',
  lackPointsText:
    '{{usePoint}} points are needed to publish an entry with {{textLength}} characters. You can earn more points by correcting entries.',
};

const app = {
  updateTitle: 'New version is available',
  updateMessage: 'Please update this app to the newest version',
  updateOk: 'Update',
};

// 各画面ごとの文字
const correcting = {
  headerTitle: 'Correct',
  header: 'List of corrections by others',
  deleteAlert:
    'All of your corrections will be deleted. Would you like to proceed?',
  titleDone: 'Publish',
  nothing: 'No fix',
  summary: 'Summary',
};

const deleteAcount = {
  headerTitle: 'About Account Deletion',
  text:
    'If you delete your account, all information about the journal entries you published will be deleted and cannot be retrieved. If you would still like to delete your account, please tap the button below.',
  withdrawal: 'Delete Account',
};

const draftDiary = {
  headerTitle: 'Drafts',
  diaryList: {
    one: 'List of Drafts: {{count}} entry',
    other: 'List of Drafts: {{count}} entries',
    zero: 'List of Drafts',
  },
  empty: 'You do not have any drafts.',
};

const editEmail = {
  headerTitle: 'Edit Email Address',
  title: 'Please enter a new email address.',
  labelEmail: 'New Email Address',
  labelPassword: 'Current Password',
};

const editMyProfile = {
  headerTitle: 'Edit Profile',
  name: 'Name',
  userName: 'Username',
  placeholderIntroduction: 'Self Introduction (200 characters or less)',
  learn: 'Leaning',
  native: 'Teaching',
  spoken: 'Other Languages\nyou can speak',
};

const editPassword = {
  headerTitle: 'Edit Password',
  forgetText: '',
  link: 'Forgot password?',
  currentPassword: 'Current Password',
  newPassword: 'New Password (6 or more characters)',
};

const editUserName = {
  headerTitle: 'Username',
  userName: 'Username',
};

const foregetPassword = {
  headerTitle: 'Change Password',
  email: 'Email',
  title: 'Please enter your email address.',
  subText:
    'We will send a URL to your email address for you to change your password.',
};

const initialize = {
  start: 'Create Account',
  // 末尾にスペースを開ける
  acount: 'Have an account already? ',
  link: 'Login',
};

const inputUserName = {
  headerTitle: 'Username Registration',
  title: 'Please enter your username.',
  subText: 'You can change your username at any time.',
};

const myDiary = {
  menuDelete: 'Delete',
  confirmMessage: 'Are you sure you want to delete this journal entry?',
};

const myDiaryList = {
  headerTitle: 'Search My Entries',
  diaryList: {
    one: 'My Journal Entries: {{count}} entry',
    other: 'My Journal Entries: {{count}} entries',
    zero: 'My Journal Entries',
  },
};

const myDiarySerch = {
  placeholder: 'Search by title or keywords',
};

const myPage = {
  headerTitle: 'My Page',
  editButton: 'Edit',
};

const notice = {
  headerTitle: 'Notifications',
  finishCorrection: 'When my journal entries are corrected',
  finishReview: 'When I get reviews',
};

const postDiary = {
  headerTitle: 'New Journal Entry',
};

const postDraftDiary = {
  headerTitle: 'Edit Your Draft',
};

const registerEmailPassword = {
  headerTitle: 'Register Email and Password',
  title: 'Please enter your email address and password',
  subText:
    'You will need this data when switching devices. You can also register at a later time.',
  email: 'Email Address',
  password: 'Password (6 or more characters)',
};

const reviewList = {
  headerTitle: 'List of Reviews',
  reviewList: 'List of Reviews',
};

const review = {
  headerTitle: 'Review',
  placeholder: 'Comment (Optional)',
  confirmation:
    'The draft of your review will be deleted. Would you like to proceed?',
};

const selectLanguage = {
  headerTitle: 'Language Selection',
  title: 'Please choose your languages and nationality.',
  learn: 'Language you want to learn',
  native: 'Language you can speak',
  spoken: 'Other Languages you can speak',
  nationality: 'Nationality',
  placeholder: 'Please select your nationality',
  change: 'Change',
  nationalityCodeAlert: 'Please select your nationality',
  sameLanguageAlert:
    'Please choose another language for "Language you want to learn" and "Language you can speak"',
  sameSpokenAlert:
    'Please choose another language for "Language you want to learn", "Language you can speak" and "Other Languages you can speak"',
  add: 'Add',
};

const setting = {
  headerTitle: 'Settings',
  title: 'Basic',
  notice: 'Notifications',
  editEmail: 'Edit Email Address',
  editPassword: 'Edit Password',
  registerEmailPassword: 'Register Email and Password',
  tutorial: 'Tutorial',
  deleteAcount: 'About Account Deletion',
  logout: 'Logout',
  inquiry: 'Contact',
};

const signIn = {
  headerTitle: 'Login',
  email: 'Email Address',
  password: 'Password',
  login: 'Login',
  forgetText: '',
  link: 'Forgot password?',
};

const signUp = {
  headerTitle: 'Email Address Registration',
  title: 'Please enter your email address and password.',
  subText:
    'You will need this data when switching devices. You can also register at a later time.',
  email: 'Email Address',
  password: 'Password (6 or more characters)',
};

const teachDiary = {
  headerTitle: 'Entry',
  start: 'Begin Corrections',
};

const teachDiaryList = {
  headerTitle: 'Search Entries',
  diaryList: 'List of Entries in Languages ​​You Can Speak',
  empty: 'There are no entries from other people.',
};

const teachDiarySerch = {
  searchBar: 'Search by title or keywords',
};

const tutorialList = {
  headerTitle: 'List of Tutorials',
  postDiary: 'How to Write Entries',
  points: 'About Points',
};

const userProfile = {
  headerTitle: 'Profile',
  moreRead: 'View All {{count}} Reviews',
  blocked: 'Block',
  unBlocked: 'Unblock',
  report: 'Report',
  diaryList: {
    one: '{{count}} Journal Entry',
    other: '{{count}} Journal Entries',
    zero: 'Journal Entries',
  },
  topReview: 'Top Reviews',
};

// atoms
const commentCard = {
  original: 'Original',
  fix: 'Edit',
  detail: 'Comment',
  optional: 'Optional',
};

const firstDiary = {
  first: 'First entry',
};

const userPoints = {
  points: 'Points',
};

const userPointsBig = {
  points: 'Current Points',
};

//  molecules
const emptyDiary = {
  empty: 'You haven’t posted any journal entries.',
};

const emptyReview = {
  empty: 'There are no reviews yet.',
};

const myDiaryCorrectionFooter = {
  finText: 'This journal entry has been reviewed.',
  title: 'Review the Correction',
  promptText: 'Please leave a thank you and your appraisal of the correction.',
};

const profileLanguage = {
  learn: 'Learning',
  native: 'Teaching',
  spoken: 'Other Teaching',
};

const profileNationality = {
  nationality: 'Nationality',
};

const inquiry = {
  headerTitle: 'Inquiry',
  email: 'Email Address',
  message: 'Message',
  title: 'Thank you for your inquiry.',
  thanks:
    'We will reply to you within a few days. Please kindly wait for a moment.',
};

// organisms
const diaryHitList = {
  empty: 'No journal entries matched your search.',
  header: 'Search Results',
};

const draftListItem = {
  draft: 'Draft',
};

const emptyMyDiaryList = {
  text:
    'You haven’t posted any journal entries.\nWrite an entry and have a native speaker correct it!',
  hint: 'Start here!\nYour entry will be\nproofread for free!',
};

const modalAlertCorrection = {
  text1: 'Please write all of the corrections in ',
  text2:
    '.\n\nPlease finish making corrections within 30 minutes. Your corrections will be discarded if you take longer than 30 minutes.\n\nOnce you start, the entry will be locked and other people will be unable to make corrections.',
  start: 'Begin Corrections',
};

const modalAlertPublish = {
  confirmation:
    'It will cost {{usePoints}} points to publish this entry. Once an entry has been published, it cannot be edited. Would you like to proceed?',
  submit: 'Publish',
};

const modalBlock = {
  blockedQuestion: 'Block {{userName}}?',
  blockedSuccess: '{{userName}} Blocked',
  unblockedQuestion: 'Unblock {{userName}}?',
  unblockedSuccess: '{{userName}} Unblocked',
  blockedMessage:
    "They won't be able to find your profile or journal entries on Interchao. Interchao won't let them know you blocked them",
  unblockedMessage:
    "They will now be able to see your profile or journal entries on Interchao. Interchao won't let them know you unblocked them.",
  blockedButton: 'Block',
  unblockedButton: 'Unblock',
  blockedEndMessage: 'You can unblock them anytime from their profile.',
  unblockedEndMessage: 'You can block them anytime from their profile.',
};

const modalCorrectingDone = {
  title: 'Complete Corrections',
  text:
    'Thank you for correcting the entry. You have received {{getPoints}} points.',
};

const modalDeleteAcount = {
  title: 'Delete Account',
  text: 'Please enter your password and tap the “Confirm” button.',
  button: 'Delete Account',
};

const modalDiaryCancel = {
  message:
    'Any edits that have not been saved will be lost. Would you like to exit?',
  button: 'Save as a Draft',
};

const modalLackPoint = {
  title: 'Not Enough Points',
  text:
    'You don’t have enough points! 10 points are needed to publish an entry {{learnCharacters}} characters long. \n\nYou can earn 10 points by correcting a journal entry.\n\nDrafts can be saved without needing to use points.',
  submit: 'Continue',
  close: 'Look for Entries to Correct',
};

const modalSendEmail = {
  title: 'Mail Sent',
  text:
    'The email has been sent. Please click the link in the email to change your password.',
};

const modalStillCorrecting = {
  text: 'Your corrections have been interrupted.',
};

const modalTimeUp = {
  title: 'Time Up',
  text: '30 minutes have passed, so the lock on corrections will be removed.',
};

const myDiaryCorrection = {
  header: 'Correction Results',
  hide: 'Hide',
  show: 'Show',
};

const myDiaryListMenu = {
  myPage: 'My Page',
  draftList: 'List of Drafts',
  reviewList: 'List of Reviews',
};

const report = {
  title: 'Report',
  subTitle: 'Why are you reporting this account?',
  description:
    "We won't let them know if you take any of these actions. If someone is in immediate danger, call local emergency services. Don't wait.",
  spam: "It's spam",
  inappropriate: "It's inappropriate",
  reportedTitle: 'Thanks for letting us know',
  reportedDescription:
    'Your feedback is important in helping us keep the Interchao community safe.',
};

const postDiaryComponent = {
  usePoints: 'Points Needed',
  textLength: 'Characters',
  points: 'Your Points',
  textPlaceholder: 'Entry',
  draft: 'Save as Draft',
};

const sns = {
  app: 'Share the app on SNS',
  diary: 'Share your entry on SNS',
};

const teachDiaryCorrection = {
  header: 'Correction Results',
};

const tutorialPoints = {
  title: 'About Points',
  buttonText: 'Begin',
  text:
    'A minimum of 10 points is needed to publish a journal entry. You can get 10+ points by making corrections. The number of points used and received is based on the language and character count.',
};

const tutorialPostDiary = {
  title: 'How to Write a Journal Entry',
  buttonText: 'Begin',
  text:
    'Try writing a journal entry in {{learnLanguage}}. 10 points are needed for {{learnCharacters}} characters.\n\nAfter publishing your journal entry, it will be corrected by a native speaker! If you correct journal entries written in languages you can speak, you will get 10 points. Let’s teach each other languages!',
};

const tutorialTeachDiaryList = {
  title: 'What is “Entries to Correct”?',
  buttonText: 'Begin',
  text1:
    'This is a list of journal entries in the languages ​​you can speak. \n\nUp to 3 people can be corrected per journal entry. Please give priority to the journal entry whose status is ',
  text2: '. If you correct it, you will get 10 points.',
  // Not Yet Correctedはスペースを開けておく
  textMainColor: ' Not Yet Corrected',
};

// util
const cameraRoll = {
  permitTitle: 'Access permission is needed.',
  permitMessage:
    'You must give Interchao permission to access your photo library.',
  permitHowTo: 'How to Change Settings',
};

const myDiaryStatus = {
  yet: 'Waiting for Corrections',
  correcting: 'Being Corrected',
  unread: 'Unread',
  yetReview: 'Waiting for Reviews',
};

const userDiaryStatus = {
  yet: 'Not Yet Corrected',
  correcting: 'Being Corrected',
  done: '{{correctedNum}}/3 Corrected',
};

const language = {
  ja: 'Japanese',
  en: 'English',
  zh: 'Simplified Chinese',
  ko: 'Korean',
};

const en = {
  common,
  web,
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

export default en;
