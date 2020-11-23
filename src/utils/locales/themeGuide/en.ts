import { StyleText, StyleType } from '@/components/organisms/ThemeGuide';

export const enSelfIntroductionExpressions = [
  'Hello',
  'Nice to meet you.',
  'My name is ＿ . Please call me ＿.',
  'I got married __.',
  'I was born in ＿.',
  'I work for ＿ as a ＿',
  'I like ＿',
  'Thank you.',
];

export const enSelfIntroductionExamples = [
  [{ key: 'a', text: 'Hello.', styleType: StyleType.bold }],
  [{ key: 'b', text: 'Nice to meet you.', styleType: StyleType.bold }],
  [
    { key: 'a', text: 'My name is', styleType: StyleType.bold },
    { key: 'b', text: 'Hana Tanaka.', styleType: StyleType.p },
    { key: 'c', text: 'Please call me', styleType: StyleType.bold },
    { key: 'd', text: 'Hana.', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: 'I was born in', styleType: StyleType.bold },
    {
      key: 'b',
      text: 'Kanagawa but grew up in Tokyo.',
      styleType: StyleType.p,
    },
  ],
  [
    { key: 'a', text: 'I got married', styleType: StyleType.bold },
    { key: 'b', text: 'last year.', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: 'I work for', styleType: StyleType.bold },
    { key: 'b', text: 'Interchao', styleType: StyleType.p },
    { key: 'c', text: 'as a', styleType: StyleType.bold },
    { key: 'd', text: 'marketing director.', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: 'I like', styleType: StyleType.bold },
    { key: 'b', text: 'playing the guitar.', styleType: StyleType.p },
  ],
  [{ key: 'a', text: 'Thank you.', styleType: StyleType.bold }],
] as StyleText[][];

export const enHobbyExpressions = [
  'My hobby is ＿',
  'I ＿',
  'The reason I started ＿ was＿',
  '_ helps me to _',
  'I want to _',
];

export const enHobbyExamples = [
  [
    { key: 'a', text: 'My hobby is', styleType: StyleType.bold },
    { key: 'b', text: 'running.', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: 'I', styleType: StyleType.bold },
    {
      key: 'b',
      text: 'run in my neighborhood every morning.',
      styleType: StyleType.p,
    },
  ],
  [
    { key: 'a', text: 'The reason I started', styleType: StyleType.bold },
    { key: 'b', text: 'running', styleType: StyleType.p },
    { key: 'c', text: 'was', styleType: StyleType.bold },
    {
      key: 'd',
      text: 'that I participated in a full Marathon.',
      styleType: StyleType.p,
    },
  ],
  [
    { key: 'a', text: 'Running', styleType: StyleType.p },
    { key: 'b', text: 'helps me to', styleType: StyleType.bold },
    { key: 'c', text: 'be refreshed.', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: 'I want to', styleType: StyleType.bold },
    {
      key: 'b',
      text: 'continue with this kind of exercise.',
      styleType: StyleType.p,
    },
  ],
];

export const enJobExpressions = [
  'I work for __',
  'It’s a __',
  'We __',
  'Our company specializes in __',
  'We provide __',
];

export const enJobExamples = [
  [
    { key: 'a', text: 'I work for', styleType: StyleType.bold },
    { key: 'b', text: 'Interchao Center.', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: 'It’s an', styleType: StyleType.bold },
    { key: 'b', text: 'English school.', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: 'We', styleType: StyleType.bold },
    {
      key: 'b',
      text: 'teach English to Japanese people.',
      styleType: StyleType.p,
    },
  ],
  [
    { key: 'a', text: 'Our company specializes in', styleType: StyleType.bold },
    { key: 'b', text: 'private lessons.', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: 'We provide', styleType: StyleType.bold },
    {
      key: 'b',
      text: 'customized lesson plans for each student.',
      styleType: StyleType.p,
    },
  ],
];

export const enStudyExpressions = [
  'I started learning __ because..........',
  'My reason for studying __ is ...........',
  'I am motivated to learn __ because........... ',
];

export const enStudyExamples = [
  [
    { key: 'a', text: 'My reason for studying ', styleType: StyleType.bold },
    { key: 'b', text: 'English ', styleType: StyleType.bold },
    { key: 'c', text: 'is', styleType: StyleType.bold },
    {
      key: 'd',
      text: 'that in my new job, I have to use English regularly with clients.',
      styleType: StyleType.p,
    },
  ],
];

export const enDreamExpressions = [
  'My dream for the future is ＿',
  'I ＿',
  "I'd like ＿",
];

export const enDreamExamples = [
  [
    { key: 'a', text: 'My dream for the future is', styleType: StyleType.bold },
    { key: 'b', text: 'to have my own shop.', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: 'I', styleType: StyleType.bold },
    {
      key: 'b',
      text: 'loved to cook dishes since I was a child.',
      styleType: StyleType.p,
    },
  ],
  [
    { key: 'a', text: "I'd like", styleType: StyleType.bold },
    {
      key: 'b',
      text: 'many people to eat my cooking and feel happy.',
      styleType: StyleType.p,
    },
  ],
];

export const enTripExpressions = [
  'I went to＿ with＿.',
  'We visited ＿in ＿days.',
  'My favorite memory is ＿.',
  'It was ＿.',
];
export const enTripExamples = [
  [
    { key: 'a', text: 'I went to', styleType: StyleType.bold },
    { key: 'b', text: 'Italy', styleType: StyleType.p },
    { key: 'c', text: 'with', styleType: StyleType.bold },
    { key: 'd', text: 'my family.', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: 'We visited', styleType: StyleType.bold },
    { key: 'b', text: 'Roma, Venice, and Naples', styleType: StyleType.p },
    { key: 'c', text: 'in', styleType: StyleType.bold },
    { key: 'd', text: '10days.', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: 'My favorite memory is', styleType: StyleType.bold },
    {
      key: 'b',
      text: 'that we went to the Blue Grotto by boat.',
      styleType: StyleType.p,
    },
  ],
  [
    { key: 'a', text: 'It was', styleType: StyleType.bold },
    {
      key: 'b',
      text: 'very beautiful and I was impressed.',
      styleType: StyleType.p,
    },
  ],
];

export const enRebornExpressions = [
  "If I were born again, I'd like to＿",
  "Because I'd like to ＿.",
  "It's ＿and I'd like to ＿.",
];

export const enRebornExamples = [
  [
    {
      key: 'a',
      text: "If I were born again, I'd like to",
      styleType: StyleType.bold,
    },
    { key: 'b', text: 'be myself again.', styleType: StyleType.p },
  ],
  [
    {
      key: 'a',
      text:
        "I was born in 1990, but if I were born, I'd like to be born around 1945.",
      styleType: StyleType.p,
    },
  ],
  [
    { key: 'a', text: "Because I'd like to", styleType: StyleType.bold },
    {
      key: 'b',
      text: 'learn real physiotherapy in the 1960s.',
      styleType: StyleType.p,
    },
  ],
  [
    {
      key: 'a',
      text: 'In the 1960s, many famous psychotherapists were active.',
      styleType: StyleType.p,
    },
  ],
  [
    { key: 'a', text: "It's", styleType: StyleType.bold },
    { key: 'b', text: 'my dream', styleType: StyleType.p },
    { key: 'c', text: "and I'd like to", styleType: StyleType.bold },
    { key: 'd', text: 'be born again.', styleType: StyleType.p },
  ],
];
