import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
  mainColor,
} from '../../styles/Common';
import { getDay } from '../../utils/diary';
import { Review, Language } from '../../types';
import { ProfileIconHorizontal, CopyText } from '../atoms';
import googleTranslate from '../../utils/googleTranslate';
import I18n from '../../utils/I18n';

interface Props {
  item: Review;
  nativeLanguage?: Language;
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  translation: {
    color: mainColor,
  },
  italic: {
    color: subTextColor,
    fontStyle: 'italic',
  },
});

const ReviewListItem = ({
  item,
  nativeLanguage,
  onPressUser,
}: Props): JSX.Element => {
  const { rating, createdAt, comment, reviewer } = item;
  const [displayReview, setDisplayReview] = useState(comment);
  const [isTranslated, setIsTranslated] = useState(false);

  const onPressTranslate = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isTranslated) {
        setDisplayReview(comment);
        setIsTranslated(false);
      } else {
        const mentionRemovedText = comment.replace(/@\w+\s/g, '');
        if (nativeLanguage) {
          const translatedText = await googleTranslate(
            mentionRemovedText,
            nativeLanguage
          );
          if (translatedText && translatedText.length > 0) {
            setDisplayReview(translatedText);
            setIsTranslated(true);
          }
        }
      }
    };
    f();
  }, [comment, isTranslated, nativeLanguage]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.postDayText}>{getDay(createdAt)}</Text>
        {nativeLanguage ? (
          <TouchableOpacity onPress={onPressTranslate}>
            <Text style={styles.translation}>
              {I18n.t('common.translation')}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
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
      {displayReview ? (
        <CopyText
          style={[styles.comment, isTranslated ? styles.italic : undefined]}
          text={displayReview}
        />
      ) : null}
      <ProfileIconHorizontal
        userName={reviewer.userName}
        photoUrl={reviewer.photoUrl}
        nativeLanguage={reviewer.nativeLanguage}
        nationalityCode={reviewer.nationalityCode}
        onPress={(): void => onPressUser(reviewer.uid)}
      />
    </View>
  );
};

export default ReviewListItem;
