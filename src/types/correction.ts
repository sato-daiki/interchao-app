import { DisplayProfile } from './diary';

export interface Comment {
  original: string;
  fix: string;
  detail: string;
}

export interface Correction {
  objectID: string;
  profile: DisplayProfile;
  comments: Comment[];
  summary: string;
  createdAt: firebase.firestore.FieldValue;
}
