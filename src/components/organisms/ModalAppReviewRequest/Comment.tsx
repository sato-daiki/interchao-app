import React from 'react';
import { View, StyleSheet, TextInput, Dimensions, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Space, SubmitButton, WhiteButton } from '../../atoms';
import { KeyboardHideButton } from '../../molecules';
import {
  borderLightColor,
  fontSizeL,
  fontSizeM,
  offWhite,
  primaryColor,
} from '../../../styles/Common';
import I18n from '../../../utils/I18n';

const { height } = Dimensions.get('window');

interface Props {
  comment: string;
  isKeyboard: boolean;
  isLoading: boolean;
  setIsKeyboard: (isKeyboard: boolean) => void;
  onChangeTextComment: (comment: string) => void;
  onBlur: () => void;
  onPressCancel: () => void;
  onPressPublish: () => void;
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
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
  keyboardAwareScrollView: {
    flex: 1,
  },
  review: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: height - 400,
    backgroundColor: offWhite,
    textAlignVertical: 'top',
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
});

const Comment: React.FC<Props> = ({
  comment,
  isKeyboard,
  isLoading,
  setIsKeyboard,
  onChangeTextComment,
  onBlur,
  onPressCancel,
  onPressPublish,
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {I18n.t('modalAppReviewRequest.improveTitle')}
      </Text>
      <View style={styles.line} />
      {/* <KeyboardAwareScrollView style={styles.keyboardAwareScrollView}> */}
      <TextInput
        value={comment}
        onChangeText={onChangeTextComment}
        placeholder={I18n.t('review.placeholder')}
        multiline
        spellCheck
        autoCorrect
        underlineColorAndroid="transparent"
        style={styles.review}
        onBlur={onBlur}
      />
      <Space size={32} />
      {/* </KeyboardAwareScrollView> */}
      <SubmitButton
        isLoading={isLoading}
        title={I18n.t('common.publish')}
        onPress={onPressPublish}
      />
      <Space size={16} />
      <WhiteButton title={I18n.t('common.cancel')} onPress={onPressCancel} />
      <KeyboardHideButton
        isKeyboard={isKeyboard}
        setIsKeyboard={setIsKeyboard}
      />
    </View>
  );
};

export default React.memo(Comment);
