import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { primaryColor, fontSizeM, mainColor } from '../../styles/Common';
import { Space } from '../atoms';
import { Zebbu } from '../../images';
import Tutorial from '../template/Tutorial';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
  img: {
    alignSelf: 'center',
    width: 200,
    height: 200,
  },
});

interface Props {
  isLoading?: boolean;
  displayed: boolean;
  buttonText?: string;
  onPress?: () => void;
}

const TutorialPoints: React.FC<Props> = ({
  isLoading = false,
  displayed,
  buttonText = '始める',
  onPress = (): void => {},
}: Props): JSX.Element | null => {
  return (
    <Tutorial
      displayed={displayed}
      isLoading={isLoading}
      title="ポイントについて"
      buttonText={buttonText}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Image style={styles.img} source={Zebbu} resizeMode="contain" />
        <Space size={24} />
        <Text style={styles.text}>
          日記を投稿するには10ポイント〜が必要です。
          {'\n'}
          {'\n'}
          レビューをすると10ポイント〜を獲得できます。
          {'\n'}
          {'\n'}
          消費、獲得するポイントは文字数と言語により異なります。
          英語は600文字ごと、日本語は200文字ごとに10ポイント消費または獲得できます。
        </Text>
      </View>
    </Tutorial>
  );
};

export default TutorialPoints;
