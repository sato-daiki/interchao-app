import { StyleType } from '@/components/organisms/ThemeGuide';

export const jaSelfIntroductionExpressions = [
  'こんにちは。',
  'はじめまして。',
  '私の名前は__です。__とよんでください。',
  '私は__で生まれまして、__で育ちました。',
  '私は__で__として働いています。',
  '私は__が好きです。',
  'ありがとうございました。',
];

export const jaSelfIntroductionExamples = [
  [{ key: 'a', text: 'こんにちは。', styleType: StyleType.bold }],
  [{ key: 'a', text: 'はじめまして。', styleType: StyleType.bold }],
  [
    { key: 'a', text: '私の名前は', styleType: StyleType.bold },
    { key: 'b', text: '田中はな', styleType: StyleType.p },
    { key: 'c', text: 'です。', styleType: StyleType.bold },
    { key: 'd', text: 'はな', styleType: StyleType.p },
    { key: 'e', text: 'とよんでください。', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '私は', styleType: StyleType.bold },
    { key: 'b', text: '神奈川', styleType: StyleType.p },
    { key: 'c', text: 'で生まれて。', styleType: StyleType.bold },
    { key: 'd', text: '東京', styleType: StyleType.p },
    { key: 'e', text: 'で育ちました', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '私は', styleType: StyleType.bold },
    { key: 'b', text: 'インターチャオ', styleType: StyleType.p },
    { key: 'c', text: 'で', styleType: StyleType.bold },
    { key: 'd', text: 'マーケティングディレクター', styleType: StyleType.p },
    { key: 'e', text: 'として働いています。', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '私は', styleType: StyleType.bold },
    { key: 'b', text: 'ギターを弾くの', styleType: StyleType.p },
    { key: 'c', text: 'が好きです。', styleType: StyleType.bold },
  ],
  [{ key: 'a', text: 'ありがとうございました。', styleType: StyleType.bold }],
];

export const jaHobbyExpressions = [
  '私の趣味は__',
  '私が__を始めたきっかけは__',
  '私は__したいです',
];

export const jaHobbyExamples = [
  [
    { key: 'a', text: '私の趣味は', styleType: StyleType.bold },
    { key: 'b', text: 'ランニングです。', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: '私が', styleType: StyleType.bold },
    { key: 'b', text: 'ランニング', styleType: StyleType.p },
    { key: 'c', text: 'を始めたきっかけは', styleType: StyleType.bold },
    {
      key: 'd',
      text: 'フルマラソンに参加したことです。',
      styleType: StyleType.p,
    },
  ],
  [
    { key: 'a', text: '私は', styleType: StyleType.bold },
    { key: 'b', text: '今後もこの運動を続けて', styleType: StyleType.p },
    { key: 'c', text: 'いきたいです。', styleType: StyleType.bold },
  ],
];

export const jaJobExpressions = [
  '私は__で仕事をしています。',
  '私の職業は__です。',
  '弊社は__を専門にしています。',
];

export const jaJobExamples = [
  [
    { key: 'a', text: '私は', styleType: StyleType.bold },
    { key: 'b', text: 'Interchao Center', styleType: StyleType.p },
    { key: 'c', text: 'で仕事をしています。', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '私の職業は', styleType: StyleType.bold },
    { key: 'b', text: '英語の先生', styleType: StyleType.p },
    { key: 'c', text: 'です。', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '弊社は', styleType: StyleType.bold },
    { key: 'b', text: 'マンツーマンレッスン', styleType: StyleType.p },
    { key: 'c', text: 'を専門にしています。', styleType: StyleType.bold },
  ],
];

export const jaStudyExpressions = [
  '私が__の勉強を始めた理由は__',
  'なぜ__の勉強を始めたかというと__',
  '__の勉強を始めたきっかけは__',
];

export const jaStudyExamples = [
  [
    {
      key: 'a',
      text: '私が',
      styleType: StyleType.bold,
    },
    { key: 'b', text: '英語', styleType: StyleType.p },
    { key: 'c', text: 'の勉強を始めた理由は、', styleType: StyleType.bold },
    {
      key: 'd',
      text: '新しい仕事で顧客と基本的に英語を使わなければならないからです。',
      styleType: StyleType.p,
    },
  ],
];

export const jaDreamExpressions = [
  '私の夢は__',
  '私は小さいころから__',
  '__もらいたいです。',
];

export const jaDreamExamples = [
  [
    { key: 'a', text: '私の夢は', styleType: StyleType.bold },
    { key: 'b', text: '自分のお店を持つことです。', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: '私は小さいころから', styleType: StyleType.bold },
    { key: 'b', text: '料理をすることが好きでした。', styleType: StyleType.p },
  ],
  [
    {
      key: 'a',
      text: '多くの人に私の料理を食べて喜んで',
      styleType: StyleType.p,
    },
    { key: 'b', text: 'もらいたいです。', styleType: StyleType.bold },
  ],
];

export const jaTripExpressions = [
  '私は__へ__と一緒に行きました。',
  '私たちは__日間で__を訪れました。',
  '一番の思い出は、__',
];

export const jaTripExamples = [
  [
    { key: 'a', text: '私は', styleType: StyleType.bold },
    { key: 'b', text: 'イタリア', styleType: StyleType.p },
    { key: 'c', text: 'へ', styleType: StyleType.bold },
    { key: 'd', text: '家族', styleType: StyleType.p },
    { key: 'e', text: 'と一緒に行きました', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '私たちは', styleType: StyleType.bold },
    { key: 'b', text: '１０', styleType: StyleType.p },
    { key: 'c', text: '日間で', styleType: StyleType.bold },
    { key: 'd', text: 'ローマとベネチアとナポリ', styleType: StyleType.p },
    { key: 'e', text: 'を訪れました。', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '一番の思い出は、', styleType: StyleType.bold },
    {
      key: 'b',
      text: '青の洞窟へボートで行ったことです。',
      styleType: StyleType.p,
    },
  ],
];

export const jaRebornExpressions = [
  '生まれ変われるなら、__したいです。',
  'なぜなら__たいからです。',
];

export const jaRebornExamples = [
  [
    { key: 'a', text: '生まれ変われるなら', styleType: StyleType.bold },
    { key: 'b', text: '1945年頃に生まれ', styleType: StyleType.p },
    { key: 'c', text: 'たいです。', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: 'なぜなら、', styleType: StyleType.bold },
    {
      key: 'b',
      text: '1960年代の生きた心理学者に学び',
      styleType: StyleType.p,
    },
    { key: 'c', text: 'たいからです。', styleType: StyleType.bold },
  ],
];
