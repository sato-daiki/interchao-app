// 共通のワード
const common = {
  cancel: '取消',
  close: '关闭',
  confirmation: '确认',
  error: '错误',
  done: '做完了',
  edit: '编辑',
  register: '注册',
  sending: '发送',
  next: '下一步',
  publish: '发布',
  draft: '保存草稿',
  skip: '跳过',
  add: '添加',
  delete: '删除',
  translation: '翻译',
  back: '返回',
};

// タブ
const mainTab = {
  myDiary: '我的日记',
  postDiary: '写日记',
  teachDiary: '{{nativeLanguage}}日记',
};

// 共通のエラーメッセージ
const errorMessage = {
  other: '发生错误',
  wrongPassword: '密码错误',
  invalidEmail: '电子邮件地址格式不正确',
  weakPassword: '请输入6位数或更多的密码',
  userNotFound: '邮件地址不存在',
  emailAlreadyInUse: '该邮箱地址已被注册',
  tooManyRequests: '错误数量超过数量限制。请稍后再试',
  network: '发生通讯错误。请稍后再试',
  defaultError: '发生错误。{{message}}',
  emptyUserName: '请输入您的用户名',
  invalidUserName: '用户名只能使用单字节的字母数字和_（下划线）和.（句点）',
  initialUserName: '首字符只能使用半角英文数字',
  userNameAlreadyInUse: '已经有用户使用此用户名',
  notFound: '无法打开页面。发生错误',
  cantLogout: '您的邮件地址尚未注册，无法退出',
  invalidRaiting: '请给出1分到5分的评价',
  correctionAlready: '这篇日记其他人已经开始批改了。请再次搜索其他日记',
  deleteTargetUser: '此页面无法打开。目标用户可能已被删除',
  deleteTargetPage: '无法打开此页面。该用户可能已被删除',
  emptyTitile: '未填写标题',
  emptyText: '未输入正文',
  emptyEmail: '未输入电子邮件地址',
  emptyMessage: '没有输入消息',
  lackPointsTitle: '积分不足',
  lackPointsText:
    '您需要{{usePoint}}个积分才能发布{{textLength}}个字符的日记。可以通过批改{{nativeLanguage}}的日记来累积积分',
};
const app = {
  updateTitle: '最新版本已经发布',
  updateMessage: '请将该应用更新为最新版本',
  updateOk: '更新申请',
};

// 各画面ごとの文字
const correcting = {
  headerTitle: '批改',
  header: '其他人的更正清单',
  deleteAlert: '正在编辑的所有批改都会被删除，确定删除吗？',
  summaryAlert: '正在编辑总结',
  commentAlert: '评论正在编辑中',
  titleComment: '评论',
  titleSummary: '写总结',
  titleDone: '发布',
  menuEdit: '编辑',
  menuCommentDelete: '删除评论',
  menuSummaryDelete: '删除总结',
  commentList: '评论列表',
};

const deleteAcount = {
  headerTitle: '关于账户注销',
  text:
    '账户注销后所发布的日记信息将被完全删除并且无法恢复。\n\n如果您仍要账户注销，请点击下面的按钮账户注销。',
  withdrawal: '账户注销',
};

const draftDiary = {
  headerTitle: '草稿',
  diaryList: {
    one: '草稿列表{{count}}项',
    other: '草稿列表{{count}}项',
    zero: '草稿列表',
  },
  empty: '没有草稿列表表',
};

const editCorrectionComment = {
  headerTitle: '编辑评论',
};

const editCorrectionSummary = {
  headerTitle: '编辑总结',
};

const editEmail = {
  headerTitle: '邮箱地址变更',
  title: '请填写新的邮件地址',
  labelEmail: '新邮件地址',
  labelPassword: '当前密码',
};

const editMyProfile = {
  headerTitle: '修改个人资料',
  name: '姓名',
  userName: '用户名',
  placeholderIntroduction: '自我介绍（200字以内）',
  learn: '您想学习的',
  native: '你说的',
  spoken: '您会说的\n其他语言',
};

