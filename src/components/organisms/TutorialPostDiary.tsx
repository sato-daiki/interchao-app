import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { primaryColor, fontSizeM } from '../../styles/Common';
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
  isLoading: boolean;
  displayed: boolean;
  onPress?: () => void;
}

const TutorialPostDiary: React.FC<Props> = ({
  isLoading,
  displayed,
  onPress = (): void => {},
}: Props): JSX.Element | null => {
  return (
    <Tutorial displayed={displayed} isLoading={isLoading} onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.img} source={Zebbu} resizeMode="contain" />
        <Space size={24} />
        <Text style={styles.text}>
          英語で日記を書いてみよう。 600文字ごとに10ポイントが必要です。
          {'\n'}
          {'\n'}
          日記を投稿するとネイティブがあなたの日記を添削してくれるかも！？
          日本語を勉強している人の日記を添削すると10ポイントがもらえます。お互いに言語を教え合いましょう！
        </Text>
      </View>
    </Tutorial>
  );
};

export default TutorialPostDiary;
