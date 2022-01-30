import firebase from '@/constants/firebase';
import { User } from '@/types';

const getTimeInfo = (timeInfo: any) => {
  console.log('getTimeInfo');
  if (timeInfo.reminderType === 'fix') {
    return {
      ...timeInfo,
      fixTimeInfo: {
        ...timeInfo.fixTimeInfo,
        timeStart: timeInfo.fixTimeInfo.timeStart.toDate(),
        timeEnd: timeInfo.fixTimeInfo.timeEnd.toDate(),
      },
    };
  }
  return {
    ...timeInfo,
    customTimeInfos: timeInfo.customTimeInfos.map((item) => {
      return {
        ...item,
        timeStart: item.timeStart.toDate(),
        timeEnd: item.timeEnd.toDate(),
      };
    }),
  };
};

// ユーザ情報取得
export const getUser = async (uid: string): Promise<User | null> => {
  try {
    const doc = await firebase.firestore().collection('users').doc(uid).get();

    const data = doc.data();
    console.log('data', data);
    if (data) {
      return {
        ...data,
        uid,
        reminder: data.reminder
          ? {
              ...data.reminder,
              timeInfo: getTimeInfo(data.reminder.timeInfo),
            }
          : undefined,
      } as User;
    }
    console.log('test3');
  } catch (e) {
    console.warn(e);
    return null;
  }
  console.log('nothing');
  return null;
};
