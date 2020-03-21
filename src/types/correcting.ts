export interface InitialWord {
  index: number;
  isComment: boolean;
  isStart?: boolean;
  isEnd?: boolean;
  word: string;
  startX: number;
  endX: number;
  line: number;
}

export interface ActiveWord {
  index: number;
  startX: number;
  endX: number;
  line: number;
}

export interface LongPressWord {
  y: number;
  line: number;
}
