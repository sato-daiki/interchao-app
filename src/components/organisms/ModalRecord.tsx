import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as Icons from './Icons/Icons';
import { fontSizeL } from '../../styles/Common';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;
const RATE_SCALE = 3.0;

type Props = {};

type State = {
  haveRecordingPermissions: boolean;
  isLoading: boolean;
  isPlaybackAllowed: boolean;
  muted: boolean;
  soundPosition: number | null;
  soundDuration: number | null;
  recordingDuration: number | null;
  shouldPlay: boolean;
  isPlaying: boolean;
  isRecording: boolean;
  shouldCorrectPitch: boolean;
  volume: number;
  rate: number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
    minHeight: DEVICE_HEIGHT,
    maxHeight: DEVICE_HEIGHT,
  },
  noPermissionsText: {
    textAlign: 'center',
  },
  wrapper: {},
  halfScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: DEVICE_HEIGHT / 2.0,
    maxHeight: DEVICE_HEIGHT / 2.0,
  },
  recordingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: Icons.RECORD_BUTTON.height,
    maxHeight: Icons.RECORD_BUTTON.height,
  },
  recordingDataContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: Icons.RECORD_BUTTON.height,
    maxHeight: Icons.RECORD_BUTTON.height,
    minWidth: Icons.RECORD_BUTTON.width * 3.0,
    maxWidth: Icons.RECORD_BUTTON.width * 3.0,
  },
  recordingDataRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: Icons.RECORDING.height,
    maxHeight: Icons.RECORDING.height,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: Icons.THUMB_1.height * 2.0,
    maxHeight: Icons.THUMB_1.height * 2.0,
  },
  playbackSlider: {
    alignSelf: 'stretch',
  },
  liveText: {
    color: LIVE_COLOR,
  },
  recordingTimestamp: {
    paddingLeft: 20,
  },
  playbackTimestamp: {
    textAlign: 'right',
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  image: {
    backgroundColor: BACKGROUND_COLOR,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainerTopRow: {
    maxHeight: Icons.MUTED_BUTTON.height,
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  playStopContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: ((Icons.PLAY_BUTTON.width + Icons.STOP_BUTTON.width) * 3.0) / 2.0,
    maxWidth: ((Icons.PLAY_BUTTON.width + Icons.STOP_BUTTON.width) * 3.0) / 2.0,
  },
  volumeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0 - Icons.MUTED_BUTTON.width,
  },
  buttonsContainerBottomRow: {
    maxHeight: Icons.THUMB_1.height,
    alignSelf: 'stretch',
    paddingRight: 20,
    paddingLeft: 20,
  },
  rateSlider: {
    width: DEVICE_WIDTH / 2.0,
  },
});

const recordingSettings: Audio.RecordingOptions =
  Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY;

