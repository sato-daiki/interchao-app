export interface LocalStatus {
  unreadCorrectionNum?: number;
  isLoading: boolean;
  isSignout: boolean;
  isModalAppReviewRequest?: boolean;
  uid: string | null;
}
