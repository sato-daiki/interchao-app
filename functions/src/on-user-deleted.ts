import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

module.exports = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async user => {
    const batch = admin.firestore().batch();

    const targetUser = admin.firestore().doc(`users/${user.uid}`);
    batch.delete(targetUser);

    const targetProfile = admin.firestore().doc(`profiles/${user.uid}`);
    batch.delete(targetProfile);

    const targetUserReview = admin.firestore().doc(`userReviews/${user.uid}`);
    batch.delete(targetUserReview);

    const snapshot = await admin
      .firestore()
      .collection('diaries')
      .where('profile.uid', '==', user.uid)
      .get();

    if (snapshot.size !== 0) {
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
    }
    await batch.commit();
  });
