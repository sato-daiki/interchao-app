export type EntryKey = 'introduction' | 'tip';

// export interface Entry {
//   key: EntryKey;
//   params: TipParams | IntroductionParams;
// }

export type Entry =
  | {
      key: 'introduction';
      params: IntroductionParams;
    }
  | {
      key: 'tip';
      params: TipParams;
    };

export interface IntroductionParams {
  text: string;
}

export type StyleType = 'bold' | 'p';

interface StyleText {
  text: string;
  styleType: StyleType;
}

interface StyleSentence {
  learnText: StyleText[];
  nativeText: string;
}

interface Sentence {
  learnText: string;
  nativeText: string;
}

export interface TipParams {
  words: Sentence[];
  expressions: Sentence[];
  examples: StyleSentence[];
}
