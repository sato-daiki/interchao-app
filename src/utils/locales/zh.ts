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
  save: '保存',
  add: '添加',
  delete: '删除',
  translation: '翻译',
  speech: '朗读',
  copy: '复制',
  slow: '放慢语速',
  back: '返回',
  begin: '开始',
  time: '请选择时间',
};

// web
const helmet = {
  keyword: '日语,英语,韩语,语言交流,日记,更正,批改,研究,学习,外语',
  description:
    'Interchao是可以免费互相学习日文、英文、中文、韩文的应用程式。有母语者为你批改日记相反的你也可以使用自己的母语来批改其他人的日记',
  ogTitle: '由母语者批改日记的应用程序',
  ogDescription:
    'Interchao是可以免费互相学习日文、英文、中文、韩文的应用程式。有母语者为你批改日记相反的你也可以使用自己的母语来批改其他人的日记',
};

const web = {
  firstViewTitle: '"说"是从"写"开始',
  firstViewSubTitle: '由母语者批改日记的应用程序',
  firstViewStart: '立即加入 Interchao',
  wahtTitle: 'What is Interchao?',
  wahtText1: 'Interchao是可以免费互相学习 日文、英文、中文、韩文的应用程式.',
  wahtText2: '有母语者为你批改日记. 相反的你也可以使用自己的母语来批改其他人的日记',
  whyTitle: '写作的理由',
  whyText: '书写文章是学习语言最好的方法',
  whyCnatText1: '「How are you?」',
  whyCnatText2: "「I'm fine,thank you,and you?」",
  whyCnatText3: "「I'm fine...(怎么办，话题进行不下去了)」",
  reasonTitle1: '写不出文章话也说不出来',
  reasonText11: '文章写不出来话也说不出来.',
  reasonText12: '写文章也可以练习口语.',
  reasonTitle2: '让母语者来批改',
  reasonText21: '写好的文章说不定有不正确的地方.',
  reasonText22: '母语者可以帮忙确认文法/单词是否正确？是否达意？',
  reasonTitle3: '用自己的话来写',
  reasonText31: '就算学习了课本上或电影中的台词在日常生活中也用不上.',
  reasonText32: '借着输出自己的话，可以学习到日常使用的言语',
  correctTitle: '批改日记获得积分！',
  correctText1: '批改自己母语的日记可以获得10积分. 使用这10积分来写日记吧！',
  exampleTitle: '批改案例',
  exampleText: '实际的批改案例.',
  exampleDetailTitle1: '你的日记',
  exampleDetailText1: '赶快来写日记吧！​​',
  exampleDetailTitle2: '批改结果',
  exampleDetailText2: '指出错误的地方',
  exampleDetailTitle3: '总结',
  exampleDetailText3: '最后获得总评',
  startTitle: '先来免费写日记吧​',
  startText: '安装应用程式可以获得30pt（3篇日记）. 赶快来写日记让人帮你批改吧！',
  operator: 'Operator',
};

const modalAppSuggestion = {
  title: 'Interchao 在应用上更好',
  text: '在 Interchao 应用中打开它，享受完整体验。',
};

// タブ
const mainTab = {
  myDiary: '我的日记',
  postDiary: '写日记',
  teachDiary: '批改的日记',
  myPage: '我的页面',
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
    '您需要{{usePoint}}个积分才能发布{{textLength}}个字符的日记。可以通过批改日记来累积积分',
  exceedingCharacter: '超过最大字符数。最大字符数:{{textLength}}',
  video: '视频播放过程中出现错误',
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
  titleDone: '发布',
  nothing: '没有修复',
  summary: '总结',
};

const deleteAcount = {
  headerTitle: '关于账户注销',
  text: '账户注销后所发布的日记信息将被完全删除并且无法恢复。\n\n如果您仍要账户注销，请点击下面的按钮账户注销。',
  withdrawal: '账户注销',
  confirmation: '确定要删除吗？',
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
  imageButton: '变更图片',
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
  posted: '发表',
  fairCopy: '誊清',
  closeAlert: '未保存的修改将会丢失。您确定要关闭吗？',
  permissionAudio: '您必须启用录音权限才能使用此功能',
  voiceTitle: '大声朗读培训',
  myVoice: '聆听您录制的声音',
  machine: '聆听机器的声音',
  record: '录音',
  recommend: '什么是有效的学习方法？',
};

const myDiaryList = {
  headerTitle: '我的日记',
  diaryList: {
    one: '我的日记列表{{count}}项',
    other: '我的日记列表{{count}}项',
    zero: '我的日记列表',
  },
  notficationSetting:
    'Interchao应用程序通知已关闭。让我们从“设置”中打开“通知”，以便您可以检查日记的更正时间',
  emptyDiary: '没有日记',
  theme: '主题',
};

