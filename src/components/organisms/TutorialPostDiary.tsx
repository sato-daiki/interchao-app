import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { primaryColor, fontSizeM } from '../../styles/Common';
import { Space } from '../atoms';
import { Pen } from '../../images';
import Tutorial from '../template/Tutorial';
import I18n from '../../utils/I18n';

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
    width: 80,
    height: 80,
  },
});

interface Props {
  isLoading?: boolean;
  displayed: boolean;
  buttonText?: string;
  onPress?: () => void;
}

const TutorialPostDiary: React.FC<Props> = ({
  isLoading = false,
  displayed,
  buttonText = I18n.t('tutorialPostDiary.buttonText'),
  onPress = (): void => {},
}: Props): JSX.Element | null => {
  return (
    <Tutorial
      displayed={displayed}
      isLoading={isLoading}
      title={I18n.t('tutorialPostDiary.title')}
      buttonText={buttonText}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Image style={styles.img} source={Pen} resizeMode="contain" />
        <Space size={24} />
        <Text style={styles.text}>{I18n.t('tutorialPostDiary.text')}</Text>
      </View>
    </Tutorial>
  );
};

export default TutorialPostDiary;
