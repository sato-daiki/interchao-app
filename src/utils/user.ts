import firebase from '@/constants/firebase';
import { TimeInfo, User } from '@/types';

const getTimeInfo = (timeInfo: any) => {
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
    customTimeInfos: timeInfo.customTimeInfos.map(item => {
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
    const doc = await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get();

    const data = doc.data();
    const timeInfo = getTimeInfo(data?.reminder?.timeInfo);
    if (data) {
      return {
        ...data,
        uid,
        reminder: data.reminder
          ? {
              ...data.reminder,
              timeInfo,
            }
          : undefined,
      } as User;
    }
  } catch (e) {
    return null;
  }
  return null;
};
