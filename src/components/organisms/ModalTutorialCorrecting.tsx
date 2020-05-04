import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, ImageProps } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Modal from '../template/Modal';
import {
  fontSizeL,
  primaryColor,
  borderLightColor,
  mainColor,
  subTextColor,
} from '../../styles/Common';
import I18n from '../../utils/I18n';
import {
  HowToCorrect1en,
  HowToCorrect2en,
  HowToCorrect3en,
  HowToCorrect4en,
  HowToCorrect5en,
  HowToCorrect6en,
  HowToCorrect1ja,
  HowToCorrect2ja,
  HowToCorrect3ja,
  HowToCorrect4ja,
  HowToCorrect5ja,
  HowToCorrect6ja,
} from '../../images';
import { HeaderText } from '../atoms';
import { getlanguage, getBasePoints } from '../../utils/diary';
import { Language } from '../../types';
import { TutorialCorrectingListItem } from '../molecules';

const { width } = Dimensions.get('window');

interface Props {
  isLoading?: boolean;
  visible: boolean;
  animationIn?: any;
  nativeLanguage: Language;
  buttonText?: string;
  rightButtonText?: string;
  onPress: () => void;
}

interface Item {
  item: {
    text: string;
    subText?: string;
    image: ImageProps;
    width: number;
    height: number;
  };
  index: number;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skip: {
    position: 'absolute',
    right: 12,
  },
  line: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
  },
  carouselContainer: {
    alignItems: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: mainColor,
  },
  inactiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: subTextColor,
  },
});

const ModalTutorialCorrecting: React.FC<Props> = ({
  isLoading = false,
  animationIn,
  visible,
  nativeLanguage,
  buttonText = I18n.t('tutorialPostDiary.buttonText'),
  rightButtonText = I18n.t('common.skip'),
  onPress,
}: Props): JSX.Element | null => {
  const imagesEn = [
    { image: HowToCorrect1en, width: 638, height: 396 },
    { image: HowToCorrect2en, width: 642, height: 542 },
    { image: HowToCorrect3en, width: 636, height: 210 },
    { image: HowToCorrect4en, width: 637, height: 497 },
    { image: HowToCorrect5en, width: 639, height: 471 },
    { image: HowToCorrect6en, width: 646, height: 321 },
  ];

  const imagesJa = [
    { image: HowToCorrect1ja, width: 624, height: 378 },
    { image: HowToCorrect2ja, width: 624, height: 519 },
    { image: HowToCorrect3ja, width: 629, height: 343 },
    { image: HowToCorrect4ja, width: 622, height: 357 },
    { image: HowToCorrect5ja, width: 631, height: 347 },
    { image: HowToCorrect6ja, width: 631, height: 325 },
  ];

  const images = nativeLanguage === 'en' ? imagesEn : imagesJa;
  const entries = [
    {
      text: I18n.t('tutorialCorrecting.text1', {
        nativeLanguage: getlanguage(nativeLanguage),
      }),
      subText: I18n.t('tutorialCorrecting.subText1'),
      image: images[0].image,
      width: images[0].width,
      height: images[0].height,
    },
    {
      text: I18n.t('tutorialCorrecting.text2'),
      subText: I18n.t('tutorialCorrecting.subText2'),
      image: images[1].image,
      width: images[1].width,
      height: images[1].height,
    },
    {
      text: I18n.t('tutorialCorrecting.text3', {
        nativeCharacters: getBasePoints(nativeLanguage),
      }),
      image: images[2].image,
      width: images[2].width,
      height: images[2].height,
    },
    {
      text: I18n.t('tutorialCorrecting.text4'),
      subText: I18n.t('tutorialCorrecting.subText4'),
      image: images[3].image,
      width: images[3].width,
      height: images[3].height,
    },
    {
      text: I18n.t('tutorialCorrecting.text5'),
      image: images[4].image,
      width: images[4].width,
      height: images[4].height,
    },
    {
      text: I18n.t('tutorialCorrecting.text6'),
      image: images[5].image,
      width: images[5].width,
      height: images[5].height,
    },
    {
      text: I18n.t('tutorialCorrecting.text7'),
      image: null,
      width: 0,
      height: 0,
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const refContainer = useRef(null);

  const renderItem = ({ item, index }: Item): JSX.Element => (
    <TutorialCorrectingListItem
      index={index}
      item={item}
      isLoading={isLoading}
      entriesLength={entries.length}
      buttonText={buttonText}
      onPress={onPress}
    />
  );

  return (
    <Modal visible={visible} animationIn={animationIn}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{I18n.t('tutorialCorrecting.title')}</Text>
          <View style={styles.skip}>
            <HeaderText title={rightButtonText} onPress={onPress} />
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.carouselContainer}>
          <Carousel
            ref={refContainer}
            data={entries}
            renderItem={renderItem}
            sliderWidth={width - 60}
            itemWidth={width - 60}
            onSnapToItem={(index: number): void => setActiveSlide(index)}
          />
        </View>
        <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeSlide}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </Modal>
  );
};

export default ModalTutorialCorrecting;
