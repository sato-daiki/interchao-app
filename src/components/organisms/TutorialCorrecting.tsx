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

const TutorialCorrecting: React.FC<Props> = ({
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
          誤っている箇所を長押しして、選択して「正しい表現」と「補足」をしてあげましょう。
          {'\n'}
          {'\n'}
          間違っている場所がない場合は、「より良くなる表現」を教えてあげましょう。
          {'\n'}
          {'\n'}
          コメントは600文字に対して3つを目安に入れてあげましょう！
          {'\n'}
          {'\n'}
          最後にまとめとして、全体の評価をしてあげましょう！
        </Text>
      </View>
    </Tutorial>
  );
};

export default TutorialCorrecting;
