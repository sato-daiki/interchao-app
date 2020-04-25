import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { primaryColor, fontSizeM, mainColor } from '../../styles/Common';
import { Space } from '../atoms';
import { People } from '../../images';
import Tutorial from '../template/Tutorial';
import I18n from '../../utils/I18n';
import { Language } from '../../types';
import { getlanguage } from '../../utils/diary';

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
  main: {
    color: mainColor,
  },
});

interface Props {
  isLoading?: boolean;
  displayed: boolean;
  nativeLanguage: Language;
  buttonText?: string;
  onPress?: () => void;
}

const TutorialTeachDiaryList: React.FC<Props> = ({
  isLoading = false,
  displayed,
  nativeLanguage,
  buttonText = I18n.t('tutorialTeachDiaryList.buttonText'),
  onPress = (): void => undefined,
}: Props): JSX.Element | null => {
  return (
    <Tutorial
      displayed={displayed}
      isLoading={isLoading}
      title={I18n.t('tutorialTeachDiaryList.title', {
        nativeLanguage: getlanguage(nativeLanguage),
      })}
      buttonText={buttonText}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Image style={styles.img} source={People} resizeMode="contain" />
        <Space size={24} />
        <Text style={styles.text}>
          {I18n.t('tutorialTeachDiaryList.text1', {
            nativeLanguage: getlanguage(nativeLanguage),
          })}
          <Text style={styles.main}>
            {I18n.t('tutorialTeachDiaryList.textMainColor')}
          </Text>
          {I18n.t('tutorialTeachDiaryList.text2', {
            nativeLanguage: getlanguage(nativeLanguage),
          })}
        </Text>
      </View>
    </Tutorial>
  );
};

export default TutorialTeachDiaryList;
