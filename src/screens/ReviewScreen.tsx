import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Keyboard } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { borderLightColor, offWhite, fontSizeM } from '../styles/Common';
import { Space, LoadingModal, HeaderText } from '../components/atoms';
import { KeyboardHideButton, UserListItem } from '../components/molecules';
import { Diary, LocalStatus, Profile, Review, Reviewer, User } from '../types';
import firebase from '../constants/firebase';
import I18n from '../utils/I18n';
import { logAnalytics, events } from '../utils/Analytics';
import { ModalConfirm } from '../components/organisms';
import {
  ModalReviewStackParamList,
  ModalReviewStackNavigationProp,
} from '../navigations/ModalNavigator';

export interface Props {
  diary?: Diary;
  profile: Profile;
  user: User;
  localStatus: LocalStatus;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
  setLocalStatus: (localStatus: LocalStatus) => void;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalReviewStackParamList, 'Review'>,
  ModalReviewStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
  route: RouteProp<ModalReviewStackParamList, 'Review'>;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  review: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 170,
    backgroundColor: offWhite,
    textAlignVertical: 'top',
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
  keyboardAwareScrollView: {
    flex: 1,
  },
});

const ReviewScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  diary,
  user,
  localStatus,
  profile,
  editDiary,
  setLocalStatus,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isModalConfirmation, setIsModalConfirmation] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [isKeyboard, setIsKeyboard] = useState(false);

  const onPressClose = useCallback((): void => {
    Keyboard.dismiss();
    if (rating > 0 || comment.length > 0) {
      setIsModalConfirmation(true);
    } else {
      navigation.goBack();
    }
  }, [comment.length, navigation, rating]);

  const onPressSubmit = useCallback((): void => {
    if (!diary || !diary.objectID) return;
    const { currentUser } = firebase.auth();
    if (!currentUser || !diary.correction) {
      return;
    }
    if (isLoading) return;
    if (rating === 0) {
      setIsModalError(true);
      return;
    }
    if (!route.params) return;

    setIsLoading(true);
    const batch = firebase.firestore().batch();
    const refDiary = firebase.firestore().doc(`diaries/${diary.objectID}`);

    const { correctedNum } = route.params;

    let data;
    let revieweeUid = '';
    if (correctedNum === 1) {
      data = {
        isReview: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      } as Pick<Diary, 'isReview' | 'updatedAt'>;
      revieweeUid = diary.correction.profile.uid;
    }
    if (correctedNum === 2 && diary.correction2) {
      data = {
        isReview2: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      } as Pick<Diary, 'isReview2' | 'updatedAt'>;
      revieweeUid = diary.correction2.profile.uid;
    }
    if (correctedNum === 3 && diary.correction3) {
      data = {
        isReview3: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      } as Pick<Diary, 'isReview3' | 'updatedAt'>;
      revieweeUid = diary.correction3.profile.uid;
    }

    if (revieweeUid === '') return;

    batch.update(refDiary, data);

    const reviewer = {
      uid: profile.uid,
      userName: profile.userName,
      photoUrl: profile.photoUrl,
      nativeLanguage: profile.nativeLanguage,
      nationalityCode: profile.nationalityCode || null,
    } as Reviewer;

    const newReview = {
      reviewer,
      objectID: diary.objectID,
      revieweeUid,
      rating,
      comment,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    } as Review;

    const refReview = firebase.firestore().collection(`reviews`).doc();
    batch.set(refReview, newReview);

    batch.commit();
    logAnalytics(events.CREATED_REVIEW);
    editDiary(diary.objectID, {
      ...diary,
      ...data,
    });

    navigation.goBack();
    if (rating > 3 && (!user.appReviewState || user.appReviewState === 'yet')) {
      setLocalStatus({ ...localStatus, isModalAppReviewRequest: true });
    }
    setIsLoading(false);
  }, [
    comment,
    diary,
    editDiary,
    isLoading,
    localStatus,
    navigation,
    profile.nationalityCode,
    profile.nativeLanguage,
    profile.photoUrl,
    profile.uid,
    profile.userName,
    rating,
    route.params,
    setLocalStatus,
    user.appReviewState,
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />
      ),
      headerRight: () => (
        <HeaderText text={I18n.t('common.sending')} onPress={onPressSubmit} />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating, comment]);

  const onBlur = useCallback(() => {
    setIsKeyboard(false);
  }, []);

  const onChangeText = useCallback((text: string): void => {
    setComment(text);
  }, []);

  const onPressMainNotFound = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const onPressMainError = useCallback((): void => {
    setIsModalError(false);
  }, []);

  const onPressCloseConfirmation = useCallback((): void => {
    setIsModalConfirmation(false);
  }, []);

  const onFinishRating = useCallback((num: number): void => {
    setRating(num);
  }, []);

  const onPressMainConfirmation = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  if (!diary) {
    return (
      <View style={styles.container}>
        <ModalConfirm
          visible
          title={I18n.t('common.error')}
          message={I18n.t('errorMessage.notFound')}
          mainButtonText={I18n.t('common.close')}
          onPressMain={onPressMainNotFound}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <ModalConfirm
        visible={isModalError}
        title={I18n.t('common.error')}
        message={I18n.t('errorMessage.invalidRaiting')}
        mainButtonText={I18n.t('common.close')}
        onPressMain={onPressMainError}
      />
      <ModalConfirm
        visible={isModalConfirmation}
        title={I18n.t('common.confirmation')}
        message={I18n.t('review.confirmation')}
        mainButtonText='OK'
        onPressMain={onPressMainConfirmation}
        onPressClose={onPressCloseConfirmation}
      />
      <UserListItem
        userName={diary.profile.userName}
        photoUrl={diary.profile.photoUrl}
        nativeLanguage={diary.profile.nativeLanguage}
        nationalityCode={diary.profile.nationalityCode}
      />
      <Space size={24} />
      <AirbnbRating
        showRating={false}
        defaultRating={0}
        onFinishRating={onFinishRating}
      />
      <Space size={24} />
      <KeyboardAwareScrollView style={styles.keyboardAwareScrollView}>
        <TextInput
          value={comment}
          onChangeText={onChangeText}
          maxLength={140}
          placeholder={I18n.t('review.placeholder')}
          multiline
          numberOfLines={3}
          spellCheck
          autoCorrect
          underlineColorAndroid='transparent'
          style={styles.review}
          onBlur={onBlur}
        />
      </KeyboardAwareScrollView>
      <KeyboardHideButton
        isKeyboard={isKeyboard}
        setIsKeyboard={setIsKeyboard}
      />
    </View>
  );
};

export default ReviewScreen;
