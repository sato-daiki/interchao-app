import * as functions from 'firebase-functions';
import { sendMessage, getIsProduction } from './util/common';

/**
 * Here we're using Gmail to send
 */
module.exports = functions
  .region('asia-northeast1')
  .firestore.document('inquiries/{inquiryId}')
  .onCreate(
    async (snap, context): Promise<any> => {
      // Get the note document
      const data = snap.data();
      if (!data) {
        return;
      }

      if (getIsProduction()) {
        const message = `【問合せ】`;
        await sendMessage(message);
      }
    }
  );
