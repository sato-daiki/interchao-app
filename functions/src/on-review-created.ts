import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

module.exports = functions
  .region('asia-northeast1')
  .firestore.document('reviews/{reviewId}')
  .onCreate(
    async (snap, context): Promise<any> => {
      // Get the note document
      const data = snap.data();
      if (!data) {
        return;
      }

      const userReviewRef = admin
        .firestore()
        .doc(`userReviews/${data.revieweeUid}`);
      await admin.firestore().runTransaction(async transaction => {
        const userReview = await transaction.get(userReviewRef);
        const ratingSum = userReview.get('ratingSum') + snap.get('rating');
        const reviewNum = userReview.get('reviewNum') + 1;
        const score = (ratingSum / reviewNum).toFixed(1);

        transaction.update(userReviewRef, {
          ratingSum,
          reviewNum,
          score,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      });
    }
  );
