import firebase from '../constants/firebase';

/**
 * getBlockers: ブロックしているuid一覧を取得する
 * @param uid : uid
 */
export const getBlockers = async (uid: string): Promise<string[]> => {
  const docs = await firebase
    .firestore()
    .collection('blockUsers')
    .where('blocker', '==', uid)
    .get();
  const uids: string[] = [];
  docs.forEach(doc => {
    uids.push(doc.data().blockee);
  });
  return uids;
};

/**
 * getBlockers: ブロックされているuid一覧を取得する
 * @param uid : uid
 */
export const getBlockees = async (uid: string): Promise<string[]> => {
  const docs = await firebase
    .firestore()
    .collection('blockUsers')
    .where('blockee', '==', uid)
    .get();
  const uids: string[] = [];
  docs.forEach(doc => {
    uids.push(doc.data().blocker);
  });
  return uids;
};

/**
 * checkBlockee: ブロックされているかのチェック
 * @param currenctUid アプリ使用ユーザ
 * @param targetUid 対象のユーザ
 */
export const checkBlockee = async (
  currenctUid: string,
  targetUid: string
): Promise<boolean> => {
  const docs = await firebase
    .firestore()
    .collection('blockUsers')
    .where('blockee', '==', currenctUid)
    .where('blocker', '==', targetUid)
    .get();
  if (docs.empty) {
    return false;
  }
  return true;
};

/**
 * checkBlockee: ブロックしているかのチェック
 * @param currenctUid アプリ使用ユーザ
 * @param targetUid 対象のユーザ
 */
export const checkBlocker = async (
  currenctUid: string,
  targetUid: string
): Promise<boolean> => {
  const docs = await firebase
    .firestore()
    .collection('blockUsers')
    .where('blockee', '==', targetUid)
    .where('blocker', '==', currenctUid)
    .get();
  if (docs.empty) {
    return false;
  }
  return true;
};
