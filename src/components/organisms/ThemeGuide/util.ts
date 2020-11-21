import { Language, ThemeCategory, ThemeSubcategory } from '@/types';
import { ImageSourcePropType, TextStyle } from 'react-native';
import I18n from '@/utils/I18n';
import {
  enHobbyExpressions,
  enSelfIntroductionExamples,
  enHobbyExamples,
  enSelfIntroductionExpressions,
  enJobExamples,
  enStudyExamples,
  enDreamExamples,
  enTripExamples,
  enRebornExamples,
  enJobExpressions,
  enStudyExpressions,
  enDreamExpressions,
  enTripExpressions,
  enRebornExpressions,
} from '@/utils/locales/themeGuide/en';

import {
  hobby,
  selfIntroduction,
  job,
  study,
  dream,
  trip,
  reborn,
} from './config';
import { Entry, Sentence, StyleSentence, StyleType } from './interface';

export interface GetParams {
  expressions: Sentence[];
  examples: StyleSentence[];
  nativeLanguage: Language;
  learnLanguage: Language;
}

interface GetEntriesParams {
  themeCategory: ThemeCategory;
  themeSubcategory: ThemeSubcategory;
  nativeLanguage: Language;
  learnLanguage: Language;
}

interface GetExamples {
  themeCategory: ThemeCategory;
  themeSubcategory: ThemeSubcategory;
  learnLanguage: Language;
  nativeLanguage: Language;
}

interface GetWordsParams {
  themeCategory: ThemeCategory;
  themeSubcategory: ThemeSubcategory;
  nativeLanguage: Language;
  learnLanguage: Language;
  num: number;
}

interface GetSentencesParams {
  expressions: string[];
  nativeOption: object;
  i18nTextHeader: string;
}

interface GetStyleSentencesParams {
  examples: any;
  nativeOption: object;
  i18nTextHeader: string;
}

const getSentences = ({
  expressions,
  nativeOption,
  i18nTextHeader,
}: GetSentencesParams): Sentence[] => {
  return expressions.map((item, index) => {
    const i18nText = `${i18nTextHeader}${index + 1}`;
    return {
      id: index + 1,
      learnText: item,
      nativeText: I18n.t(i18nText, nativeOption),
    };
  });
};

export const getExpressions = ({
  themeCategory,
  themeSubcategory,
  learnLanguage,
  nativeLanguage,
}: GetExamples): Sentence[] | null => {
  const params = {
    nativeOption: {
      locale: nativeLanguage,
    },
    i18nTextHeader: `${themeCategory}.${themeSubcategory}.${learnLanguage}.expression`,
  };
  switch (learnLanguage) {
    case 'en': {
      switch (themeSubcategory) {
        case 'selfIntroduction':
          return getSentences({
            expressions: enSelfIntroductionExpressions,
            ...params,
          });
        case 'hobby':
          return getSentences({
            expressions: enHobbyExpressions,
            ...params,
          });
        case 'job':
          return getSentences({
            expressions: enJobExpressions,
            ...params,
          });
        case 'study':
          return getSentences({
            expressions: enStudyExpressions,
            ...params,
          });
        case 'dream':
          return getSentences({
            expressions: enDreamExpressions,
            ...params,
          });
        case 'trip':
          return getSentences({
            expressions: enTripExpressions,
            ...params,
          });
        case 'reborn':
          return getSentences({
            expressions: enRebornExpressions,
            ...params,
          });
        default:
          return null;
      }
      return null;
    }
    case 'ja': {
      return null;
    }
    default:
      return null;
  }
};

const getStyleSentences = ({
  examples,
  nativeOption,
  i18nTextHeader,
}: GetStyleSentencesParams): StyleSentence[] => {
  return examples.map((item, index) => {
    const i18nText = `${i18nTextHeader}${index + 1}`;
    return {
      id: index + 1,
      learnText: item,
      nativeText: I18n.t(i18nText, nativeOption),
    };
  });
};

export const getExamples = ({
  themeCategory,
  themeSubcategory,
  learnLanguage,
  nativeLanguage,
}: GetExamples): StyleSentence[] | null => {
  const params = {
    nativeOption: {
      locale: nativeLanguage,
    },
    i18nTextHeader: `${themeCategory}.${themeSubcategory}.${learnLanguage}.example`,
  };

  switch (learnLanguage) {
    case 'en': {
      switch (themeSubcategory) {
        case 'selfIntroduction':
          return getStyleSentences({
            examples: enSelfIntroductionExamples,
            ...params,
          });
        case 'hobby':
          return getStyleSentences({
            examples: enHobbyExamples,
            ...params,
          });
        case 'job':
          return getStyleSentences({
            examples: enJobExamples,
            ...params,
          });
        case 'study':
          return getStyleSentences({
            examples: enStudyExamples,
            ...params,
          });
        case 'dream':
          return getStyleSentences({
            examples: enDreamExamples,
            ...params,
          });
        case 'trip':
          return getStyleSentences({
            examples: enTripExamples,
            ...params,
          });
        case 'reborn':
          return getStyleSentences({
            examples: enRebornExamples,
            ...params,
          });

        default:
          return null;
      }
    }
    case 'ja': {
      return null;
    }
    default:
      return null;
  }
};

export const getWords = ({
  themeCategory,
  themeSubcategory,
  nativeLanguage,
  learnLanguage,
  num,
}: GetWordsParams): Sentence[] => {
  const nativeOption = {
    locale: nativeLanguage,
  };
  const learnOption = {
    locale: learnLanguage,
  };

  const array = [...Array(num)].map((_, i) => i + 1);

  const sentences = array.map(item => {
    const i18nText = `${themeCategory}.${themeSubcategory}.word${item}`;
    return {
      id: item,
      nativeText: I18n.t(i18nText, nativeOption),
      learnText: I18n.t(i18nText, learnOption),
    };
  });

  return sentences;
};

export const getEntries = ({
  themeCategory,
  themeSubcategory,
  nativeLanguage,
  learnLanguage,
}: GetEntriesParams): Entry[] | null => {
  let entries: Entry[] | null = null;

  const expressions = getExpressions({
    themeCategory,
    themeSubcategory,
    learnLanguage,
    nativeLanguage,
  });

  const examples = getExamples({
    themeCategory,
    themeSubcategory,
    learnLanguage,
    nativeLanguage,
  });

  if (!expressions || !examples) return null;

  const params = {
    expressions,
    examples,
    nativeLanguage,
    learnLanguage,
  };

  switch (themeSubcategory) {
    case 'selfIntroduction':
      entries = selfIntroduction(params);
      break;
    case 'hobby':
      entries = hobby(params);
      break;
    case 'job':
      entries = job(params);
      break;
    case 'study':
      entries = study(params);
      break;
    case 'dream':
      entries = dream(params);
      break;
    case 'trip':
      entries = trip(params);
      break;
    case 'reborn':
      entries = reborn(params);
      break;
    default:
      return null;
  }

  return entries.concat({ key: 'end', params: null });
};

export const getStyle = (styleType: StyleType): TextStyle | undefined => {
  switch (styleType) {
    case 'bold':
      return {
        fontWeight: 'bold',
      };
    case 'p':
      return undefined;
    default:
      return undefined;
  }
};
