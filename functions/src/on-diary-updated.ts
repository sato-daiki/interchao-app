import * as functions from 'firebase-functions';
import {
  getReduceDiaryData,
  getIndex,
  getIsProduction,
  sendMessage,
} from './util/common';
import { Diary } from './types/diary';

const index = getIndex();

/**
 * onDiaryCreated -  diaryが作られた時、トリガーで実行される
 */
module.exports = functions
  .region('asia-northeast1')
  .firestore.document('diaries/{diaryId}')
  .onUpdate(
    async (change, context): Promise<any> => {
      try {
        const afterData = change.after.data() as Diary;

        // algoliaを更新する
        const reduceData = getReduceDiaryData(afterData, false);

        const object = {
          objectID: change.after.id,
          ...reduceData,
        };
        index.partialUpdateObject(object);

        const beforeData = change.before.data() as Diary;

        // 下書きから本番に変更した時
        if (
          getIsProduction() &&
          reduceData.diaryStatus === 'publish' &&
          beforeData.diaryStatus === 'draft'
        ) {
          let message = '';
          if (reduceData.firstDiary) {
            message += '★初★';
          }
          message += `【日記】 name:${reduceData.profile.userName} nativeLanguage:${reduceData.profile.nativeLanguage}`;
          await sendMessage(message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  );
