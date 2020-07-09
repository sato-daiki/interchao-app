import { DisplayProfile } from './diary';

export interface Comment {
  original: string;
  fix: string;
  detail: string;
  start?: number;
  end?: number;
}

export interface Correction {
  objectID: string;
  profile: DisplayProfile;
  comments: Comment[];
  summary: string;
  createdAt: firebase.firestore.FieldValue;
}

// 添削結果を探す
export interface Chunk {
  highlight: boolean;
  start: number;
  end: number;
  correctionNum: number | null; // 1 or 2 or 3
  order: number | null; // 何番目か？
}
