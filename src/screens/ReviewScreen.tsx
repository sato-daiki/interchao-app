import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
  Platform,
} from 'react-native';
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
import { Diary, Profile, Review, Reviewer } from '../types';
import firebase from '../constants/firebase';
import I18n from '../utils/I18n';
import { track, events } from '../utils/Analytics';

export interface Props {
  diary?: Diary;
  profile: Profile;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
}

type ScreenType = React.ComponentType<
  Props & DispatchProps & NavigationStackScreenProps
> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

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
  headerLeft: {
    paddingLeft: Platform.OS === 'android' ? 16 : 0,
  },
});

const ReviewScreen: ScreenType = ({
  navigation,
  diary,
  profile,
  editDiary,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const onPressFavorite = useCallback(() => undefined, []);

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
    if (!diary || !diary.objectID) return;
    const { currentUser } = firebase.auth();
    if (!currentUser || !diary.correction) {
      return;
    }
    if (isLoading) return;
    if (rating === 0) {
      Alert.alert('', I18n.t('errorMessage.invalidRaiting'));
      return;
    }
    if (!navigation.state.params) return;

    setIsLoading(true);
    const batch = firebase.firestore().batch();
    const refDiary = firebase.firestore().doc(`diaries/${diary.objectID}`);

    const { correctedNum } = navigation.state.params;

    let data;
    let revieweeUid = '';
    if (correctedNum === 1) {
      data = {
        isReview: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      } as any;
      revieweeUid = diary.correction.profile.uid;
    }
    if (correctedNum === 2 && diary.correction2) {
      data = {
        isReview2: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      } as any;
      revieweeUid = diary.correction2.profile.uid;
    }
    if (correctedNum === 3 && diary.correction3) {
      data = {
        isReview3: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      } as any;
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

    const refReview = firebase
      .firestore()
      .collection(`reviews`)
      .doc();
    batch.set(refReview, newReview);

    batch.commit();
    track(events.CREATED_REVIEW, {
      objectID: diary.objectID,
      characters: comment.length,
      rating,
    });
    editDiary(diary.objectID, {
      ...diary,
      ...data,
    });

    navigation.goBack(null);
    setIsLoading(false);
  }, [
    comment,
    diary,
    editDiary,
    isLoading,
    navigation,
    profile.nationalityCode,
    profile.nativeLanguage,
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
        nationalityCode={diary.profile.nationalityCode}
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
          spellCheck
          autoCorrect
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
      <HeaderText
        containerStyle={styles.headerLeft}
        title={I18n.t('common.close')}
        onPress={onPressClose}
      />
    ),
    headerRight: (): JSX.Element => (
      <HeaderText title={I18n.t('common.sending')} onPress={onPressSubmit} />
    ),
  };
};
export default ReviewScreen;
