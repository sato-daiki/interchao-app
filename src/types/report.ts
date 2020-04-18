export interface Report {
  uid: string;
  targetUid: string;
  reason: string;
  createdAt: firebase.firestore.FieldValue;
}
