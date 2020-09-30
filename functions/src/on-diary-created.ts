import * as functions from 'firebase-functions';
import {
  getReduceDiaryData,
  getIndex,
  sendMessage,
  getIsProduction,
} from './util/common';

const index = getIndex();
/**
 * onDiaryCreated -  diaryが作られた時、トリガーで実行される
 */
module.exports = functions
  .region('asia-northeast1')
  .firestore.document('diaries/{diaryId}')
  .onCreate(
    async (snap, context): Promise<void> => {
      // Get the note document
      const data = snap.data();
      if (!data) {
        return;
      }
      const objectID = snap.id;

      // Create Algolia index
      const reduceData = getReduceDiaryData(data, true);

      index.saveObject({
        objectID,
        ...reduceData,
      });

      if (getIsProduction() && reduceData.diaryStatus === 'publish') {
        let message = '';
        if (reduceData.firstDiary) {
          message += '★初★';
        }
        message += `【日記】 name:${reduceData.profile.userName} native:${reduceData.profile.nativeLanguage} learn:${reduceData.profile.learnLanguage}`;
        await sendMessage(message);
      }
    }
  );
