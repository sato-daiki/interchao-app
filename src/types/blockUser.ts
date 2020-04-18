export interface BlockUser {
  blockeeId: string;
  blockerId: string;
  createdAt: firebase.firestore.FieldValue;
}
