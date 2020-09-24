import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio, AVPlaybackStatus } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFonts } from '@use-expo/font';
import firebase from '../constants/firebase';
import { HeaderText, HoverableIcon, LoadingModal } from '../components/atoms';
import { Diary, Profile } from '../types';
import I18n from '../utils/I18n';
import {
  ModalRecordStackParamList,
  ModaRecordStackNavigationProp,
} from '../navigations/ModalNavigator';
import { DiaryTitleAndText } from '../components/molecules';
import {
  borderLightColor,
  fontSizeM,
  fontSizeS,
  offWhite,
  primaryColor,
  softRed,
} from '../styles/Common';
import { uploadStorageAsync } from '../utils/storage';

export interface Props {
  diary?: Diary;
  profile: Profile;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
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
  playContaier: {
    backgroundColor: offWhite,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  playButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonContainer: {
    height: 70,
    borderTopWidth: 1,
    borderTopColor: borderLightColor,
    backgroundColor: offWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timestampText: {
    color: primaryColor,
    fontSize: fontSizeS,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'RobotoMono',
  },
  recordingText: {
    position: 'absolute',
    right: 20,
    paddingTop: 4,
  },
  noPermissionsContainer: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  noPermissionsText: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
});

const recordingSettings: Audio.RecordingOptions =
  Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY;

const RecordScreen: React.FC<ScreenType> = ({
  navigation,
  diary,
  profile,
  editDiary,
}) => {
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
    // console.log('updateScreenForSoundStatus');
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

  const getSeekSliderPosition = (): number => {
    if (sound != null && soundPosition != null && soundDuration != null) {
      return soundPosition / soundDuration;
    }
    return 0;
  };

  const onPlayPausePressed = async (): Promise<void> => {
    if (sound != null) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        if (getSeekSliderPosition() === 1) {
          await sound.stopAsync();
        }
        await sound.playAsync();
      }
    }
  };

  const onSeekSliderValueChange = (): void => {
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

  const onPressSave = async (): Promise<void> => {
    if (!recording || !diary || !diary.objectID) return;
    if (isLoading) return;

    setIsLoading(true);

    const info = await FileSystem.getInfoAsync(recording.getURI() || '');
    if (!info.exists) {
      setIsLoading(false);
    }
    const path = `voices/${profile.uid}/${diary.objectID}`;

    const voiceUrl = await uploadStorageAsync(path, info.uri);

    await firebase
      .firestore()
      .doc(`diaries/${diary.objectID}`)
      .update({
        voiceUrl,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

    editDiary(diary.objectID, {
      ...diary,
      voiceUrl,
    });

    setIsLoading(false);
  };

  if (!diary) return null;

  if (!fontsLoaded) {
    return <LoadingModal />;
  }

  if (!haveRecordingPermissions) {
    // navigationの最初でチェックしているから基本はここには入らない
    return (
      <View style={styles.noPermissionsContainer}>
        <Text style={[styles.noPermissionsText]}>
          You must enable audio recording permissions in order to use this app.
        </Text>
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
          <View style={styles.playContaier}>
            <Slider
              minimumTrackTintColor={primaryColor}
              value={getSeekSliderPosition()}
              onValueChange={onSeekSliderValueChange}
              onSlidingComplete={onSeekSliderSlidingComplete}
              disabled={!isPlaybackAllowed || isLoading}
            />
            <Text style={styles.timestampText}>{getPlaybackTimestamp()}</Text>
            <View style={styles.playButtonContainer}>
              <HoverableIcon
                disabled={!isPlaybackAllowed || isLoading}
                icon="community"
                name={isPlaying ? 'pause' : 'play'}
                size={56}
                color={primaryColor}
                onPress={onPlayPausePressed}
              />
              <Text onPress={onPressSave}>保存する</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.recordButtonContainer}>
          <HoverableIcon
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
