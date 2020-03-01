import { Profile, User, Diary } from '../types';

export const profile: Profile = {
  name: 'daiki sato',
  userName: 'daiki12345',
  photoUrl: 'https://flickrtheblog.files.wordpress.com/2019/05/panda402x.png',
  pro: true,
  learnLanguage: 'en',
  nativeLanguage: 'ja',
  introduction: "I'm daiki. Nice to meet you.",
  createdAt: '2020年2月17日 0:00:00 UTC+9',
  updatedAt: '2020年2月17日 0:00:00 UTC+9',
};

export const user: User = {
  premium: false,
  confirmDiary: false,
  confirmReview: false,
  email: 'daiki0520daiki0520@yahoo.co.jp',
  points: 600,
  createdAt: {
    seconds: 11111,
    nanoseconds: 22222,
  },
  updatedAt: '2020年2月17日 0:00:00 UTC+9',
};

export const diary: Diary = {
  profile: {
    name: 'daiki sato',
    photoUrl: 'http:/aaaa',
    ref: '////////',
  },
  correction: {
    profile: {
      name: 'kanae',
      photoUrl: 'http://kanae',
      ref: '////////',
    },
    commments: [
      {
        startNum: 123,
        sentence: 'The top diplomats of Japan',
        detail: 'top is not good. you should aagaga gagaagaga gagaga',
      },
      {
        startNum: 13,
        sentence: 'The top diplomats of Japan',
        detail: 'top is not good. you should aagaga gagaagaga gagaga',
      },
      {
        startNum: 1,
        sentence: 'The top diplomats of Japan',
        detail: 'top is not good. you should aagaga gagaagaga gagaga',
      },
    ],
    summary:
      'summarysummarysummarysummarysummarysummarysummary summarysummarysummarysummarysummary',
    createdAt: '2020年2月17日 0:00:00 UTC+9',
    updatedAt: '2020年2月17日 0:00:00 UTC+9',
  },
  title: 'No english, no life',
  text:
    "The top diplomats of Japan, the United States and South Korea on Saturday agreed to support China's efforts to contain a deadly new coronavirus, as the outbreak poses increasing health risks and threatens to undermine the global economy.Meeting on the sidelines of a security conference in Munich, Germany, Japanese Foreign Minister Toshimitsu Motegi, U.S. Secretary of State Mike Pompeo and South Korean Foreign Minister Kang Kyung Wha also reaffirmed their cooperation on North Korea, according to Japan's Foreign Ministry.",
  status: 'noReview',
  createdAt: '2020年2月17日 0:00:00 UTC+9',
  updatedAt: '2020年2月17日 0:00:00 UTC+9',
};
