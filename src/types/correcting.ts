// 更新はないのでupdatedAtはない
export interface Correcting {
  uid: string;
  correctedNum: number;
  createdAt: firebase.firestore.FieldValue;
}
