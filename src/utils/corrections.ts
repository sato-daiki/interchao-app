import { Correction } from '../types/correction';
import firebase from '../constants/firebase';

export const getCorrection = async (id: string): Promise<Correction | null> => {
  try {
    const doc = await firebase
      .firestore()
      .doc(`corrections/${id}`)
      .get();
    const data = doc.data();
    if (data) {
      const {
        objectID,
        profile,
        comments,
        summary,
        createdAt,
        updatedAt,
      } = data;

      return {
        objectID,
        profile,
        comments,
        summary,
        createdAt,
        updatedAt,
      };
    }
  } catch (e) {
    return null;
  }
  return null;
};
