import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio, AVPlaybackStatus } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
// import * as Icons from '../components/organisms/Icons/Icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { useFonts } from '@use-expo/font';
import {
  HeaderText,
  HoverableIcon,
  LoadingModal,
  RecordButton,
} from '../components/atoms';
import { Diary, Profile, User } from '../types';
import I18n from '../utils/I18n';
import {
  ModalRecordStackParamList,
  ModaRecordStackNavigationProp,
} from '../navigations/ModalNavigator';
import RichText from '../components/organisms/RichText';
import { DiaryTitleAndText } from '../components/molecules';
import {
  borderLightColor,
  fontSizeS,
  offWhite,
  primaryColor,
  softRed,
} from '../styles/Common';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;
const RATE_SCALE = 3.0;

export interface Props {
  diary?: Diary;
  user: User;
  profile: Profile;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalRecordStackParamList, 'Record'>,
  ModaRecordStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: offWhite,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  centerIcon: {
    alignItems: 'center',
  },
  playButtonContainer: {
    backgroundColor: offWhite,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  recordButtonContainer: {
    height: 70,
    borderTopWidth: 1,
    borderTopColor: borderLightColor,
    backgroundColor: offWhite,
    justifyContent: 'center',
  },
  recordingContainer: {
    backgroundColor: offWhite,
    paddingVertical: 16,
  },
  timestampText: {
    color: primaryColor,
    fontSize: fontSizeS,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'RobotoMono',
  },
  recordingText: {
    alignSelf: 'center',
    position: 'absolute',
    paddingLeft: 124,
    paddingTop: 4,
  },
  // noPermissionsText: {
  //   textAlign: 'center',
  // },
  // wrapper: {},
  // halfScreenContainer: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   alignSelf: 'stretch',
  //   minHeight: DEVICE_HEIGHT / 2.0,
  //   maxHeight: DEVICE_HEIGHT / 2.0,
  // },
  // recordingContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   alignSelf: 'stretch',
  //   minHeight: Icons.RECORD_BUTTON.height,
  //   maxHeight: Icons.RECORD_BUTTON.height,
  // },

  // recordingDataRowContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   minHeight: Icons.RECORDING.height,
  //   maxHeight: Icons.RECORDING.height,
  // },
  // playbackContainer: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   alignSelf: 'stretch',
  //   minHeight: Icons.THUMB_1.height * 2.0,
  //   maxHeight: Icons.THUMB_1.height * 2.0,
  // },

  // liveText: {
  //   color: LIVE_COLOR,
  // },
  // recordingTimestamp: {
  //   paddingLeft: 20,
  // },
  // playbackTimestamp: {
  //   textAlign: 'right',
  //   alignSelf: 'stretch',
  //   paddingRight: 20,
  // },
  // image: {
  //   backgroundColor: BACKGROUND_COLOR,
  // },
  // buttonsContainerBase: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
  // buttonsContainerTopRow: {
  //   maxHeight: Icons.MUTED_BUTTON.height,
  //   alignSelf: 'stretch',
  //   paddingRight: 20,
  // },
  // playStopContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   minWidth: ((Icons.PLAY_BUTTON.width + Icons.STOP_BUTTON.width) * 3.0) / 2.0,
  //   maxWidth: ((Icons.PLAY_BUTTON.width + Icons.STOP_BUTTON.width) * 3.0) / 2.0,
  // },
  // volumeContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   minWidth: DEVICE_WIDTH / 2.0,
  //   maxWidth: DEVICE_WIDTH / 2.0,
  // },
  // volumeSlider: {
  //   width: DEVICE_WIDTH / 2.0 - Icons.MUTED_BUTTON.width,
  // },
  // buttonsContainerBottomRow: {
  //   maxHeight: Icons.THUMB_1.height,
  //   alignSelf: 'stretch',
  //   paddingRight: 20,
  //   paddingLeft: 20,
  // },
  // rateSlider: {
  //   width: DEVICE_WIDTH / 2.0,
  // },
});

const recordingSettings: Audio.RecordingOptions =
  Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY;

const RecordScreen: React.FC<ScreenType> = ({ navigation, diary, profile }) => {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line global-require
    RobotoMono: require('../styles/fonts/RobotoMono-Regular.ttf'),
  });

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

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
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

  /**
   * ヘッダーに初期値設定
   */
  useEffect(() => {
    navigation.setOptions({
      headerLeft: (): JSX.Element => (
        <HeaderText
          text={I18n.t('common.close')}
          onPress={(): void => navigation.goBack()}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        isLooping: false,
        isMuted: muted,
        volume,
        rate,
        shouldCorrectPitch,
      },
      updateScreenForSoundStatus
    );
    setSound(result.sound);
    setIsLoading(false);
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
      setRecording(null);
    }

    const newRecording = new Audio.Recording();
    await newRecording.prepareToRecordAsync(recordingSettings);
    newRecording.setOnRecordingStatusUpdate(updateScreenForRecordingStatus);

    setRecording(newRecording);
    await newRecording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.

    setIsLoading(false);
  };

  const onRecordPressed = (): void => {
    if (isRecording) {
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

  if (!diary) return null;

  if (!fontsLoaded) {
    return <LoadingModal />;
  }

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
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <DiaryTitleAndText
            nativeLanguage={profile.nativeLanguage}
            textLanguage={profile.learnLanguage}
            title={diary.fairCopyTitle || diary.title}
            text={diary.fairCopyText || diary.text}
          />
        </ScrollView>
        {sound ? (
          <View style={styles.playButtonContainer}>
            <Slider
              minimumTrackTintColor={primaryColor}
              value={getSeekSliderPosition()}
              onValueChange={onSeekSliderValueChange}
              onSlidingComplete={onSeekSliderSlidingComplete}
              disabled={!isPlaybackAllowed || isLoading}
            />
            <Text style={styles.timestampText}>{getPlaybackTimestamp()}</Text>
            <HoverableIcon
              style={styles.centerIcon}
              disabled={!isPlaybackAllowed || isLoading}
              icon="community"
              name={isPlaying ? 'pause' : 'play'}
              size={56}
              color={primaryColor}
              onPress={onPlayPausePressed}
            />
          </View>
        ) : null}

        <View style={styles.recordButtonContainer}>
          <HoverableIcon
            style={styles.centerIcon}
            disabled={isLoading}
            icon="community"
            name={isRecording ? 'stop' : 'record'}
            size={64}
            color={softRed}
            onPress={onRecordPressed}
          />
          {isRecording ? (
            <Text style={[styles.timestampText, styles.recordingText]}>
              {getRecordingTimestamp()}
            </Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RecordScreen;