const ModalRecord: React.FC<Props> = () => {
  const [haveRecordingPermissions, setHaveRecordingPermissions] = useState(
    false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaybackAllowed, setIsPlaybackAllowed] = useState(false);
  const [muted, setMuted] = useState(false);
  const [soundPosition, setSoundPosition] = useState<number | null>(null);
  const [soundDuration, setSoundDuration] = useState<number | null>(null);
  const [recordingDuration, setRecordingDuration] = useState<number | null>(
    null
  );
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [shouldCorrectPitch, setShouldCorrectPitch] = useState(true);
  const [volume, setVolume] = useState(1.0);
  const [rate, setRate] = useState(1.0);

  const [recording, setrRcording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isSeeking, setIsSeeking] = useState(false);
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState(false);

  useEffect(() => {
    const f = async (): Promise<void> => {
      const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      setHaveRecordingPermissions(response.status === 'granted');
    };
    f();
  }, []);

  const updateScreenForSoundStatus = (status: AVPlaybackStatus): void => {
    if (status.isLoaded) {
      setSoundDuration(status.durationMillis ?? null);
      setSoundPosition(status.positionMillis);
      setShouldPlay(status.shouldPlay);
      setIsPlaying(status.isPlaying);
      setRate(status.rate);
      setMuted(status.isMuted);
      setVolume(status.volume);
      setShouldCorrectPitch(status.shouldCorrectPitch);
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

  const stopRecordingAndEnablePlayback = async (): Promise<void> => {
    setIsLoading(true);
    if (!recording) {
      return;
    }
    try {
      await recording.stopAndUnloadAsync();
    } catch (error) {
      // On Android, calling stop before any data has been collected results in
      // an E_AUDIO_NODATA error. This means no audio data has been written to
      // the output file is invalid.
      if (error.code === 'E_AUDIO_NODATA') {
        console.log(
          `Stop was called too quickly, no data has yet been received (${error.message})`
        );
      } else {
        console.log('STOP ERROR: ', error.code, error.name, error.message);
      }
      setIsLoading(false);
      return;
    }
    const info = await FileSystem.getInfoAsync(recording.getURI() || '');
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const result = await recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: muted,
        volume,
        rate,
        shouldCorrectPitch,
      },
      updateScreenForSoundStatus
    );
    setSound(result.sound);
    setIsLoading(false);
    console.log('eee');
  };

  const updateScreenForRecordingStatus = (
    status: Audio.RecordingStatus
  ): void => {
    if (status.canRecord) {
      setIsRecording(status.isRecording);
      setRecordingDuration(status.durationMillis);
    } else if (status.isDoneRecording) {
      setIsRecording(false);
      setRecordingDuration(status.durationMillis);
      if (!isLoading) {
        stopRecordingAndEnablePlayback();
      }
    }
  };

  const stopPlaybackAndBeginRecording = async (): Promise<void> => {
    setIsLoading(true);

    if (sound !== null) {
      await sound.unloadAsync();
      sound.setOnPlaybackStatusUpdate(null);
      setSound(null);
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    if (recording !== null) {
      recording.setOnRecordingStatusUpdate(null);
      setrRcording(null);
    }

    const newRecording = new Audio.Recording();
    await newRecording.prepareToRecordAsync(recordingSettings);
    newRecording.setOnRecordingStatusUpdate(updateScreenForRecordingStatus);

    setrRcording(newRecording);
    await newRecording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.

    setIsLoading(false);
  };

  const onRecordPressed = (): void => {
    if (isRecording) {
      console.log('isRecording');
      stopRecordingAndEnablePlayback();
    } else {
      stopPlaybackAndBeginRecording();
    }
  };

  const onPlayPausePressed = (): void => {
    if (sound != null) {
      if (isPlaying) {
        sound.pauseAsync();
      } else {
        sound.playAsync();
      }
    }
  };

  const onStopPressed = (): void => {
    if (sound != null) {
      sound.stopAsync();
    }
  };

  const onMutePressed = (): void => {
    if (sound != null) {
      sound.setIsMutedAsync(!muted);
    }
  };

  const onVolumeSliderValueChange = (value: number): void => {
    if (sound != null) {
      sound.setVolumeAsync(value);
    }
  };

  const trySetRate = async (
    prmRate: number,
    prmShouldCorrectPitch: boolean
  ): Promise<void> => {
    if (sound != null) {
      try {
        await sound.setRateAsync(prmRate, prmShouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  const onRateSliderSlidingComplete = async (value: number): Promise<void> => {
    trySetRate(value * RATE_SCALE, shouldCorrectPitch);
  };

  const onPitchCorrectionPressed = (): void => {
    trySetRate(rate, !shouldCorrectPitch);
  };

  const onSeekSliderValueChange = (value: number): void => {
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

  const getSeekSliderPosition = (): number => {
    if (sound != null && soundPosition != null && soundDuration != null) {
      return soundPosition / soundDuration;
    }
    return 0;
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

  const getPlaybackTimestamp = (): string => {
    if (sound != null && soundPosition != null && soundDuration != null) {
      return `${getMMSSFromMillis(soundPosition)} / ${getMMSSFromMillis(
        soundDuration
      )}`;
    }
    return '';
  };

  const getRecordingTimestamp = (): string => {
    if (recordingDuration != null) {
      return `${getMMSSFromMillis(recordingDuration)}`;
    }
    return `${getMMSSFromMillis(0)}`;
  };

  if (!haveRecordingPermissions) {
    return (
      <View style={styles.container}>
        <View />
        <Text style={[styles.noPermissionsText]}>
          You must enable audio recording permissions in order to use this app.
        </Text>
        <View />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.halfScreenContainer,
          {
            opacity: isLoading ? DISABLED_OPACITY : 1.0,
          },
        ]}
      >
        <View />
        <View style={styles.recordingContainer}>
          <View />
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={onRecordPressed}
            disabled={isLoading}
          >
            <Image style={styles.image} source={Icons.RECORD_BUTTON.module} />
          </TouchableHighlight>
          <View style={styles.recordingDataContainer}>
            <View />
            <Text style={[styles.liveText]}>{isRecording ? 'LIVE' : ''}</Text>
            <View style={styles.recordingDataRowContainer}>
              <Image
                style={[styles.image, { opacity: isRecording ? 1.0 : 0.0 }]}
                source={Icons.RECORDING.module}
              />
              <Text style={[styles.recordingTimestamp]}>
                {getRecordingTimestamp()}
              </Text>
            </View>
            <View />
          </View>
          <View />
        </View>
        <View />
      </View>
      <View
        style={[
          styles.halfScreenContainer,
          {
            opacity: !isPlaybackAllowed || isLoading ? DISABLED_OPACITY : 1.0,
          },
        ]}
      >
        <View />
        <View style={styles.playbackContainer}>
          <Slider
            style={styles.playbackSlider}
            trackImage={Icons.TRACK_1.module}
            thumbImage={Icons.THUMB_1.module}
            value={getSeekSliderPosition()}
            onValueChange={onSeekSliderValueChange}
            onSlidingComplete={onSeekSliderSlidingComplete}
            disabled={!isPlaybackAllowed || isLoading}
          />
          <Text style={[styles.playbackTimestamp]}>
            {getPlaybackTimestamp()}
          </Text>
        </View>
        <View
          style={[styles.buttonsContainerBase, styles.buttonsContainerTopRow]}
        >
          <View style={styles.volumeContainer}>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={onMutePressed}
              disabled={!isPlaybackAllowed || isLoading}
            >
              <Image
                style={styles.image}
                source={
                  muted
                    ? Icons.MUTED_BUTTON.module
                    : Icons.UNMUTED_BUTTON.module
                }
              />
            </TouchableHighlight>
            <Slider
              style={styles.volumeSlider}
              trackImage={Icons.TRACK_1.module}
              thumbImage={Icons.THUMB_2.module}
              value={1}
              onValueChange={onVolumeSliderValueChange}
              disabled={!isPlaybackAllowed || isLoading}
            />
          </View>
          <View style={styles.playStopContainer}>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={onPlayPausePressed}
              disabled={!isPlaybackAllowed || isLoading}
            >
              <Image
                style={styles.image}
                source={
                  isPlaying
                    ? Icons.PAUSE_BUTTON.module
                    : Icons.PLAY_BUTTON.module
                }
              />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={onStopPressed}
              disabled={!isPlaybackAllowed || isLoading}
            >
              <Image style={styles.image} source={Icons.STOP_BUTTON.module} />
            </TouchableHighlight>
          </View>
          <View />
        </View>
        <View
          style={[
            styles.buttonsContainerBase,
            styles.buttonsContainerBottomRow,
          ]}
        >
          <Text>Rate:</Text>
          <Slider
            style={styles.rateSlider}
            trackImage={Icons.TRACK_1.module}
            thumbImage={Icons.THUMB_1.module}
            value={rate / RATE_SCALE}
            onSlidingComplete={onRateSliderSlidingComplete}
            disabled={!isPlaybackAllowed || isLoading}
          />
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={onPitchCorrectionPressed}
            disabled={!isPlaybackAllowed || isLoading}
          >
            <Text>
              PC:
              {shouldCorrectPitch ? 'yes' : 'no'}
            </Text>
          </TouchableHighlight>
        </View>
        <View />
      </View>
    </View>
  );
};

export default ModalRecord;
