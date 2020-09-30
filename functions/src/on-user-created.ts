import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getIsProduction, sendMessage } from './util/common';

module.exports = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async user => {
    await admin.auth().setCustomUserClaims(user.uid, {
      suspended: false,
    });

    if (getIsProduction()) {
      const message = `【新規インストール】 uid${user.uid}`;
      await sendMessage(message);
    }
  });