const editPassword = {
  headerTitle: '更改密码',
  forgetText: '如果您忘记密码，',
  link: '请点击这里',
  currentPassword: '当前密码',
  newPassword: '新密码（至少6位）',
};

const editUserName = {
  headerTitle: '用户名',
  userName: '用户名',
};

const foregetPassword = {
  headerTitle: '重置密码',
  email: '邮件地址',
  title: '请输入邮件地址',
  subText: '发送密码修改链接至注册邮件地址',
};

const initialize = {
  start: '创建帐号',
  acount: '有帐户了? ',
  link: '请登录。',
};

const inputUserName = {
  headerTitle: '注册用户名',
  title: '请输入用户名',
  subText: '您可以随时修改此用户名',
};

const myDiary = {
  menuDelete: '删除',
  confirmMessage: '确定要删除吗？',
};

const myDiaryList = {
  headerTitle: '搜索我的日记',
  diaryList: {
    one: '我的日记列表{{count}}项',
    other: '我的日记列表{{count}}项',
    zero: '我的日记列表',
  },
};

const myDiarySerch = {
  placeholder: '按标题和正文搜索',
};

const myPage = {
  headerTitle: '我的页面',
  editButton: '编辑',
};

const notice = {
  headerTitle: '通知',
  finishCorrection: '我的日记批改结束',
  finishReview: '收到评论',
};

const postDiary = {
  headerTitle: '新日记',
};

const postDraftDiary = {
  headerTitle: '编辑草稿',
};

const registerEmailPassword = {
  headerTitle: '电子邮件地址/密码注册',
  title: '请输入你的电邮地址和密码',
  subText: '更换手机等数据迁移时需要。您也可以以后注册。',
  email: '邮件地址',
  password: '密码（至少6位）',
};

const reviewList = {
  headerTitle: '评论列表',
  reviewList: '评论列表',
};

const review = {
  headerTitle: '评论',
  placeholder: '评论 （可选的）',
  confirmation: '正在编辑的所有评论被删除。确定删除吗？',
};

const selectLanguage = {
  headerTitle: '选择语言',
  title: '请选择语言和国籍',
  learn: '您想学习的语言',
  native: '你说的语言',
  spoken: '您会说的其他语言',
  nationality: '国籍',
  placeholder: '请选择国籍',
  change: '更改',
  nationalityCodeAlert: '请选择国籍',
  sameLanguageAlert: '请为 "您想学习的语言" 和 "你说的语言" 选择另一种语言',
  add: '添加',
};

const setting = {
  headerTitle: '设置',
  title: '基本的',
  notice: '通知',
  editEmail: '修改邮箱地址',
  editPassword: '修改密码',
  registerEmailPassword: '注册邮件地址/密码',
  tutorial: '教程',
  deleteAcount: '关于账户注销',
  logout: '注销',
  inquiry: '联系我们',
};

const signIn = {
  headerTitle: '登录',
  email: '邮件地址',
  password: '密码',
  login: '登录',
  forgetText: '如果您忘记密码，',
  link: '请点击这里',
};

const signUp = {
  headerTitle: '注册邮件地址',
  title: '请填写邮件地址和密码',
  subText: '更换手机等数据迁移时需要。您也可以以后注册。',
  email: '邮件地址',
  password: '密码（至少6位）',
};

const teachDiary = {
  headerTitle: '日记',
  start: '批改',
};

const teachDiaryList = {
  headerTitle: '查找{{nativeLanguage}}日记',
  diaryList: '正在学习日语的人的日记列表',
  empty: '日记还没有发布',
};

const teachDiarySerch = {
  searchBar: '按标题和正文搜索',
};

const tutorialList = {
  headerTitle: '教程列表',
  correcting: '如何批改',
  postDiary: '如何写日记',
  points: '关于积分',
};

const userProfile = {
  headerTitle: '个人资料',
  moreRead: '查看所有{{count}}条评论',
  blocked: '拉黑',
  unBlocked: '取消拉黑',
  report: '举报',
  diaryList: {
    one: '日记列表{{count}}项',
    other: '日记列表{{count}}项',
    zero: '日记列表',
  },
  topReview: '热门评论',
};

