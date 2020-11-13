import { Baseball } from '@/images';
import { Entry } from '../interface';

export const selfIntroduction: Entry[] = [
  {
    key: 'introduction',
    params: {
      text: 'introduction introduction introduction introduction',
      source: Baseball,
    },
  },
  {
    key: 'tip',
    params: {
      examples: [
        {
          id: 1,
          learnText: [
            { id: 1, text: 'I work', styleType: 'bold' },
            { id: 2, text: 'for Interchao Center.', styleType: 'p' },
          ],
          nativeText: '私はInterchao Centerで仕事をしています。',
        },
        {
          id: 2,
          learnText: [
            { id: 1, text: 'It’s a', styleType: 'bold' },
            { id: 2, text: 'English school.', styleType: 'p' },
          ],
          nativeText: 'Interchao Centerは英会話学校です。',
        },
        {
          id: 3,
          learnText: [
            { id: 1, text: 'We', styleType: 'bold' },
            {
              id: 2,
              text: 'teach English to Japanese people.',
              styleType: 'p',
            },
          ],
          nativeText: '私たちは日本人に英語を教えています。',
        },
        {
          id: 4,
          learnText: [
            { id: 1, text: 'Our company specializes in', styleType: 'bold' },
            { id: 2, text: 'private lessons.', styleType: 'p' },
          ],
          nativeText: '弊社はマンツーマンレッスンを専門にしています。',
        },
        {
          id: 5,
          learnText: [
            { id: 1, text: 'We provide', styleType: 'bold' },
            {
              id: 2,
              text: 'customized lesson plans for each student.',
              styleType: 'p',
            },
          ],
          nativeText: '各生徒さんにレッスンをカスタマイズしています。',
        },
      ],
      expressions: [
        {
          id: 1,
          learnText: 'I work for __',
          nativeText: '勤務先の名前',
        },
        {
          id: 2,
          learnText: 'It’s a',
          nativeText: '業種・業態',
        },
        {
          id: 3,
          learnText: 'We',
          nativeText: '業務内容についての説明',
        },
        {
          id: 4,
          learnText: 'Our company specializes in',
          nativeText: '専門分野',
        },
        {
          id: 5,
          learnText: 'We provide',
          nativeText: '提供するサービス・商品',
        },
      ],
    },
  },
  {
    key: 'word',
    params: {
      title: '職業リスト',
      words: [
        {
          id: 1,
          learnText: 'Lawyer',
          nativeText: '弁護士',
        },
        {
          id: 2,
          learnText: 'Accountant',
          nativeText: '会計士',
        },
        {
          id: 3,
          learnText: 'Engineer',
          nativeText: 'エンジニア',
        },
        {
          id: 4,
          learnText: 'Receptionist',
          nativeText: '受付',
        },
        {
          id: 5,
          learnText: 'Secretary',
          nativeText: '秘書',
        },
        {
          id: 6,
          learnText: 'Office worker ',
          nativeText: '会社員',
        },
        {
          id: 7,
          learnText: 'Manufacturer',
          nativeText: '製造業者',
        },
        {
          id: 8,
          learnText: 'Seller/Supplier/Dealer',
          nativeText: '販売業者',
        },
        {
          id: 9,
          learnText: 'Bank clerk',
          nativeText: '銀行員',
        },
        {
          id: 10,
          learnText: 'Public worker',
          nativeText: '公務員',
        },
        {
          id: 11,
          learnText: 'Public worker',
          nativeText: '公務員',
        },
        {
          id: 12,
          learnText: 'Teacher',
          nativeText: '先生',
        },
        {
          id: 13,
          learnText: 'Doctor',
          nativeText: '医者',
        },
        {
          id: 14,
          learnText: 'Pharmacist',
          nativeText: '薬剤師',
        },
        {
          id: 15,
          learnText: 'Nurse',
          nativeText: '医者',
        },
        {
          id: 16,
          learnText: 'Entrepreneur',
          nativeText: '起業家',
        },
        {
          id: 17,
          learnText: 'Researcher',
          nativeText: '研究員',
        },
        {
          id: 18,
          learnText: 'Author/Writer',
          nativeText: '作家',
        },
      ],
    },
  },
];
