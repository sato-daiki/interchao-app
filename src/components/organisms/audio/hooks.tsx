import React, { useCallback, useEffect, useState } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { AVPlaybackSource } from 'expo-av/build/AV';

interface Props {
  source: AVPlaybackSource;
  visible: boolean;
}

export const useAudio = ({ source, visible }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlaybackAllowed, setIsPlaybackAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  // const [soundPosition, setIsLoading] = useState(false);
  // const [soundDuration, setIsLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // let soundObject: Audio.Sound | null = null;
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const [soundPosition, setSoundPosition] = useState<number | null>(null);
  const [soundDuration, setSoundDuration] = useState<number | null>(null);

  const updateScreenForSoundStatus = useCallback((status: AVPlaybackStatus) => {
    console.log('updateScreenForSoundStatus');
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
  }, []);

  useEffect(() => {
    console.log('start');
    const f = async (): Promise<void> => {
      if (visible) {
        const newSound = new Audio.Sound();
        newSound.setOnPlaybackStatusUpdate(updateScreenForSoundStatus);
        console.log('source', source);
        await newSound.loadAsync(source);
        setSound(newSound);
      }
    };
    f();
    // soundObject = sound;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    console.log('onPlayPausePressed');
    if (sound != null) {
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

  const onClose = async (): Promise<void> => {
    console.log('onClose');
    if (sound !== null) {
      console.log('soundObject !== null');

      sound.setOnPlaybackStatusUpdate(null);
      await sound.unloadAsync();
      setSound(null);
    }
  };

  return {
    isPlaying,
    isPlaybackAllowed,
    isLoading,
    getPlaybackTimestamp,
    getSeekSliderPosition,
    onPlayPausePressed,
    onClose,
    onSeekSliderValueChange,
    onSeekSliderSlidingComplete,
  };
};