// atoms
const commentCard = {
  original: '原文',
  fix: '修改后的句子',
  detail: '评论',
};

const firstDiary = {
  first: '首次发布',
};

const summaryCard = {
  title: '总结',
};

const userPoints = {
  points: '积分',
};

const userPointsBig = {
  points: '当前积分',
};

//  molecules
const commentInput = {
  original: '原文',
  fix: '修改后的句子',
  detail: '评论',
  paste: '粘贴剪贴板',
  optional: '可选的',
};

const correctionFooterButton = {
  correction: '如何批改',
};

const emptyDiary = {
  empty: '日记还没有发布',
};

const emptyReview = {
  empty: '还没有评论',
};

const myDiaryCorrectionFooter = {
  finText: '这篇日记已经评论过了',
  title: '查看批改的评论',
  promptText: '请对批改进行感谢和评价',
};

const profileLanguage = {
  learn: '您想学习的语言',
  native: '你说的语言',
  spoken: '您会说的其他语言',
};

const profileNationality = {
  nationality: '国籍',
};

const summaryInput = {
  title: '总结',
};

const inquiry = {
  headerTitle: '查询',
  email: '邮件地址',
  message: '信息',
  title: '感谢您的查询。',
  thanks: '一经确认，我想答复。请等一会儿',
};

// organisms
const correctionOrigin = {
  messageIOS: '选择要修改的地方，开始批改吧',
  messageAndroid: '复制要修改的地方，点击右下角的“评论”按钮开始批改吧',
};

const diaryHitList = {
  empty: '没有符合搜索条件的日记',
  header: '搜索结果',
};

const draftListItem = {
  draft: '草稿',
};

const emptyMyDiaryList = {
  text: '日记还没有发布写日记让母语者来批改吧！',
  hint: '首先从这里开始！\n日记可以得到免费批改！',
};

const modalAlertCorrection = {
  text:
    '请在30分钟内完成批改。30分钟后，批改将被丢弃。\n\n开始批改后将会被锁定，其他人将无法对其进行批改。',
  start: '开始批改',
};

const modalAlertPublish = {
  confirmation: '使用{{usePoints}}积分发布日记。发布后将无法编辑。确定发布吗？',
  submit: '发布',
};

const modalBlock = {
  blockedQuestion: '拉黑帐户',
  blockedSuccess: '{{userName}}已被拉黑',
  unblockedQuestion: '取消拉黑{{userName}}?',
  unblockedSuccess: '已取消拉黑{{userName}}',
  blockedMessage:
    '对方将无法在Interchao找到你的个人主页，帖子或快拍。对方不会收到自己被拉黑的通知。',
  unblockedMessage:
    '对方可以在Interchao向你发送关注请求了。对方不会收到自己已被取消拉黑的通知。',
  blockedButton: '拉黑',
  unblockedButton: '取消拉黑',
  blockedEndMessage: '你可以随时前往用户的个人主页取消拉黑对方。',
  unblockedEndMessage: '你可以随时前往用户的个人主页拉黑他们。',
};

const modalCorrectingDone = {
  title: '批改结束',
  text: '谢谢您的批改。赚取{{getPoints}}个积分',
};

const modalDeleteAcount = {
  title: '账户注销',
  text: '请输入密码后点击确定按钮',
  button: '账户注销',
};

const modalDiaryCancel = {
  message: '未保存的修改将会丢失。您确定要关闭吗？',
  button: '保存为草稿',
};

const modalLackPoint = {
  title: '积分不足',
  text:
    '积分不足。发布日记每{{learnCharacters}}个字符需要10个积分。\n\n批改{{nativeLanguage}}的日记，将获取10个积分。\n\n保存草稿可以不消耗积分。',
  submit: '继续',
  close: '查找要批改的日记',
};

const modalSendEmail = {
  title: '发送电子邮件',
  text: '已发送邮件。请通过电子邮件链接重置密码。',
};

const modalStillCorrecting = {
  text: '批改过程中被中断了',
};