const myDiarySerch = {
  placeholder: '按标题和正文搜索',
};

const myPage = {
  headerTitle: '我的页面',
  editButton: '编辑',
  adGetPoints: '通过观看视频广告赚取 {{points}} 积分',
  timeOut: '下一个广告视频 {{activeHour}}~',
};

const notice = {
  headerTitle: '通知',
  finishCorrection: '我的日记批改结束',
  finishReview: '收到评论',
  push: '推送通知',
  mail: '电子邮件通知',
  operation: '管理层通知',
  noMail:
    '※电子邮件地址未注册。如果要使用电子邮件通知，请在"电子邮件地址/密码注册"注册屏幕上进行设置',
};

const onboarding = {
  reminderInitial: '设定学习时间',
  reminderSelectTime: '设定学习时间',
  reminderSelectDay: '安排一天学习',
  pushSetting: '开启通知',
};

const reminderInitial = {
  text: '重要的是要养成学习习惯。让我们固定时间来学习。您可以设置一个提醒，以便在您开始学习时得到通知。',
  submit: '组',
};

const reminderSelectTime = {
  title: '请设定学习时间表',
  fix: '每天同一时间',
  custom: '习俗',
  studyDay: '天',
  time: '时间',
  start: '起始时间',
  end: '结束时间',
  notificationLable: '通知时间',
  notificationStart: '在开始时间通知',
  notificationEnd: '在结束时间通知',
  notificationStartTitle: '时间',
  notificationStartBody: '让我们今天努力吧！',
  notificationEndTitle: '结束时间',
  notificationEndBody: '做得好！',
  notficationAlert: '提醒功能不起作用，因为通知设置已关闭。从您的设备设置中打开Interchao通知。',
};

const reminderSelectDay = {
  title: '请选择星期几学习',
};

const pushSetting = {
  title: '开启通知',
  description: '日记更正或达到提醒时间时，您会收到通知。',
  submit: '打开',
};

const editMyDiaryList = {
  headerTitle: '编辑日记清单',
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
  sameSpokenAlert: '请为 "您会说的其他语言" 和 "您想学习的语言" 和 "你说的语言" 选择另一种语言',
  add: '添加',
};

const setting = {
  headerTitle: '设置',
  title: '基本的',
  reminder: '提醒',
  notice: '通知',
  editEmail: '修改邮箱地址',
  editPassword: '修改密码',
  registerEmailPassword: '注册邮件地址/密码',
  tutorial: '教程',
  deleteAcount: '关于账户注销',
  logout: '注销',
  inquiry: '联系我们',
  about: '什么是Interchao?',
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
  headerTitle: '日记列表',
  searchText: '查找日记',
  diaryList: '你说的语言的日记列表',
  empty: '日记还没有发布',
};

const teachDiarySerch = {
  searchBar: '按标题和正文搜索',
};

const tutorialList = {
  headerTitle: '教程列表',
  postDiary: '如何写日记',
  points: '关于积分',
};

const notFound = {
  text: '找不到您要查找的页',
  link: '返回首页',
};

const record = {
  headerTitle: '记录',
  confirmMessage: '你确定你要删除吗？',
  save: '保存',
  delete: '删除',
  notSave: '超过2分钟的音频无法保存',
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
  optional: '可选的',
};

const firstDiary = {
  first: '首次发布',
};

const userPoints = {
  points: '积分',
};

const userPointsBig = {
  points: '当前积分',
};

//  molecules
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

const inquiry = {
  headerTitle: '查询',
  email: '邮件地址',
  message: '信息',
  title: '感谢您的查询。',
  thanks: '一经确认，我想答复。请等一会儿',
};

// organisms
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
  text1: '请使用',
  text2:
    '进行所有批改。\n\n请在30分钟内完成批改。30分钟后，批改将被丢弃。\n\n开始批改后将会被锁定，其他人将无法对其进行批改。',
  start: '开始批改',
};

const modalAlertPublish = {
  confirmation: '使用{{usePoints}}积分发布日记。发布后将无法编辑。确定发布吗？',
  submit: '发布',
  publish: '日记已发布',
  share: '让我们告诉大家出版的日记',
  first: '谢谢你的第一篇文章\n我们明天也要努力',
  runningDays: '这是连续{{runningDays}}天的日记\n大！',
  runningWeeks: '这是连续{{runningWeeks}}周的日记！\n让我们继续努力',
  good: '感谢您的发表\n明天努力吧',
};

const modalAppReviewRequest = {
  title: '感谢您对Interchao的支持',
  improveTitle: '感谢您在改善Interchao功能方面的合作',
  text: '感谢您使用Interchao。请让我们知道您对进一步改进的想法',
  thanks: '感谢您的评论。我们将使用它进行改进。我们期待您对Interchao的持续支持。',
  improve: '写下您要改善的地方',
  review: '评论',
  notYet: '以后写',
  never: '不审查',
  supplement: '请点击☆评分',
};

