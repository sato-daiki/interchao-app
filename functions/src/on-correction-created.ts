import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Expo from 'expo-server-sdk';
import { getIndex, getIsProduction, sendMessage } from './util/common';
// import * as nodemailer from 'nodemailer';
// import * as dotenv from 'dotenv';
const index = getIndex();

// const transporter = nodemailer.createTransport({
//   host: 'smtp.mailtrap.io',
//   port: 2525,
//   auth: {
//     user: '251ca00b57b613', // generated by Mailtrap
//     pass: '04cacb2e55ec5e', // generated by Mailtrap
//   },
// });

// dotenv.config();
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS
//   }
// });

/**
 * onCorrectionCreated -  添削が完成した時のトリガー
 */
module.exports = functions
  .region('asia-northeast1')
  .firestore.document('corrections/{correctionId}')
  .onCreate(
    async (snap, context): Promise<any> => {
      // Get the note document
      const correction = snap.data();
      if (!correction) {
        return;
      }

      //  添削をされたユーザの取得
      const diaryDoc = await admin
        .firestore()
        .doc(`diaries/${correction.objectID}`)
        .get();
      const diary = diaryDoc.data();
      if (!diary) return;

      // 添削をもらったuserの未読一覧数を取得する（添削した日記は含めない）
      const res = await index.search('', {
        filters: `profile.uid: ${diary.profile.uid} AND (correctionStatus: unread OR correctionStatus2: unread OR correctionStatus3: unread) AND NOT objectID: ${diary.objectID}`,
      });
      const unreadCorrectionNum = res.nbHits + 1;

      const userRef = admin.firestore().doc(`users/${diary.profile.uid}`);
      const userDoc = await userRef.get();
      const user = userDoc.data();
      if (!user) return;

      // 通知の実装 https://github.com/expo/expo-server-sdk-node
      if (user.notificationCorrection && user.expoPushToken) {
        const expo = new Expo();
        let title = '';
        const body = `${diary.title}`;
        if (diary.profile.nativeLanguage === 'ja') {
          title = '添削完了';
        } else {
          title = 'Complete Corrections';
        }

        const chunks = expo.chunkPushNotifications([
          {
            to: user.expoPushToken,
            sound: 'default',
            title,
            body,
            priority: 'high',
            badge: unreadCorrectionNum,
            data: { navigate: 'myDiaryList' },
            channelId: 'default',
          },
        ]);
        // eslint-disable-next-line no-restricted-syntax
        for (const chunk of chunks) {
          // 送信
          // eslint-disable-next-line no-await-in-loop
          await expo.sendPushNotificationsAsync(chunk);
          console.log('送信');
        }
      }

      // // メールの送信
      // if (user.mailCorrection) {
      //   try {
      //     const userRecord = await admin.auth().getUser(diary.profile.uid);
      //     const { email } = userRecord.toJSON() as any;
      //     console.log("email", email)
      //     if (email) {
      //       const mailOptions = {
      //         from: 'Interchao <info@interchao.app>',
      //         to: email,
      //         subject: "添削完了", // email subject
      //         html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
      //             <br />
      //             <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
      //         `, // email content in HTML
      //       };

      //       transporter.sendMail(mailOptions, (erro, info) => {
      //         if (erro) {
      //           console.log('erro', erro.toString());
      //         } else {
      //           console.log('Sended');
      //         }
      //       });
      //     }
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }

      // 管理者にslack通知
      if (getIsProduction()) {
        const message = `添削  した人:${correction.profile.userName} native:${correction.profile.nativeLanguage} learn:${correction.profile.learnLanguage} された人 name:${diary.profile.userName}`;
        await sendMessage(message);
      }
    }
  );
