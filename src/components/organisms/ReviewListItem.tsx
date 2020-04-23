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
import { Review } from '../../types';
import { ProfileIconHorizontal } from '../atoms';

interface Props {
  item: Review;
  onPressUser: (uid: string) => void;
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

const ReviewListItem = ({ item, onPressUser }: Props): JSX.Element => {
  const { rating, createdAt, comment, reviewer } = item;
  const { uid, userName, photoUrl, nativeLanguage } = reviewer;

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
      {comment ? <Text style={styles.comment}>{comment}</Text> : null}
      <ProfileIconHorizontal
        userName={userName}
        photoUrl={photoUrl}
        nativeLanguage={nativeLanguage}
        onPress={(): void => onPressUser(uid)}
      />
    </View>
  );
};

export default ReviewListItem;
