import { StyleType } from '@/components/organisms/ThemeGuide';

export const koSelfIntroductionExpressions = [
  '제 이름은 __입니다. __라고 불러 주세요.',
  '__에서 태어나 __에서 자랐습니다.',
  '__에서 __(으)로 일하고 있습니다.',
  '__(을)를 좋아합니다.',
];

export const koSelfIntroductionExamples = [
  [
    { key: 'a', text: '제 이름은 ', styleType: 'bold' },
    { key: 'b', text: '타나카하나', styleType: 'p' },
    { key: 'c', text: '입니다. ', styleType: 'bold' },
    { key: 'd', text: '하나', styleType: 'p' },
    { key: 'e', text: '라고 불러 주세요.', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '가나가와', styleType: 'p' },
    { key: 'b', text: '에서 태어나 ', styleType: 'bold' },
    { key: 'c', text: '도쿄', styleType: 'p' },
    { key: 'd', text: '에서 자랐습니다.', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '인터차오', styleType: 'p' },
    { key: 'b', text: '에서 ', styleType: 'bold' },
    { key: 'c', text: '마케팅 디렉터', styleType: 'p' },
    { key: 'd', text: '로 일하고 있습니다.', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '기타 치는 것', styleType: 'p' },
    { key: 'b', text: '을 좋아합니다. ', styleType: 'bold' },
  ],
];

export const koHobbyExpressions = [
  '제 취미는 __입니다.',
  '저는 __(을)를 계기로 __(을)를 시작하게 되었습니다.',
  '저는 앞으로도 __(을)를 계속해 나가고 싶습니다.',
];

export const koHobbyExamples = [
  [
    { key: 'a', text: '제 취미는 ', styleType: 'bold' },
    { key: 'b', text: '달리기', styleType: 'p' },
    { key: 'c', text: '입니다.', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '저는 ', styleType: 'bold' },
    { key: 'b', text: '풀 마라톤에 참가했던 것', styleType: 'p' },
    { key: 'c', text: '을 계기로 ', styleType: 'bold' },
    { key: 'd', text: '달리기', styleType: 'p' },
    { key: 'e', text: '를 시작하게 되었습니다.', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '저는 앞으로도 ', styleType: 'bold' },
    { key: 'b', text: '운동', styleType: 'p' },
    { key: 'c', text: '을 계속해 나가고 싶습니다.', styleType: 'bold' },
  ],
];

export const koJobExpressions = [
  '저는 __에서 일하고 있습니다.',
  '저의 직업은 __입니다.',
  '당사는 __(을)를 전문으로 하고 있습니다.',
];

export const koJobExamples = [
  [
    { key: 'a', text: '저는 ', styleType: 'bold' },
    { key: 'b', text: 'Interchao Center', styleType: 'p' },
    { key: 'c', text: '에서 일하고 있습니다.', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '저의 직업은 ', styleType: 'bold' },
    { key: 'b', text: '영어 선생님', styleType: 'p' },
    { key: 'c', text: '입니다.', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '당사는 ', styleType: 'bold' },
    { key: 'b', text: '1:1 레슨', styleType: 'p' },
    { key: 'c', text: '을 전문으로 하고 있습니다.', styleType: 'bold' },
  ],
];

export const koStudyExpressions = [
  '제가 __를 공부하는 이유는 __ 때문입니다.',
  '__(을)를 위해서는 __가 필수입니다.',
  '__ 때문에 __ 시험 점수가 필요합니다.',
];

export const koStudyExamples = [
  [
    {
      key: 'a',
      text: '제가 ',
      styleType: 'bold',
    },
    { key: 'b', text: '영어 ', styleType: 'p' },
    { key: 'c', text: '를 공부하는 이유는 ', styleType: 'bold' },
    {
      key: 'd',
      text: '새 직장에서 고객과 기본적으로 영어를 써야하기 때문입니다.',
      styleType: 'p',
    },
  ],
];

export const koDreamExpressions = [
  '저의 꿈은 __입니다.',
  '저는 어릴 적부터 __',
  '__(으)면 좋겠습니다.',
];

export const koDreamExamples = [
  [
    { key: 'a', text: '저의 꿈은 ', styleType: 'bold' },
    { key: 'b', text: '내 가게를 갖는 것', styleType: 'p' },
    { key: 'c', text: '입니다.', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '저는 어릴 적부터 ', styleType: 'bold' },
    { key: 'b', text: '요리를 좋아했습니다.', styleType: 'p' },
  ],
  [
    {
      key: 'a',
      text: '많은 사람이 제가 만든 음식을 먹고 기뻐했',
      styleType: 'p',
    },
    { key: 'b', text: '으면 좋겠습니다.', styleType: 'bold' },
  ],
];

export const koTripExpressions = [
  '저는 __(와)과 함께 _에 갔습니다.',
  '우리는 __일간 __(을)를 방문했습니다.',
  '가장 기억에 남는 건 __입니다.',
];

export const koTripExamples = [
  [
    { key: 'a', text: '저는 ', styleType: 'bold' },
    { key: 'b', text: '가족', styleType: 'p' },
    { key: 'c', text: '과 함께 ', styleType: 'bold' },
    { key: 'd', text: '이탈리아', styleType: 'p' },
    { key: 'e', text: '에 갔습니다.', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '우리는 ', styleType: 'bold' },
    { key: 'b', text: '10', styleType: 'p' },
    { key: 'c', text: '일간 ', styleType: 'bold' },
    { key: 'd', text: '로마와 베네치아, 나폴리', styleType: 'p' },
    { key: 'e', text: '를 방문했습니다.', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '가장 기억에 남는 건 ', styleType: 'bold' },
    { key: 'b', text: '보트를 타고 푸른 동굴에 갔던 것', styleType: 'p' },
    { key: 'c', text: '입니다.', styleType: 'bold' },
  ],
];

export const koRebornExpressions = [
  '다시 태어난다면 __고 싶습니다.',
  '왜냐하면 __(이)기 때문입니다.',
];

export const koRebornExamples = [
  [
    { key: 'a', text: '다시 태어난다면 ', styleType: 'bold' },
    { key: 'b', text: '1945년쯤에 태어나', styleType: 'p' },
    { key: 'c', text: '고 싶습니다.', styleType: 'bold' },
  ],
  [
    { key: 'a', text: '왜냐하면 ', styleType: 'bold' },
    {
      key: 'b',
      text: '1960년대 살았던 심리학자에게 배우고 싶',
      styleType: 'p',
    },
    { key: 'c', text: '기 때문입니다.', styleType: 'bold' },
  ],
];
