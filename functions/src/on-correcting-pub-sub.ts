import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as moment from 'moment';
import * as timezone from 'moment-timezone';
import {
  getIsProduction,
  sendMessage,
  getDataCorrectionStatus,
} from './util/common';

timezone.tz.setDefault('Asia/Tokyo');

/*
 定期実行 google scheduleと連動している
*/
module.exports = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 */12 * * *')
  // .pubsub.schedule('* * * * *')
  .timeZone('Japan')
  .onRun(async context => {
    // 削除対象の添削中一覧を取得
    const before30minute = moment().subtract(30, 'm');
    const correctingsData = await admin
      .firestore()
      .collection('correctings')
      .where('createdAt', '<', before30minute)
      .get();

    correctingsData.forEach(async doc => {
      const correcting = doc.data();
      console.log('doc.id', doc.id);
      const data = getDataCorrectionStatus(correcting.correctedNum, 'yet');

      // 日記のステータスを元に戻す
      const diaryData = await admin
        .firestore()
        .doc(`diaries/${doc.id}`)
        .get();

      if (diaryData.exists) {
        console.log('diaryData.exists');
        await admin
          .firestore()
          .doc(`diaries/${doc.id}`)
          .update({
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
      }

      // 添削中コレクションを削除する
      await admin
        .firestore()
        .doc(`correctings/${doc.id}`)
        .delete();

      const userData = await admin
        .firestore()
        .doc(`users/${correcting.uid}`)
        .get();

      if (userData.exists) {
        console.log('userData.exists');
        await admin
          .firestore()
          .doc(`users/${correcting.uid}`)
          .update({
            correctingObjectID: null,
            correctingCorrectedNum: null,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
      }
    });

    let messageEnd = '【検証】Correctingのお掃除  ';
    if (getIsProduction()) {
      messageEnd = '【本番】Correctingのお掃除  ';
    }
    messageEnd += `無事終わりました`;
    console.log(messageEnd);
    await sendMessage(messageEnd);
  });