const modalBlock = {
  blockedQuestion: '拉黑帐户',
  blockedSuccess: '{{userName}}已被拉黑',
  unblockedQuestion: '取消拉黑{{userName}}?',
  unblockedSuccess: '已取消拉黑{{userName}}',
  blockedMessage:
    '对方将无法在Interchao找到你的个人主页，帖子或快拍。对方不会收到自己被拉黑的通知。',
  unblockedMessage: '对方可以在Interchao向你发送关注请求了。对方不会收到自己已被取消拉黑的通知。',
  blockedButton: '拉黑',
  unblockedButton: '取消拉黑',
  blockedEndMessage: '你可以随时前往用户的个人主页取消拉黑对方。',
  unblockedEndMessage: '你可以随时前往用户的个人主页拉黑他们。',
};

const modalAdPointsGet = {
  title: '赚取积分',
  text: '感谢您观看视频。获得 10 积分',
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
  text: '积分不足。发布日记每{{learnCharacters}}个字符需要10个积分。\n\n批改日记，将获取10个积分。保存草稿可以不消耗积分\n\n或者您可以通过观看视频广告获得 10 积分',
  submit: '继续',
  close: '查找要批改的日记',
  watchAd: '观看视频广告',
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
  hint: '复习简报',
};

const sns = {
  app: '在SNS上共享应用',
  diary: '在SNS上分享您的日记',
};

const teachDiaryCorrection = {
  header: '批改结果',
};

const tutorialPoints = {
  title: '积分',
  buttonText: '开始',
  text: '发布日记需要10个积分起。\n评论将可以获得至少10个积分。\n\n消耗和获得的积分因字符数和语言而不同',
};

const tutorialPostDiary = {
  title: '如何写日记',
  buttonText: '开始',
  text: '试着用{{learnLanguage}}写日记吧。每{{learnCharacters}}个字符需要10个积分。\n\n发布日记的话，可能会有母语者批改您的日记！？让我们互相教外语吧！',
};

