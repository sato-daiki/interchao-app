import I18n from './I18n';
import firebase from '../constants/firebase';
import { getDisplayProfile, getComments, getUsePoints } from './diary';
import { track, events } from './Analytics';
import {
  Diary,
  Profile,
  InfoCommentAndroid,
  InfoComment,
  User,
} from '../types';
import { primaryColor, mainColor, green } from '../styles/Common';
import { ButtonInfo } from '../screens/CorrectingScreen.android';

type RightButtonState = 'comment' | 'summary' | 'done' | 'nothing';

export const getStateButtonInfo = (state: RightButtonState): ButtonInfo => {
  if (state === 'comment') {
    return { title: I18n.t('correcting.titleComment'), color: mainColor };
  }

  if (state === 'summary') {
    return { title: I18n.t('correcting.titleSummary'), color: primaryColor };
  }

  if (state === 'done') {
    return { title: I18n.t('correcting.titleDone'), color: green };
  }
  return { title: '', color: '' };
};

interface UpdateDoneProps {
  isLoading: boolean;
  summary: string;
  teachDiary: Diary;
  currentProfile: Profile;
  user: User;
  infoComments: InfoCommentAndroid[] | InfoComment[];
  setIsLoading: (isLoading: boolean) => void;
  setIsModalDone: (isLoading: boolean) => void;
  editTeachDiary: (objectID: string, diary: Diary) => void;
  setUser: (user: User) => void;
}

export const updateDone = async ({
  isLoading,
  summary,
  teachDiary,
  currentProfile,
  user,
  infoComments,
  setIsLoading,
  setIsModalDone,
  editTeachDiary,
  setUser,
}: UpdateDoneProps): Promise<void> => {
  await firebase.firestore().runTransaction(async transaction => {
    if (isLoading) return;
    setIsLoading(true);

    const displayProfile = getDisplayProfile(currentProfile);
    const comments = getComments(infoComments);

    const getPoints = getUsePoints(
      teachDiary.text.length,
      teachDiary.profile.learnLanguage
    );
    const newPoints = user.points + getPoints;
    if (!teachDiary.objectID) return;

    //  correctionsの更新
    const correctionRef = firebase
      .firestore()
      .collection('corrections')
      .doc();
    transaction.set(correctionRef, {
      objectID: teachDiary.objectID,
      profile: displayProfile,
      comments,
      summary,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // 日記のステータスを未読に変更する
    const newCorrection = {
      id: correctionRef.id,
      profile: displayProfile,
    };
    const diaryRef = firebase.firestore().doc(`diaries/${teachDiary.objectID}`);
    transaction.update(diaryRef, {
      correctionStatus: 'unread',
      correction: newCorrection,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    //  添削をしたuserの更新 ポイントを増やす correctingObjectIDをnull
    const currentUserRef = firebase.firestore().doc(`users/${user.uid}`);
    transaction.update(currentUserRef, {
      points: newPoints,
      correctingObjectID: null,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // correctingsの削除
    const correctingRef = firebase
      .firestore()
      .doc(`correctings/${teachDiary.objectID}`);
    transaction.delete(correctingRef);

    track(events.CREATED_CORRECTION, {
      objectID: teachDiary.objectID,
      getPoints,
      commentNum: comments.length,
      summaryCharacters: summary.length,
    });

    // reduxに追加
    editTeachDiary(teachDiary.objectID, {
      ...teachDiary,
      correctionStatus: 'unread',
      correction: newCorrection,
    });
    setUser({
      ...user,
      points: newPoints,
      correctingObjectID: null,
    });
    setIsLoading(false);
    setIsModalDone(true);
  });
};
