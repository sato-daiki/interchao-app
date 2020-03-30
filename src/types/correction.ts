export interface Comment {
  original: string;
  fix: string;
  detail: string;
}

export interface Correction {
  profile: DisplayProfile;
  comments: Comment[];
  summary: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
