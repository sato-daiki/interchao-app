import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
} from '../../styles/Common';
import { getDay } from '../../utils/diary';
import { Review, Language } from '../../types';
import { ProfileIconHorizontal } from '../atoms';
import RichText from './RichText';

interface Props {
  item: Review;
  nativeLanguage?: Language;
  textLanguage: Language;
  onPressUser: (uid: string, userName: string) => void;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  postDayText: {
    color: subTextColor,
    fontSize: fontSizeS,
    paddingBottom: 4,
  },
  comment: {
    paddingTop: 4,
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    paddingBottom: 16,
  },
  rating: {
    alignItems: 'flex-start',
    paddingBottom: 4,
  },
  starStyle: {
    margin: 0,
  },
});

const ReviewListItem = ({
  item,
  nativeLanguage,
  textLanguage,
  onPressUser,
}: Props): JSX.Element => {
  const { rating, createdAt, comment, reviewer } = item;

  return (
    <View style={styles.container}>
      <Text style={styles.postDayText}>{getDay(createdAt)}</Text>
      <View style={styles.rating}>
        <AirbnbRating
          isDisabled
          defaultRating={rating}
          showRating={false}
          count={5}
          size={14}
          starStyle={styles.starStyle}
        />
      </View>
      <RichText
        style={styles.comment}
        text={comment}
        nativeLanguage={nativeLanguage}
        textLanguage={textLanguage}
      />
      <ProfileIconHorizontal
        userName={reviewer.userName}
        photoUrl={reviewer.photoUrl}
        nativeLanguage={reviewer.nativeLanguage}
        nationalityCode={reviewer.nationalityCode}
        onPress={(): void => onPressUser(reviewer.uid, reviewer.userName)}
      />
    </View>
  );
};

export default ReviewListItem;
