import * as functions from 'firebase-functions';
import * as timezone from 'moment-timezone';
import { getIsProduction, sendMessage, getIndex } from './util/common';
import { Diary } from './types/diary';

const index = getIndex();
timezone.tz.setDefault('Asia/Tokyo');

const makeMessage = (hits: Diary[]): string => {
  let enNum = 0;
  let jaNum = 0;
  let message = '';
  hits.forEach((value: Diary): void => {
    if (value.profile.nativeLanguage === 'en') {
      message += `【英語圏の人】username: ${value.profile.userName}, objectId: ${value.objectID}\n`;
      enNum += 1;
    } else {
      message += `【日本人】username: ${value.profile.userName}, objectId: ${value.objectID}\n`;
      jaNum += 1;
    }
  });
  message += `トータル 英語圏の人:${enNum}\n`;
  message += `トータル 日本人:${jaNum}\n\n`;
  return message;
};

/*
 定期実行 google scheduleと連動している
*/
module.exports = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 */12 * * *')
  .timeZone('Japan')
  .onRun(async context => {
    // 72時間添削されていない
    const d = new Date();
    const res72 = await index.search('', {
      filters: `(correctionStatus: yet OR correctionStatus: correcting) AND hidden: false AND createdAt._seconds < ${Math.floor(
        d.setDate(d.getDate() - 1) / 1000
      )}`,
    });

    let message = '【72時間以上】\n';
    if (res72.hits.length === 0) {
      message += '未添削の日記はありません\n\n';
    } else {
      message += makeMessage(res72.hits as Diary[]);
    }

    // 初日記で24時間添削されていないやつをピックアップする
    const res24 = await index.search('', {
      filters: `(correctionStatus: yet OR correctionStatus: correcting) AND firstDiary: true AND hidden: false AND createdAt._seconds < ${Math.floor(
        d.setDate(d.getDate() - 1) / 1000
      )}`,
    });

    message += '【初日記】\n';
    if (res24.hits.length === 0) {
      message += '未添削の日記はありません\n';
    } else {
      message += makeMessage(res72.hits as Diary[]);
    }

    // slackにメッセージを送る
    if (!getIsProduction()) {
      await sendMessage(message);
    }
  });
