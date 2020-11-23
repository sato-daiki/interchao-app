import { StyleType } from '@/components/organisms/ThemeGuide';

export const koSelfIntroductionExpressions = [
  '안녕하세요.',
  '만나서 반갑습니다.',
  '제 이름은 _입니다. ',
  '저는 _에서 _ 일을 하고 있습니다.',
  '제 취미는 _입니다.',
  '저는 _에 살고 있습니다.',
  '올해로 결혼한 지 _년째입니다.',
  '감사합니다.',
];

export const koSelfIntroductionExamples = [
  [
    { key: 'a', text: '안녕하세요. ', styleType: StyleType.bold },
    { key: 'b', text: '처음 뵙겠습니다.', styleType: StyleType.p },
  ],
  [{ key: 'a', text: '만나서 반갑습니다.', styleType: StyleType.bold }],
  [
    { key: 'a', text: '제 이름은 ', styleType: StyleType.bold },
    { key: 'b', text: '김철수', styleType: StyleType.p },
    { key: 'c', text: '입니다. ', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '저는 ', styleType: StyleType.bold },
    { key: 'b', text: '회사', styleType: StyleType.p },
    { key: 'c', text: '에서  ', styleType: StyleType.bold },
    { key: 'd', text: '무역', styleType: StyleType.p },
    { key: 'e', text: '일을 하고 있습니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '제 취미는 ', styleType: StyleType.bold },
    { key: 'b', text: '사진을 찍는 것', styleType: StyleType.p },
    { key: 'c', text: '입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '저는 ', styleType: StyleType.bold },
    { key: 'b', text: '서울 잠실', styleType: StyleType.p },
    { key: 'c', text: '에 살고 있습니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '올해로 결혼한 지 ', styleType: StyleType.bold },
    { key: 'b', text: '오', styleType: StyleType.p },
    { key: 'c', text: '년째입니다.', styleType: StyleType.bold },
  ],
  [{ key: 'a', text: '감사합니다.', styleType: StyleType.bold }],
];

export const koHobbyExpressions = [
  '제 취미는 _입니다.',
  '저는 _.',
  '제가 이 취미를 갖게 된 계기는 _.',
  '올해로 _(을)를 시작한 지 _년째입니다.',
  '비용은 _.',
  '앞으로 _ 싶습니다.',
];

export const koHobbyExamples = [
  [
    { key: 'a', text: '제 취미는 ', styleType: StyleType.bold },
    { key: 'b', text: '기타 연주', styleType: StyleType.p },
    { key: 'c', text: '입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '저는 ', styleType: StyleType.bold },
    {
      key: 'b',
      text: '매일 기타를 2시간씩 연습합니다.',
      styleType: StyleType.p,
    },
  ],
  { key: 'a', text: '', styleType: '' },
  [
    {
      key: 'a',
      text: '제가 이 취미를 갖게 된 계기는 ',
      styleType: StyleType.bold,
    },
    {
      key: 'b',
      text: '고등학교 시절 동아리 활동입니다.',
      styleType: StyleType.p,
    },
  ],
  [
    { key: 'a', text: '올해로 ', styleType: StyleType.bold },
    { key: 'b', text: '기타', styleType: StyleType.p },
    { key: 'c', text: '를 시작한 지 ', styleType: StyleType.bold },
    { key: 'd', text: '10', styleType: StyleType.p },
    { key: 'e', text: '년째입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '비용은 ', styleType: StyleType.bold },
    {
      key: 'b',
      text: '기타만 구하면 많이 들지 않습니다.',
      styleType: StyleType.p,
    },
  ],
  [
    { key: 'a', text: '앞으로 ', styleType: StyleType.bold },
    {
      key: 'b',
      text: '더욱 열심히 해서 유튜브에 영상을 올리고 ',
      styleType: StyleType.p,
    },
    { key: 'c', text: '싶습니다.', styleType: StyleType.bold },
  ],
];

export const koJobExpressions = [
  '저는 _입니다.',
  '저는 _에서 일하고 있습니다.',
  '하는 일은 _입니다.',
  '제 직업의 특징은 _.',
  '하루에 보통 _시간 일합니다.',
  '제 직업에서 가장 마음에 드는 점은 _입니다.',
  '제 직업에서 가장 힘든 점은 _입니다.',
  '_(이)가 되려면 _(이)가 필요합니다.',
];

export const koJobExamples = [
  [
    { key: 'a', text: '저는 ', styleType: StyleType.bold },
    { key: 'b', text: '교사', styleType: StyleType.p },
    { key: 'c', text: '입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '저는 ', styleType: StyleType.bold },
    { key: 'b', text: '중학교', styleType: StyleType.p },
    { key: 'c', text: '에서 일하고 있습니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '하는 일은 ', styleType: StyleType.bold },
    { key: 'b', text: '학생들을 가르치는 일', styleType: StyleType.p },
    { key: 'c', text: '입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '제 직업의 특징은 ', styleType: StyleType.bold },
    { key: 'b', text: '출근시간이 이르다는 점입니다.', styleType: StyleType.p },
  ],
  [
    {
      key: 'a',
      text: '제 직업에서 가장 마음에 드는 점은 ',
      styleType: StyleType.bold,
    },
    { key: 'b', text: '방학이 있다는 점', styleType: StyleType.p },
    { key: 'c', text: '입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '제 직업에서 가장 힘든 점', styleType: StyleType.bold },
    { key: 'b', text: '은 잦은 전근', styleType: StyleType.p },
    { key: 'c', text: '입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '교사', styleType: StyleType.p },
    { key: 'b', text: '가 되려면 ', styleType: StyleType.bold },
    { key: 'c', text: '사범대학 졸업증', styleType: StyleType.p },
    { key: 'd', text: '이 필요합니다.', styleType: StyleType.bold },
  ],
];

export const koStudyExpressions = [
  '_에서 _하기 위해 __ 실력이 필요합니다.',
  '__를 통해 _고 싶습니다.',
  '__는 _입니다.',
  '제가 __를 공부하는 이유는 _ 때문입니다.',
  '_(을)를 위해서는 __가 필수입니다.',
  '_ 때문에 __ 시험 점수가 필요합니다.',
];

export const koStudyExamples = [
  [
    { key: 'a', text: '직장', styleType: StyleType.p },
    { key: 'b', text: '에서 ', styleType: StyleType.bold },
    { key: 'c', text: '승진', styleType: StyleType.p },
    { key: 'd', text: '하기 위해 ', styleType: StyleType.bold },
    { key: 'e', text: '영어 ', styleType: StyleType.p },
    { key: 'f', text: '실력이 필요합니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '영어', styleType: StyleType.p },
    { key: 'b', text: '를 통해 ', styleType: StyleType.bold },
    { key: 'c', text: '외국 친구를 사귀', styleType: StyleType.p },
    { key: 'd', text: '고 싶습니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '영어', styleType: StyleType.p },
    { key: 'b', text: '는 ', styleType: StyleType.bold },
    { key: 'c', text: '국제화 시대의 필수 덕목', styleType: StyleType.p },
    { key: 'd', text: '입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '제가 ', styleType: StyleType.bold },
    { key: 'b', text: '영어', styleType: StyleType.p },
    { key: 'c', text: '를 공부하는 이유는 ', styleType: StyleType.bold },
    { key: 'd', text: '외국인 남자친구 ', styleType: StyleType.p },
    { key: 'e', text: '때문입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '대학 수험', styleType: StyleType.p },
    { key: 'b', text: '을 위해서는 ', styleType: StyleType.bold },
    { key: 'c', text: '영어', styleType: StyleType.p },
    { key: 'd', text: '가 필수입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '대학원 진학 ', styleType: StyleType.p },
    { key: 'b', text: '때문에 ', styleType: StyleType.bold },
    { key: 'c', text: '영어 ', styleType: StyleType.p },
    { key: 'd', text: '시험 점수가 필요합니다.', styleType: StyleType.bold },
  ],
];

export const koDreamExpressions = [
  '제 미래의 꿈은 _입니다.',
  '저는 _에 소질이 있습니다.',
  '예전부터 _(을)를 좋아했습니다.',
  '_ 사람이 되고 싶습니다.',
  '_ 것이 꿈입니다.',
  '_(을)를 갖고 싶습니다.',
  '아직 ＿.',
];

export const koDreamExamples = [
  [
    { key: 'a', text: '제 미래의 꿈은 ', styleType: StyleType.bold },
    { key: 'b', text: '만화가', styleType: StyleType.p },
    { key: 'c', text: '입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '저는 ', styleType: StyleType.bold },
    { key: 'b', text: '그림 그리기', styleType: StyleType.p },
    { key: 'c', text: '에 소질이 있습니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '예전부터 ', styleType: StyleType.bold },
    { key: 'b', text: '악기 연주', styleType: StyleType.p },
    { key: 'c', text: '를 좋아했습니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '사회에 보탬이 되는 ', styleType: StyleType.p },
    { key: 'b', text: '사람이 되고 싶습니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '큰돈을 버는 ', styleType: StyleType.p },
    { key: 'b', text: '것이 꿈입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '따듯한 가정', styleType: StyleType.p },
    { key: 'b', text: '을 갖고 싶습니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '아직 ', styleType: StyleType.bold },
    {
      key: 'b',
      text: '자신의 미래에 대해 생각해 본 적이 없습니다.',
      styleType: StyleType.p,
    },
  ],
];

export const koTripExpressions = [
  '저는 이제까지 _(을)를 여행해 보았습니다.',
  '가장 좋았던 나라는 _입니다.',
  '가장 _ 여행한 기간은 _동안입니다.',
  '저는 _여행하는 것을 즐깁니다.',
  '그곳은 _.',
  '_ 여행이었습니다.',
];

export const koTripExamples = [
  [
    { key: 'a', text: '저는 이제까지 ', styleType: StyleType.bold },
    { key: 'b', text: '10개국', styleType: StyleType.p },
    { key: 'c', text: '을 여행해 보았습니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '가장 좋았던 나라는 ', styleType: StyleType.bold },
    { key: 'b', text: '프랑스', styleType: StyleType.p },
    { key: 'c', text: '입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '가장 ', styleType: StyleType.bold },
    { key: 'b', text: '오래 ', styleType: StyleType.p },
    { key: 'c', text: '여행한 기간은 ', styleType: StyleType.bold },
    { key: 'd', text: '한 달 ', styleType: StyleType.p },
    { key: 'e', text: '동안입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '저는 ', styleType: StyleType.bold },
    { key: 'b', text: '혼자서 ', styleType: StyleType.p },
    { key: 'c', text: '여행하는 것을 즐깁니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '그곳은 ', styleType: StyleType.bold },
    { key: 'b', text: '추웠지만, 인상에 남았습니다.', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: '오랫동안 기억에 남을 만한 ', styleType: StyleType.p },
    { key: 'b', text: '여행이었습니다.', styleType: StyleType.bold },
  ],
];

export const koRebornExpressions = [
  '다시 태어난다면, 저는 _.',
  '왜냐하면, _ 때문입니다.',
  '가능하다면 _로 태어나고 싶습니다.',
  '_에서 태어나고 싶습니다.',
  '다시 태어나더라도, 저는_.',
];

export const koRebornExamples = [
  [
    { key: 'a', text: '다시 태어난다면, 저는 ', styleType: StyleType.bold },
    { key: 'b', text: '여자로 태어나고 싶습니다.', styleType: StyleType.p },
  ],
  [
    { key: 'a', text: '왜냐하면, ', styleType: StyleType.bold },
    { key: 'b', text: '군대에 들어가지 않아도 되기 ', styleType: StyleType.p },
    { key: 'c', text: '때문입니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '가능하다면 ', styleType: StyleType.bold },
    { key: 'b', text: '부자', styleType: StyleType.p },
    { key: 'c', text: '로 태어나고 싶습니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '화목한 가정', styleType: StyleType.p },
    { key: 'b', text: '에서 태어나고 싶습니다.', styleType: StyleType.bold },
  ],
  [
    { key: 'a', text: '다시 태어나더라도, ', styleType: StyleType.bold },
    { key: 'b', text: '저는 ', styleType: StyleType.p },
    { key: 'c', text: '지금 인생을 살고 싶습니다.', styleType: StyleType.bold },
  ],
];
