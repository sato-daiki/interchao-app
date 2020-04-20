interface Reviewer {
  uid: string;
  userName: string;
  photoUrl: string | null;
}

export interface Review {
  reviewer: Reviewer;
  revieweeUid: string;
  objectID: string;
  rating: number;
  comment: string;
  createdAt: firebase.firestore.FieldValue;
}
