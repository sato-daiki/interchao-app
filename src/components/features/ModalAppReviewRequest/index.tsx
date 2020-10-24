import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import * as Linking from 'expo-linking';
import * as StoreReview from 'expo-store-review';
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
  const [isPublishEnd, setIsPublishEnd] = useState(false);
  const [comment, setComment] = useState('');

  const close = useCallback(() => {
    onClose();
    setIsLoading(false);
    setRating(0);
    setIsCommentBox(false);
    setIsPublishEnd(false);
    setComment('');
  }, [onClose]);

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
    if (Platform.OS !== 'web' && rating >= 4) {
      if (Platform.OS === 'ios') {
        Linking.openURL(
          `https://apps.apple.com/app/apple-store/id1510150748?action=write-review`
        );
      } else if (Platform.OS === 'android') {
        StoreReview.requestReview();
      }
      updateUserAppReviewState('done');
      close();
    } else {
      // 低評価の時は用意したコメント欄からコメントをもらう
      setIsCommentBox(true);
    }
  }, [close, rating, updateUserAppReviewState]);

  const onFinishRating = useCallback((num: number): void => {
    setRating(num);
  }, []);

  const onChangeTextComment = useCallback((text: string): void => {
    setComment(text);
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
      close();
    };
    f();
  }, [close, isLoading, updateUserAppReviewState]);

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
        setIsPublishEnd(true);
      } catch (err) {
        alert({ err });
        setIsLoading(false);
      }
    };
    f();
  }, [
    comment,
    isLoading,
    profile.nativeLanguage,
    profile.uid,
    profile.userName,
    rating,
    updateUserAppReviewState,
  ]);

  const onPressCancel = useCallback(() => {
    close();
  }, [close]);

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
            isLoading={isLoading}
            isPublishEnd={isPublishEnd}
            onChangeTextComment={onChangeTextComment}
            onClose={onPressCancel}
            onPressPublish={onPressPublish}
          />
        )}
      </View>
    </Modal>
  );
};

export default ModalAppReviewRequest;
