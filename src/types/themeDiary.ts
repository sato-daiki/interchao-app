export type Catergory = 'first';
export type Subcatergory =
  | 'selfIntroduction'
  | 'hobby'
  | 'job'
  | 'english'
  | 'dream'
  | 'trip'
  | 'reborn';

export interface ThemeDiary {
  category: Catergory;
  subcatergory: Subcatergory;
  objectIDs: string[];
  lastPublishedAt: firebase.firestore.FieldValue;
  createdAt: firebase.firestore.FieldValue;
}
