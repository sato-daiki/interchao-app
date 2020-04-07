import Algolia from './Algolia';

// ユーザ情報取得
export const getUnreadCorrectionNum = async (
  uid: string
): Promise<number | null> => {
  try {
    // 未読数を取得する
    const index = await Algolia.getDiaryIndex();
    const res = await index.search('', {
      filters: `profile.uid: ${uid} AND correctionStatus: unread`,
    });
    return res.nbHits;
  } catch (e) {
    return null;
  }
};
