import React, { useState, useEffect } from 'react';
import { useFonts } from '@use-expo/font';
import { Text, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, primaryColor, softRed } from '@/styles/Common';
import { LoadingModal } from '../atoms';

interface Props {
  onTimeUp: () => void;
}

interface Time {
  mins: string;
  secs: string;
}

const styles = StyleSheet.create({
  contaienr: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  icon: {
    marginRight: 2,
  },
  text: {
    fontSize: fontSizeM,
    fontFamily: 'RobotoMono',
  },
});

const formatNumber = (number: number): string => `0${number}`.slice(-2);

const getRemaining = (time: number): Time => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
};

const CorrectionTimer: React.FC<Props> = ({ onTimeUp }): JSX.Element => {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line global-require
    RobotoMono: require('../../styles/fonts/RobotoMono-Regular.ttf'),
  });

  const [remainingSecs, setRemainingSecs] = useState(1800);
  const { mins, secs } = getRemaining(remainingSecs);

  useEffect(() => {
    // exit early when we reach 0
    if (!remainingSecs) {
      onTimeUp();
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const interval = setInterval(() => {
      setRemainingSecs(remainingSecs - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    // eslint-disable-next-line consistent-return
    return (): void => {
      clearInterval(interval);
    };
    // };
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSecs]);

  if (!fontsLoaded) {
    return <LoadingModal visible={fontsLoaded} />;
  }
  return (
    <View style={styles.contaienr}>
      <MaterialCommunityIcons
        style={styles.icon}
        name="timer"
        size={14}
        color={primaryColor}
      />
      <Text
        style={[
          styles.text,
          {
            color: mins === '00' ? softRed : primaryColor,
          },
        ]}
      >
        {`${mins}:${secs}`}
      </Text>
    </View>
  );
};

export default CorrectionTimer;
