import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { fontSizeM, primaryColor } from '@/styles/Common';
import { SwipeGuid } from '@/components/atoms';
import { IntroductionParams } from './interface';

interface Props {
  source: ImageSourcePropType;
  params: IntroductionParams;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 32,
  },
});

const ThemeGuideIntroduction = ({ source, params }: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} />
      <Text style={styles.text}>{params.text}</Text>
      <SwipeGuid type="start" />
    </View>
  );
};

export default ThemeGuideIntroduction;
