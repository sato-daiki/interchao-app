import React from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
} from '../../styles/Common';
import { Modal } from '../template';
import {
  SubmitButton,
  WhiteButton,
  Space,
  UserPointsBig,
  ShareButton,
} from '../atoms';
import I18n from '../../utils/I18n';
import { Language } from '../../types';
import { Note } from '../../images';

interface Props {
  visible: boolean;
  isPublish: boolean;
  isLoading: boolean;
  usePoints: number;
  points: number;
  publishMessage: string | null;
  nativeLanguage: Language;
  onPressSubmit: () => void;
  onPressCloseCancel: () => void;
  onPressCloseSns: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    textAlign: 'center',
  },
  line: {
    paddingHorizontal: 16,
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingBottom: 24,
    lineHeight: fontSizeM * 1.3,
  },
  button: {
    paddingHorizontal: 16,
  },
  points: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  img: {
    alignSelf: 'center',
    width: 160,
    height: 160,
  },
});

const ModalAlertPublish: React.FC<Props> = ({
  visible,
  isPublish,
  isLoading,
  usePoints,
  points,
  publishMessage,
  nativeLanguage,
  onPressSubmit,
  onPressCloseCancel,
  onPressCloseSns,
}: Props): JSX.Element | null => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {!isPublish ? (
          <>
            <Text style={styles.title}>{I18n.t('common.confirmation')}</Text>
            <View style={styles.line} />
            <Text style={styles.text}>
              {I18n.t('modalAlertPublish.confirmation', { usePoints })}
            </Text>
            <View style={styles.points}>
              <UserPointsBig points={points} />
            </View>
            <Space size={32} />
            <View style={styles.button}>
              <SubmitButton
                isLoading={isLoading}
                title={I18n.t('modalAlertPublish.submit')}
                onPress={onPressSubmit}
              />
              <Space size={16} />
              <WhiteButton
                title={I18n.t('common.cancel')}
                onPress={onPressCloseCancel}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.title}>
              {I18n.t('modalAlertPublish.publish')}
            </Text>
            <View style={styles.line} />
            <Image style={styles.img} source={Note} />
            <Space size={32} />
            {publishMessage ? (
              <>
                <Text style={styles.text}>{publishMessage}</Text>
                <Space size={16} />
              </>
            ) : null}
            {/* <Text style={styles.text}>{I18n.t('modalAlertPublish.share')}</Text>
            {Platform.OS !== 'web' ? (
              <SubmitButton
                title={I18n.t('modalAlertPublish.submit')}
                onPress={onPressShare}
              />
            ) : null}
            */}

            <WhiteButton
              title={I18n.t('common.close')}
              onPress={onPressCloseSns}
            />
          </>
        )}
      </View>
    </Modal>
  );
};

export default ModalAlertPublish;
