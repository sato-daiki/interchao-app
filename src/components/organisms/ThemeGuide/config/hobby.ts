import { Entry } from '../interface';

export const hobby: Entry[] = [
  {
    key: 'introduction',
    params: {
      text:
        '今日は趣味について書いていきます。趣味は〇〇ですよね。頑張っていきましょう',
    },
  },
  {
    key: 'tip',
    params: {
      examples: [
        {
          learnText: [
            { text: 'I work', styleType: 'bold' },
            { text: 'for Interchao Center.', styleType: 'p' },
          ],
          nativeText: '私はInterchao Centerで仕事をしています。',
        },
        {
          learnText: [
            { text: 'It’s a', styleType: 'bold' },
            { text: 'English school.', styleType: 'p' },
          ],
          nativeText: 'Interchao Centerは英会話学校です。',
        },
        {
          learnText: [
            { text: 'We', styleType: 'bold' },
            { text: 'teach English to Japanese people.', styleType: 'p' },
          ],
          nativeText: '私たちは日本人に英語を教えています。',
        },
        {
          learnText: [
            { text: 'Our company specializes in', styleType: 'bold' },
            { text: 'private lessons.', styleType: 'p' },
          ],
          nativeText: '弊社はマンツーマンレッスンを専門にしています。',
        },
        {
          learnText: [
            { text: 'We provide', styleType: 'bold' },
            {
              text: 'customized lesson plans for each student.',
              styleType: 'p',
            },
          ],
          nativeText: '各生徒さんにレッスンをカスタマイズしています。',
        },
      ],
      words: [
        {
          learnText: 'Lawyer',
          nativeText: '弁護士',
        },
        {
          learnText: 'Accountant',
          nativeText: '会計士',
        },
        {
          learnText: 'Engineer',
          nativeText: 'エンジニア',
        },
        {
          learnText: 'Receptionist',
          nativeText: '受付',
        },
        {
          learnText: 'Secretary',
          nativeText: '秘書',
        },
        {
          learnText: 'Office worker ',
          nativeText: '会社員',
        },
        {
          learnText: 'Manufacturer',
          nativeText: '製造業者',
        },
        {
          learnText: 'Seller/Supplier/Dealer',
          nativeText: '販売業者',
        },
        {
          learnText: 'Bank clerk',
          nativeText: '銀行員',
        },
        {
          learnText: 'Public worker',
          nativeText: '公務員',
        },
        {
          learnText: 'Public worker',
          nativeText: '公務員',
        },
        {
          learnText: 'Teacher',
          nativeText: '先生',
        },
        {
          learnText: 'Doctor',
          nativeText: '医者',
        },
        {
          learnText: 'Pharmacist',
          nativeText: '薬剤師',
        },
        {
          learnText: 'Nurse',
          nativeText: '医者',
        },
        {
          learnText: 'Entrepreneur',
          nativeText: '起業家',
        },
        {
          learnText: 'Researcher',
          nativeText: '研究員',
        },
        {
          learnText: 'Author/Writer',
          nativeText: '作家',
        },
      ],
      expressions: [
        {
          learnText: 'I work for __',
          nativeText: '勤務先の名前',
        },
        {
          learnText: 'It’s a',
          nativeText: '業種・業態',
        },
        {
          learnText: 'We',
          nativeText: '業務内容についての説明',
        },
        {
          learnText: 'Our company specializes in',
          nativeText: '専門分野',
        },
        {
          learnText: 'We provide',
          nativeText: '提供するサービス・商品',
        },
      ],
    },
  },
];
