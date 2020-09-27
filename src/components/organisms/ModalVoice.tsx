import React from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { primaryColor, fontSizeM, fontSizeS } from '../../styles/Common';
import { Modal } from '../template';
import { WhiteButton, Space, HoverableIcon, SubmitButton } from '../atoms';
import I18n from '../../utils/I18n';
import { useAudio } from './audio/hooks';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    maxHeight: height - 200,
    paddingVertical: 16,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  mainContainer: {
    paddingHorizontal: 16,
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
  playButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timestampText: {
    color: primaryColor,
    fontSize: fontSizeS,
    textAlign: 'center',
    textAlignVertical: 'center',
    // fontFamily: 'RobotoMono',
  },
});

interface Props {
  visible: boolean;
  text: string;
  voiceUrl: string;
  afterClose: () => void;
}

const ModalVoice: React.FC<Props> = ({
  visible,
  text,
  voiceUrl,
  afterClose,
}: Props): JSX.Element | null => {
  const {
    isPlaying,
    isPlaybackAllowed,
    isLoading,
    getSeekSliderPosition,
    getPlaybackTimestamp,
    onPlayPausePressed,
    onSeekSliderValueChange,
    onSeekSliderSlidingComplete,
    onClose,
  } = useAudio({
    source: { uri: voiceUrl },
    visible,
  });

  const onPressClose = async (): Promise<void> => {
    await onClose();
    afterClose();
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.text}>{text}</Text>
        </ScrollView>
        <View style={styles.mainContainer}>
          <Space size={16} />
          <Slider
            minimumTrackTintColor={primaryColor}
            value={getSeekSliderPosition()}
            onValueChange={onSeekSliderValueChange}
            onSlidingComplete={onSeekSliderSlidingComplete}
            disabled={!isPlaybackAllowed || isLoading}
          />
          <Text style={styles.timestampText}>{getPlaybackTimestamp()}</Text>
          <Space size={8} />
          <View style={styles.playButtonContainer}>
            <HoverableIcon
              disabled={!isPlaybackAllowed || isLoading}
              icon="community"
              name={isPlaying ? 'pause' : 'play'}
              size={56}
              color={primaryColor}
              onPress={onPlayPausePressed}
            />
          </View>
          <Space size={32} />
          <WhiteButton title={I18n.t('common.close')} onPress={onPressClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalVoice;
