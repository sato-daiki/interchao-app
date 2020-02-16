import { firestore } from 'firebase';

export type PostStatus = 'draft' | 'publish';
export type CorrectionStatus = 'yet' | 'doing' | 'done';

interface DisplayProfile {
  name: string;
  photoUrl: string;
  ref: string;
}

interface Commment {
  startNum: number;
  sentence: string;
  detail: string;
}

interface Correction {
  profile: DisplayProfile;
  commments: Commment[];
  summary: string;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}

export interface Post {
  profile: DisplayProfile;
  correction: Correction;
  proCorrection: Correction;
  title: string;
  text: string;
  postStatus: PostStatus;
  correctionStatus: CorrectionStatus;
  isReview: boolean;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}
