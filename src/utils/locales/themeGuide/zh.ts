import { StyleType } from '@/components/organisms/ThemeGuide';

export const zhSelfIntroductionExpressions = [
  '你好。',
  '初次见面，请多指教。',
  '我的名字是__。可以叫我__。',
  '我出生于__。在__长大。',
  '我在__，从事__的工作。',
  '我喜欢__。',
  '谢谢你。',
];

export const zhSelfIntroductionExamples = [
  [{ key: 'a', text: '你好。', styleType: StyleType.bold }],
  [{ key: 'a', text: '初次见面，请多指教。', styleType: StyleType.bold }],
  [
    { key: 'a', text: '我的名字是', styleType: StyleType.bold },
    { key: 'b', text: '田中华。', styleType: StyleType.p },
    { key: 'c', text: '可以叫我', styleType: StyleType.bold },
    { key: 'd', text: '阿华。', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: '我出生于', styleType: StyleType.bold },
    { key: 'b', text: '神奈川,', styleType: StyleType.p },
    { key: 'c', text: '在', styleType: StyleType.bold },
    { key: 'd', text: '东京', styleType: StyleType.p },
    { key: 'e', text: '长大。', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '我在', styleType: StyleType.bold },
    { key: 'b', text: 'Interchao，', styleType: StyleType.p },
    { key: 'c', text: '从事', styleType: StyleType.bold },
    { key: 'd', text: '程序员', styleType: StyleType.p },
    { key: 'e', text: '的工作。', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '我喜欢', styleType: StyleType.bold },
    { key: 'b', text: '弹吉他。', styleType: StyleType.p },
  ],
  [{ key: 'a', text: '谢谢你。', styleType: StyleType.bold }],
];

export const zhHobbyExpressions = [
  '我的兴趣是__',
  '我开始__的契机是__',
  '我今后__',
];

export const zhHobbyExamples = [
  [
    { key: 'a', text: '我的兴趣是', styleType: StyleType.bold },
    { key: 'b', text: '跑步。', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '我开始', styleType: StyleType.bold },
    { key: 'b', text: '跑步', styleType: StyleType.p },
    { key: 'c', text: '的契机是', styleType: StyleType.bold },
    { key: 'd', text: '参加了全程马拉松。', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: '我今后', styleType: StyleType.bold },
    { key: 'b', text: '也想继续这个运动。', styleType: StyleType.p },
  ],
];

export const zhJobExpressions = ['我在__工作', '我的专业是__', '我司专门__'];

export const zhJobExamples = [
  [
    { key: 'a', text: '我在', styleType: StyleType.bold },
    { key: 'b', text: 'Interchao Center', styleType: StyleType.p },
    { key: 'c', text: '工作。', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '我的专业是', styleType: StyleType.bold },
    { key: 'b', text: '英语老师。', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: '我司专门', styleType: StyleType.bold },
    { key: 'b', text: '开设一对一教学课程。', styleType: StyleType.p },
  ],
];

export const zhStudyExpressions = [
  '我是因为__而开始学习__的',
  '我开始学习__是因为__',
  '让我学习__的动力是__',
];

export const zhStudyExamples = [
  [
    { key: 'a', text: '我是因为', styleType: StyleType.bold },
    { key: 'b', text: '新的工作需要与顾客用英语沟通', styleType: StyleType.p },
    { key: 'c', text: '而开始学习', styleType: StyleType.bold },
    { key: 'd', text: '英语', styleType: StyleType.p },
    { key: 'e', text: '的。', styleType: StyleType.bold },
  ],
];

export const zhDreamExpressions = ['我将来的梦想是__', '从小__', '我希望__'];

export const zhDreamExamples = [
  [
    { key: 'a', text: '我将来的梦想是', styleType: StyleType.bold },
    { key: 'b', text: '拥有自己的店。', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: '从小', styleType: StyleType.bold },
    { key: 'b', text: '我就喜欢做菜。', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: '我希望', styleType: StyleType.bold },
    {
      key: 'b',
      text: '让很多人因为我做的菜而感到快乐。',
      styleType: StyleType.p,
    },
  ],
];

export const zhTripExpressions = [
  '我和__一起去了__',
  '我们花了__造访了__',
  '最深刻的回忆是__',
];

export const zhTripExamples = [
  [
    { key: 'a', text: '我和', styleType: StyleType.bold },
    { key: 'b', text: '家人', styleType: StyleType.p },
    { key: 'c', text: '一起去了', styleType: StyleType.bold },
    { key: 'd', text: '意大利。', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: '我们花了', styleType: StyleType.bold },
    { key: 'b', text: '10天', styleType: StyleType.p },
    { key: 'c', text: '造访了', styleType: StyleType.bold },
    { key: 'd', text: '罗马、威尼斯和那不勒斯。', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: '最深刻的回忆是', styleType: StyleType.bold },
    { key: 'b', text: '坐著小船去卡布里島的蓝洞。', styleType: StyleType.p },
  ],
];

export const zhRebornExpressions = ['如果我重生，我想__', '因为我__。'];
export const zhRebornExamples = [
  [
    { key: 'a', text: '如果我重生，我想', styleType: StyleType.bold },
    { key: 'b', text: '出生在1945年左右。', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: '因为我', styleType: StyleType.bold },
    {
      key: 'b',
      text: '想跟著1960年代的心理专家学习。',
      styleType: StyleType.p,
    },
  ],
];