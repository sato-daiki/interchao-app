export interface BlockUser {
  blockerUid: string;
  blockeeUid: string;
  createdAt: firebase.firestore.FieldValue;
}
