import { getTime } from '@/utils/time';
import React from 'react';
import { useFonts } from '@use-expo/font';

import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fontSizeM, mainColor, primaryColor, softRed } from '@/styles/Common';
import LoadingModal from './LoadingModal';

type Props = {
  date: Date;
  isError: boolean;
  onPress: () => void;
};

const styles = StyleSheet.create({
  border: {
    borderColor: mainColor,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    fontFamily: 'RobotoMono',
  },
});

const TimeBox: React.FC<Props> = ({ onPress, date, isError }) => {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line global-require
    RobotoMono: require('../../styles/fonts/RobotoMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <LoadingModal visible={fontsLoaded} />;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.border, { borderColor: !isError ? mainColor : softRed }]}
    >
      <Text style={styles.text}>{getTime(date)}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(TimeBox);
