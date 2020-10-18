import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import * as Linking from 'expo-linking';

import firebase from '../../../constants/firebase';
import { alert } from '../../../utils/ErrorAlert';
import { Modal } from '../../template';
import { Profile, Inquiry, AppReviewState } from '../../../types';
import Comment from './Comment';
import Review from './Review';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

interface Props {
  visible: boolean;
  profile: Profile;
  onClose: () => void;
  updateAppReviewState: (appReviewState: AppReviewState) => void;
}

const ModalAppReviewRequest: React.FC<Props> = ({
  visible,
  profile,
  onClose,
  updateAppReviewState,
}: Props): JSX.Element | null => {
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [isCommentBox, setIsCommentBox] = useState(false);
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [comment, setComment] = useState('');

  const updateUserAppReviewState = useCallback(
    (appReviewState: AppReviewState) => {
      const f = async (): Promise<void> => {
        await firebase
          .firestore()
          .doc(`users/${profile.uid}`)
          .update({
            appReviewState,
            updated: firebase.firestore.FieldValue.serverTimestamp(),
          });
        updateAppReviewState(appReviewState);
      };
      f();
    },
    [profile.uid, updateAppReviewState]
  );

  const onPressOk = useCallback(() => {
    if (rating >= 4) {
      if (Platform.OS === 'ios') {
        Linking.openURL(
          `https://apps.apple.com/app/apple-store/id1510150748?action=write-review`
        );
        updateUserAppReviewState('done');
      } else if (Platform.OS === 'android') {
        Linking.openURL(
          `https://play.google.com/store/apps/details?id=app.interchao?showAllReviews=true`
        );
        updateUserAppReviewState('done');
      } else if (Platform.OS === 'web') {
        // webの場合もその場でコメントをもらう
        setIsCommentBox(true);
      }
    } else {
      // 低評価の時は用意したコメント欄からコメントをもらう
      setIsCommentBox(true);
    }
  }, [rating, updateUserAppReviewState]);

  const onFinishRating = useCallback((num: number): void => {
    setRating(num);
  }, []);

  const onChangeTextComment = useCallback((text: string): void => {
    setComment(text);
  }, []);

  const onBlur = useCallback(() => {
    setIsKeyboard(false);
  }, []);

  const onPressCloseNever = useCallback((): void => {
    const f = async (): Promise<void> => {
      if (isLoading) return;
      try {
        await updateUserAppReviewState('never');
        setIsLoading(false);
      } catch (err) {
        alert({ err });
        setIsLoading(false);
      }
      onClose();
    };
    f();
  }, [isLoading, onClose, updateUserAppReviewState]);

  const onPressPublish = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        await firebase
          .firestore()
          .collection(`inquiries`)
          .add({
            uid: profile.uid,
            userName: profile.userName,
            nativeLanguage: profile.nativeLanguage,
            email: '',
            message: `rating: ${rating}\ncomment: ${comment}`,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          } as Inquiry);

        await updateUserAppReviewState('done');

        setIsLoading(false);
      } catch (err) {
        alert({ err });
        setIsLoading(false);
      }
      onClose();
    };
    f();
  }, [
    comment,
    isLoading,
    onClose,
    profile.nativeLanguage,
    profile.uid,
    profile.userName,
    rating,
    updateUserAppReviewState,
  ]);

  const onPressCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {!isCommentBox ? (
          <Review
            rating={rating}
            onFinishRating={onFinishRating}
            onPressOk={onPressOk}
            onPressCancel={onPressCancel}
            onPressCloseNever={onPressCloseNever}
          />
        ) : (
          <Comment
            comment={comment}
            isKeyboard={isKeyboard}
            isLoading={isLoading}
            setIsKeyboard={setIsKeyboard}
            onChangeTextComment={onChangeTextComment}
            onBlur={onBlur}
            onPressCancel={onPressCancel}
            onPressPublish={onPressPublish}
          />
        )}
      </View>
    </Modal>
  );
};

export default ModalAppReviewRequest;
