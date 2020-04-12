import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { borderLightColor, offWhite } from '../styles/Common';
import { Space, HeaderText, LoadingModal } from '../components/atoms';
import { UserListItem } from '../components/molecules';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { Diary, Profile, Review } from '../types';
import firebase from '../constants/firebase';
import I18n from '../utils/I18n';

interface Props {
  diary?: Diary;
  profile: Profile;
  editDiary: (objectID: string, diary: Diary) => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  review: {
    padding: 16,
    borderBottomColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 170,
    backgroundColor: offWhite,
  },
  keyboardAwareScrollView: {
    flex: 1,
  },
});

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

const ReviewScreen: ScreenType = ({
  navigation,
  diary,
  profile,
  editDiary,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const onPressFavorite = useCallback(() => {}, []);

  const onPressClose = useCallback((): void => {
    Keyboard.dismiss();
    if (rating > 0 || comment.length > 0) {
      Alert.alert(
        I18n.t('common.confirmation'),
        I18n.t('review.confirmation'),
        [
          {
            text: I18n.t('common.cancel'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: (): void => {
              navigation.goBack(null);
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      navigation.goBack(null);
    }
  }, [comment.length, navigation, rating]);

  const onPressSubmit = useCallback((): void => {
    const f = async (): Promise<void> => {
      if (!diary || !diary.objectID) return;
      if (isLoading) return;
      if (rating === 0) {
        Alert.alert('', I18n.t('errorMessage.invalidRaiting'));
        return;
      }

      setIsLoading(true);
      const refDiary = firebase.firestore().doc(`diaries/${diary.objectID}`);
      await refDiary.update({
        isReview: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      const { currentUser } = firebase.auth();
      if (!currentUser || !diary.correction) {
        return;
      }

      const newReview = {
        reviewer: {
          uid: profile.uid,
          userName: profile.userName,
          photoUrl: profile.photoUrl,
        },
        revieweeUid: diary.correction.profile.uid,
        rating,
        comment,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      } as Review;

      await firebase
        .firestore()
        .collection(`reviews`)
        .add(newReview);

      await firebase
        .firestore()
        .collection('diaries')
        .doc(diary.objectID)
        .update({
          isReview: true,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

      editDiary(diary.objectID, {
        ...diary,
        isReview: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      navigation.goBack();
      setIsLoading(false);
    };
    f();
  }, [
    comment,
    diary,
    editDiary,
    isLoading,
    navigation,
    profile.photoUrl,
    profile.uid,
    profile.userName,
    rating,
  ]);

  useEffect(() => {
    navigation.setParams({
      onPressSubmit,
      onPressClose,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating, comment]);

  if (!diary) {
    Alert.alert(I18n.t('common.error'), I18n.t('errorMessage.notFound'));
    return null;
  }

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <UserListItem
        userName={diary.profile.userName}
        photoUrl={diary.profile.photoUrl}
        nativeLanguage={diary.profile.nativeLanguage}
        onPressButton={onPressFavorite}
      />
      <Space size={24} />
      <AirbnbRating
        showRating={false}
        defaultRating={0}
        onFinishRating={(num: number): void => setRating(num)}
      />
      <Space size={24} />
      <KeyboardAwareScrollView style={styles.keyboardAwareScrollView}>
        <TextInput
          value={comment}
          onChangeText={(text: string): void => setComment(text)}
          maxLength={140}
          placeholder={I18n.t('review.placeholder')}
          multiline
          numberOfLines={3}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          style={styles.review}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

ReviewScreen.navigationOptions = ({ navigation }): NavigationStackOptions => {
  const onPressSubmit = navigation.getParam('onPressSubmit');
  const onPressClose = navigation.getParam('onPressClose');

  return {
    ...DefaultNavigationOptions,
    title: I18n.t('review.headerTitle'),
    headerLeft: (): JSX.Element => (
      <HeaderText title={I18n.t('common.close')} onPress={onPressClose} />
    ),
    headerRight: (): JSX.Element => (
      <HeaderText title={I18n.t('common.sending')} onPress={onPressSubmit} />
    ),
  };
};
export default ReviewScreen;
