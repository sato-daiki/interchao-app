import React, { useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { GrayHeader, ShareButton, Space, WhiteButton } from '../atoms';
import DiaryOriginal from './DiaryOriginal';

import { Diary, Profile } from '../../types';
import { mainColor, primaryColor } from '../../styles/Common';
import ModalSpeech from './ModalSpeech';
import ModalVoice from './ModalVoice';
import I18n from '../../utils/I18n';

export interface Props {
  diary: Diary;
  profile: Profile;
  goToRecord: () => void;
  checkPermissions: () => Promise<boolean>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  viewShot: {
    backgroundColor: '#FFF',
    paddingTop: 12,
  },
  scrollView: {
    flex: 1,
  },
  containerStyle: {
    justifyContent: 'center',
  },
  button: {
    width: 300,
    alignSelf: 'center',
    marginBottom: 16,
  },
});

const FairCopy: React.FC<Props> = ({
  diary,
  profile,
  goToRecord,
  checkPermissions,
}) => {
  const [visibleSpeech, setVisibleSpeech] = useState(false);
  const [visibleVoice, setVisibleVoice] = useState(false);

  const viewShotRef = useRef<ViewShot | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlaybackAllowed, setIsPlaybackAllowed] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const [soundPosition, setSoundPosition] = useState<number | null>(null);
  const [soundDuration, setSoundDuration] = useState<number | null>(null);

  const updateScreenForSoundStatus = (status: AVPlaybackStatus): void => {
    console.log('updateScreenForSoundStatus', status);
    if (status.isLoaded) {
      setSoundDuration(status.durationMillis ?? null);
      setSoundPosition(status.positionMillis);
      setShouldPlay(status.shouldPlay);
      setIsPlaying(status.isPlaying);
      setIsPlaybackAllowed(true);
    } else {
      setSoundDuration(null);
      setSoundPosition(null);
      setIsPlaybackAllowed(false);
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  const onSeekSliderValueChange = (): void => {
    console.log('onSeekSliderValueChange');
    if (sound != null && !isSeeking) {
      setIsSeeking(true);
      setShouldPlayAtEndOfSeek(shouldPlay);
      sound.pauseAsync();
    }
  };

  const onSeekSliderSlidingComplete = async (value: number): Promise<void> => {
    if (sound != null) {
      setIsSeeking(false);
      const seekPosition = value * (soundDuration || 0);
      if (shouldPlayAtEndOfSeek) {
        sound.playFromPositionAsync(seekPosition);
      } else {
        sound.setPositionAsync(seekPosition);
      }
    }
  };

  const getMMSSFromMillis = (millis: number): string => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number: number): string => {
      const string = number.toString();
      if (number < 10) {
        return `0${string}`;
      }
      return string;
    };
    return `${padWithZero(minutes)}:${padWithZero(seconds)}`;
  };

  const getSeekSliderPosition = (): number => {
    if (sound != null && soundPosition != null && soundDuration != null) {
      return soundPosition / soundDuration;
    }
    return 0;
  };

  const getPlaybackTimestamp = (): string => {
    if (sound != null && soundPosition != null && soundDuration != null) {
      return `${getMMSSFromMillis(soundPosition)} / ${getMMSSFromMillis(
        soundDuration
      )}`;
    }
    return '';
  };

  const onPlayPausePressed = async (): Promise<void> => {
    if (sound !== null) {
      if (isPlaying) {
        sound.pauseAsync();
      } else {
        if (getSeekSliderPosition() === 1) {
          await sound.stopAsync();
        }
        sound.playAsync();
      }
    }
  };

  const onPressClose = async (): Promise<void> => {
    if (sound !== null) {
      console.log('soundObject !== null');

      sound.setOnPlaybackStatusUpdate(null);
      await sound.unloadAsync();
      // setSound(null);
    }
    setVisibleVoice(false);
  };

  const onPressMyVoice = async (): Promise<void> => {
    if (!diary.voiceUrl) return;
    const res = await checkPermissions();
    if (!res) return;
    setVisibleVoice(true);
    setIsInitialLoading(true);
    const newSound = new Audio.Sound();
    newSound.setOnPlaybackStatusUpdate(updateScreenForSoundStatus);
    await newSound.loadAsync({ uri: diary.voiceUrl });
    setSound(newSound);
    setIsInitialLoading(false);
  };

  const iconHeader = (
    <MaterialCommunityIcons size={22} color={primaryColor} name="voice" />
  );

  const iconMachine = (
    <MaterialCommunityIcons size={20} color={mainColor} name="robot" />
  );

  const iconRecord = (
    <MaterialCommunityIcons size={24} color={mainColor} name="microphone" />
  );

  const iconHeadphones = (
    <MaterialCommunityIcons size={22} color={mainColor} name="headphones" />
  );

  return (
    <View style={styles.container}>
      <ModalSpeech
        visible={visibleSpeech}
        text={diary.fairCopyText || diary.text}
        textLanguage={profile.learnLanguage}
        onClose={(): void => setVisibleSpeech(false)}
      />
      {diary.voiceUrl ? (
        <ModalVoice
          visible={visibleVoice}
          text={diary.fairCopyText || diary.text}
          isPlaybackAllowed={isPlaybackAllowed}
          isLoading={isInitialLoading}
          isPlaying={isPlaying}
          onSeekSliderValueChange={onSeekSliderValueChange}
          onSeekSliderSlidingComplete={onSeekSliderSlidingComplete}
          getSeekSliderPosition={getSeekSliderPosition}
          getPlaybackTimestamp={getPlaybackTimestamp}
          onPlayPausePressed={onPlayPausePressed}
          onPressClose={onPressClose}
        />
      ) : null}

      <ScrollView style={styles.scrollView}>
        <ViewShot
          style={styles.viewShot}
          ref={viewShotRef}
          options={{ format: 'jpg', quality: 0.9 }}
        >
          <DiaryOriginal
            diary={diary}
            profile={profile}
            title={diary.fairCopyTitle || diary.title}
            text={diary.fairCopyText || diary.text}
          />
        </ViewShot>
        <Space size={24} />
        <GrayHeader
          titleStyle={styles.containerStyle}
          icon={iconHeader}
          title={I18n.t('myDiary.voiceTitle')}
        />
        <Space size={24} />
        {diary.voiceUrl ? (
          <WhiteButton
            containerStyle={styles.button}
            icon={iconHeadphones}
            title={I18n.t('myDiary.myVoice')}
            onPress={onPressMyVoice}
          />
        ) : null}
        <WhiteButton
          containerStyle={styles.button}
          icon={iconMachine}
          title={I18n.t('myDiary.machine')}
          onPress={(): void => setVisibleSpeech(true)}
        />
        {Platform.OS !== 'web' ? (
          <WhiteButton
            containerStyle={styles.button}
            title={I18n.t('myDiary.record')}
            icon={iconRecord}
            onPress={goToRecord}
          />
        ) : null}
        <Space size={32} />
        <View style={styles.button}>
          {Platform.OS !== 'web' ? (
            <ShareButton
              viewShotRef={viewShotRef}
              nativeLanguage={profile.nativeLanguage}
            />
          ) : null}
        </View>
        <Space size={32} />
      </ScrollView>
    </View>
  );
};

export default FairCopy;
