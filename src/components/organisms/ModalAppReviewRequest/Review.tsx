import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import { Space, SubmitButton, WhiteButton } from '../../atoms';
import {
  borderLightColor,
  fontSizeL,
  fontSizeM,
  primaryColor,
} from '../../../styles/Common';
import I18n from '../../../utils/I18n';

interface Props {
  rating: number;
  onFinishRating: (rating: number) => void;
  onPressOk: () => void;
  onPressCancel: () => void;
  onPressCloseNever: () => void;
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    paddingBottom: 16,
    textAlign: 'center',
    lineHeight: fontSizeL * 1.3,
  },
  line: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
  },
  text: {
    textAlign: 'center',
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    color: primaryColor,
  },
  buttonTopContainer: {
    marginTop: 32,
    height: 62,
  },
  buttonTop: {},
});

const Review: React.FC<Props> = ({
  rating,
  onFinishRating,
  onPressOk,
  onPressCancel,
  onPressCloseNever,
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t('modalAppReviewRequest.title')}</Text>
      <View style={styles.line} />
      <Text style={styles.text}>{I18n.t('modalAppReviewRequest.text')}</Text>
      <Space size={32} />
      <AirbnbRating
        showRating={false}
        defaultRating={0}
        onFinishRating={onFinishRating}
      />
      <Space size={16} />
      <View style={styles.buttonTopContainer}>
        {rating === 0 ? null : (
          <SubmitButton
            title={I18n.t(
              rating >= 4
                ? 'modalAppReviewRequest.review'
                : 'modalAppReviewRequest.improve'
            )}
            onPress={onPressOk}
            containerStyle={styles.buttonTop}
          />
        )}
      </View>
      <WhiteButton
        title={I18n.t('modalAppReviewRequest.notYet')}
        onPress={onPressCancel}
      />
      <Space size={16} />
      <WhiteButton
        title={I18n.t('modalAppReviewRequest.never')}
        onPress={onPressCloseNever}
      />
    </View>
  );
};

export default React.memo(Review);
