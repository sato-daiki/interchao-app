import * as functions from 'firebase-functions';
import { sendMessage, getIsProduction } from './util/common';

module.exports = functions
  .region('asia-northeast1')
  .firestore.document('reports/{reportId}')
  .onCreate(
    async (snap, context): Promise<any> => {
      // Get the note document
      const data = snap.data();
      if (!data) {
        return;
      }
      if (getIsProduction()) {
        const message = `【報告】id:${data.id} reason:${data.reason} targetUid:${data.targetUid} uid:${data.uid}`;
        await sendMessage(message);
      }
    }
  );