const modalTimeUp = {
  title: '时间到',
  text: '因为已经过了30分钟，所以批改锁定已经解除',
};

const myDiaryCorrection = {
  header: '批改结果',
  hide: '隐藏',
  show: '表明',
};

const myDiaryListMenu = {
  myPage: '我的页面',
  draftList: '草稿列表',
  reviewList: '评论列表',
};

const report = {
  title: '举报',
  subTitle: '你举报这个帐户的原因是？',
  description:
    '你采取这些措施以后，我们不会通知被举报人。如果有人生命安全面临危险，请立即联系当地应急服务机构，不要耽搁！',
  spam: '垃圾信息',
  inappropriate: '内容不当',
  reportedTitle: '感谢告知',
  reportedDescription: '你的反馈十分重要，能帮助我们维持Interchao社群的安全。',
};

const postDiaryComponent = {
  usePoints: '消耗积分',
  textLength: '字数',
  points: '持有积分',
  textPlaceholder: '正文',
  draft: '保存草稿',
};

const sns = {
  title: '在SNS上共享应用',
};

const teachDiaryCorrection = {
  header: '批改结果',
};

const tutorialCorrecting = {
  subTitle: '做法',
  title: '如何批改',
  text1:
    '在日记中找到错误的部分，或者从母语者角度感觉不自然的地方！请使用{{nativeLanguage}}进行所有批改',
  subText1IOS: '① 长按相应文章并指定范围\n② 点击屏幕右上方的“评论”按钮',
  subText1Android: '①选择要批改的文章并复制\n②点击画面右下方的“评论”',
  text2: '教您正确的句子',
  subText2IOS:
    '① 在“修改后的句子”写下正确/自然的表达方式\n② 在“评论”中填写补充内容\n③ 点击”添加”按钮',
  subText2Android:
    '①写原文（点击“粘贴剪贴板”）\n②在修改后的句子中写出正确/自然的表达方式\n③在评论中写下补充内容\n④点击“添加”',
  text3:
    '大致按{{nativeCharacters}}字写3条评论。填写评论后，点击屏幕右上方的“写总结”',
  text4: '写对下日记的总体感想吧',
  subText4: '① 写总结\n② 点击”添加”按钮',
  text5: '点击卡片右上角的菜单图标就可以进行修改或删除',
  text6: '确认批改内容，最后点击屏幕右上方的“发布”',
  text7: '完成！马上开始批改吧',
};

const tutorialPoints = {
  title: '积分',
  buttonText: '开始',
  text:
    '发布日记需要10个积分起。\n评论将可以获得至少10个积分。\n\n消耗和获得的积分因字符数和语言而不同',
};

const tutorialPostDiary = {
  title: '如何写日记',
  buttonText: '开始',
  text:
    '试着用{{learnLanguage}}写日记吧。每{{learnCharacters}}个字符需要10个积分。\n\n发布日记的话，可能会有母语者批改您的日记！？如果您批改了正在学习{{nativeLanguage}}的人的日记，您将获得10个积分。让我们互相教外语吧！',
};

const tutorialTeachDiaryList = {
  title: '{{nativeLanguage}}日记',
  buttonText: '开始',
  text1:
    '这是正在学习你所能教的语言的用户日记列表。每份日记最多可以由三人修改。\n\n请优先修改状态为',
  text2: '的{{nativeLanguage}}的日记。批改后您可以得到10个积分。',
  textMainColor: '未批改',
};

// util
const cameraRoll = {
  permitTitle: '需要授权',
  permitMessage: 'Interchao需要使用相机权限',
  permitHowTo: '设置方法',
};

const myDiaryStatus = {
  yet: '待批改',
  correcting: '正在批改',
  unread: '未读',
  yetReview: '等待评论',
};

const userDiaryStatus = {
  yet: '未批改',
  correcting: '正在批改',
  done: '{{correctedNum}}/3 批改结束',
};

const language = {
  ja: '日语',
  en: '英语',
  zh: '简体中文',
  ko: '韩语',
};

const zh = {
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

export default zh;
