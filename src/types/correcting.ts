export interface InitialWord {
  index: number;
  word: string;
  startX: number;
  endX: number;
  width: number;
  line: number;
}

export interface ActiveWord {
  index: number;
  startX: number;
  endX: number;
  width: number;
  line: number;
}

export interface LongPressWord {
  y: number;
  line: number;
}

export interface CommentInfo {
  id: string;
  startWord: ActiveWord;
  endWord: ActiveWord;
  original: string;
  fix: string;
  detail: string;
}
