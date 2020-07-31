import { DisplayProfile } from './diary';

export interface Diff {
  count: number;
  added?: boolean;
  removed?: boolean;
  value: string;
}

export interface TextInfo {
  rowNumber: number;
  original: string;
  fix: string | null;
  detail: string | null;
  diff: Diff | null;
}

export interface Comment {
  original: string;
  fix: string | null;
  detail: string | null;
  // 途中で追加した
  diff?: Diff | null;
  rowNumber?: number;
}

export interface Correction {
  objectID: string;
  profile: DisplayProfile;
  comments: Comment[];
  summary: string;
  createdAt: firebase.firestore.FieldValue;
}
