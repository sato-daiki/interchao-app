import { ImageSourcePropType } from 'react-native';

export type Entry =
  | {
      key: 'introduction';
      params: IntroductionParams;
    }
  | {
      key: 'tip';
      params: TipParams;
    }
  | {
      key: 'word';
      params: WordParams;
    }
  | {
      key: 'end';
    };

export interface IntroductionParams {
  source: ImageSourcePropType;
  text: string;
}

export interface TipParams {
  expressions: Sentence[];
  examples: StyleSentence[];
}

export interface WordParams {
  title: string;
  words: Sentence[];
}

export type StyleType = 'bold' | 'p';

interface StyleText {
  id: number;
  text: string;
  styleType: StyleType;
}

interface StyleSentence {
  id: number;
  learnText: StyleText[];
  nativeText: string;
}

interface Sentence {
  id: number;
  learnText: string;
  nativeText: string;
}
