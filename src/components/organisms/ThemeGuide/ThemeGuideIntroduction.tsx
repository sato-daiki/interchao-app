import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { fontSizeL, fontSizeM, primaryColor } from '@/styles/Common';
import { Swipe } from '@/images';
import { IntroductionParams } from './interface';

interface Props {
  title: string;
  source: ImageSourcePropType;
  params: IntroductionParams;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
  image: {
    width: 60,
    height: 60,
  },
  swipeIcon: {
    width: 60,
    height: 60,
  },
});

const ThemeGuideIntroduction = ({
  title,
  source,
  params,
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={source} style={styles.image} />
      <Text style={styles.text}>{params.text}</Text>
      <Image source={Swipe} style={styles.swipeIcon} />
    </View>
  );
};

export default ThemeGuideIntroduction;