const tutorialTeachDiaryList = {
  title: '批改的日记',
  buttonText: '开始',
  text1:
    '这是正在学习你所能教的语言的用户日记列表。每份日记最多可以由三人修改。\n\n请优先修改状态为',
  text2: '的日记。批改后您可以得到10个积分。',
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
  done: '批改结束',
  correcting: '正在批改',
  unread: '未读',
  posted: '发表于',
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

const selectDiaryType = {
  headerTitle: '类型选择',
  recommend: '推荐的',
  titleFree: '您选择的主题',
  titleTheme: '从主题中选择',
  textFree: '日记，您今天无法谈论的内容，喜欢的电影等。写下您选择的主题。',
  textTheme: '根据主题写句子。 如果您不认为该写些什么，推荐使用。',
};

const firstList = {
  selfIntroduction: '自我介绍',
  hobby: '爱好',
  job: '工作',
  study: '学习外语的原因',
  dream: '梦想未来',
  trip: '旅行回忆',
  reborn: '如果重生',
};

const selectThemeSubcategory = {
  headerTitle: '主题选择',
  firstList,
};

const themeGuide = {
  swipeStart: '滑动来移动简报吧',
  swipeEnd: '想复习简报的时候就用滑动来返回',
  introduction: '介绍',
  guideTipTitle: '常用表达',
  expression: '表达',
  example: '例句',
  word: '词汇表',
  guideEndText: '简报在这里结束。实际动手写文章看看吧！',
};

const selfIntroduction = {
  introduction:
    '第一次试着写一下自我介绍吧。遇见新认识的人一定会做自我介绍吧。\n\n如果用{{learnLanguage}}将文章写好，实际对话的时候，就可以说得很流利了',
  expression1: '姓名、通称',
  expression2: '出身地、我长大的城镇',
  expression3: '公司名称、职业',
  expression4: '兴趣',
  example1: '我的名字是田中华。可以叫我阿华。',
  example2: '我出生于神奈川，在东京长大。',
  example3: '我在Interchao，从事程序员的工作。',
  example4: '我喜欢弹吉他。',
  wordTitle: '可用于自我介绍的呈现方式一览',
  word1: '久仰大名，今天幸会了。',
  word2: '请叫我XX。',
  word3: '我在XX出生与成长。',
  word4: '我来自日本。',
  word5: '我有个弟弟。',
  word6: '我和我太太已经结婚５年了。',
  word7: '我大学专攻的是心理学。',
  word8: '我从事XX方面的工作。',
  word9: '我很喜欢旅游。',
  word10: '能认识你，倍感荣幸。',
};

const hobby = {
  introduction:
    '交了新朋友的时候，和同事一起喝酒的时候，关于爱好的谈话是不是很多？{{learnLanguage}}也是一样\n\n爱好是永恒的话题。今天就让自己可以说出“你的爱好”吧',

  expression1: '兴趣的名字',
  expression2: '兴趣的名字、开始兴趣的契机',
  expression3: '关于今后',
  example1: '我的兴趣是跑步。',
  example2: '我开始跑步的契机是参加了全程马拉松。',
  example3: '我今后也想继续这个运动。',
  wordTitle: '兴趣一览',
  word1: '购物',
  word2: '看电影',
  word3: '棒球',
  word4: '学习英文',
  word5: '插花',
  word6: '网站经营',
  word7: '旅行',
  word8: '温泉巡游',
  word9: '拍照',
};

const job = {
  introduction:
    '第三回的主题是工作。是不是已经在很大程度上习惯了写文章了呢？\n\n今天让自己可以写出"你在做什么工作？"吧',
  expression1: '工作地点的名字',
  expression2: '职业',
  expression3: '专门领域',
  example1: '我在Interchao Center工作。',
  example2: '我的专业是英语老师。',
  example3: '我司专门开设一对一教学课程。',
  wordTitle: '职业一览',
  word1: '律师',
  word2: '会计师',
  word3: '工程师',
  word4: '接待',
  word5: '秘书',
  word6: '上班族',
  word7: '制造商',
  word8: '销售商',
  word9: '银行职员',
  word10: '厨师',
  word11: '公务员',
  word12: '教师',
  word13: '医生',
  word14: '药剂师',
  word15: '护理师',
  word16: '创业者',
  word17: '研究员',
  word18: '作家',
};

const study = {
  introduction:
    '你为什么开始学习{{learnLanguage}}了呢？\n\n语言学校，或者去留学的话一定会被问到。用{{learnLanguage}}将理由说出来吧。',
  expression1: '语言、理由',
  expression2: '语言、理由',
  expression3: '语言、理由',
  example1: '我是因为新的工作需要与顾客用英语沟通而开始学习英语的。',
  wordTitle: '理由一览',
  word1: '兴趣和闲暇时间',
  word2: '认识其他国家的人',
  word3: '为了旅行学习英语',
  word4: '学会和外国人对话',
  word5: '工作升职',
  word6: '改行',
  word7: '从事活用英文的工作',
};

const dream = {
  introduction: '你将来想要做什么？\n\n今天把将来的梦想和目标写出来吧。',
  expression1: '将来的梦想',
  expression2: '过去的经历',
  expression3: '想藉由梦想实践的事',
  example1: '我将来的梦想是拥有自己的店。',
  example2: '从小我就喜欢做菜。',
  example3: '我希望让很多人因为我做的菜而感到快乐。',
  wordTitle: '将来的梦想例子一览',
  word1: '成为小学教师',
  word2: '成为绘师',
  word3: '成为职业足球选手',
  word4: '从事国际性的志愿者工作',
  word5: '成为足球杂志的制作者',
  word6: '到非洲工作',
  word7: '将来住在关岛工作',
  word8: '环游日本',
  word9: '还没有将来的梦想',
};

const trip = {
  introduction:
    '这次的主题是旅行。\n\n听朋友说到旅行的事情很开心吧，你也用{{learnLanguage}}准备一个关于旅行的谈话吧。',
  expression1: '去过的国名(都市名)、一起去的人',
  expression2: '访问过的地点、期间',
  expression3: '最深刻的回忆',
  example1: '我和家人一起去了意大利。',
  example2: '我们花了10天造访了罗马、威尼斯和那不勒斯。',
  example3: '最深刻的回忆是坐著小船去卡布里島的蓝洞。',
  wordTitle: '旅行的回忆呈现方式一览',
  word1: '我去了中国远足。',
  word2: '我去了夏威夷的海滩。',
  word3: '我去了韩国购物。',
  word4: '当地的料理真好吃。',
  word5: '当地的人非常亲切。',
  word6: '我在店里找到了很有趣的东西。',
  word7: '我去了以大堡礁闻名的凯恩斯。',
  word8: '出门见丑无人知。',
  word9: '我希望还能再去那里。',
};

const reborn = {
  introduction:
    '这一章最后的主题。"如果是ＸＸ的话。。。"\n\n这个句型在对话中很常见吧。今天就写关于"如果重新活一次的话。。。"吧。',
  expression1: '重生的话想做的事',
  expression2: '理由',
  example1: '有机会重生的话，我想出生在1945年左右。',
  example2: '因为我想跟著1960年代的心理专家学习。',
  wordTitle: '呈现方式一览',
  word1: '如果我重生的话，我想当只鸟。',
  word2: '我想重新活过一回。',
  word3: '如果有机会重生的话，我想当医生。',
  word4: '如果重生的话，我想挑战环游世界。',
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

const zh = {
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

export default zh;
