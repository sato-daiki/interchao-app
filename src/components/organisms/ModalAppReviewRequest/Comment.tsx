import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Space, SubmitButton, WhiteButton } from '../../atoms';
import {
  borderLightColor,
  fontSizeL,
  fontSizeM,
  offWhite,
  primaryColor,
} from '../../../styles/Common';
import I18n from '../../../utils/I18n';

interface Props {
  comment: string;
  isLoading: boolean;
  isPublishEnd: boolean;
  onChangeTextComment: (comment: string) => void;
  onClose: () => void;
  onPressPublish: () => void;
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    paddingBottom: 16,
    textAlign: 'center',
    lineHeight: fontSizeL * 1.3,
  },
  thanks: {
    fontSize: fontSizeM,
    color: primaryColor,
    marginVertical: 6,
    lineHeight: fontSizeM * 1.3,
  },
  line: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
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
});

const Comment: React.FC<Props> = ({
  comment,
  isLoading,
  isPublishEnd,
  onChangeTextComment,
  onClose,
  onPressPublish,
}: Props) => {
  return (
    <>
      {!isPublishEnd ? (
        <>
          <Text style={styles.title}>{I18n.t('modalAppReviewRequest.improveTitle')}</Text>
          <View style={styles.line} />
          <KeyboardAwareScrollView extraScrollHeight={32}>
            <TextInput
              value={comment}
              multiline
              spellCheck
              autoCorrect
              blurOnSubmit
              keyboardType='default'
              returnKeyType='done'
              underlineColorAndroid='transparent'
              style={styles.review}
              onChangeText={onChangeTextComment}
            />
          </KeyboardAwareScrollView>
          <Space size={32} />
          <SubmitButton
            isLoading={isLoading}
            title={I18n.t('common.publish')}
            onPress={onPressPublish}
          />
          <Space size={16} />
          <WhiteButton title={I18n.t('common.cancel')} onPress={onClose} />
        </>
      ) : (
        <>
          <Text style={styles.thanks}>{I18n.t('modalAppReviewRequest.thanks')}</Text>
          <Space size={16} />
          <WhiteButton title={I18n.t('common.close')} onPress={onClose} />
        </>
      )}
    </>
  );
};

export default React.memo(Comment);
