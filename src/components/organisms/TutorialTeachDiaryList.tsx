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
  main: {
    color: mainColor,
  },
});

interface Props {
  isLoading: boolean;
  displayed: boolean;
  onPress?: () => void;
}

const TutorialTeachDiaryList: React.FC<Props> = ({
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
          日本語を勉強をしているユーザの日記一覧です。
          {'\n'}
          {'\n'}
          ステータスが
          <Text style={styles.main}>添削待ち</Text>
          のものを探して添削して10ポイントをゲットしよう。
        </Text>
      </View>
    </Tutorial>
  );
};

export default TutorialTeachDiaryList;
