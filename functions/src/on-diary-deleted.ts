import * as functions from 'firebase-functions';
import { getIndex } from './util/common';

const index = getIndex();

/**
 * onDiaryCreated -  diaryが作られた時、トリガーで実行される
 */
module.exports = functions
  .region('asia-northeast1')
  .firestore.document('diaries/{diaryId}')
  .onDelete(
    async (snap, context): Promise<any> => {
      // Delete Algolia index
      return index.deleteObject(snap.id);
    }
  );
