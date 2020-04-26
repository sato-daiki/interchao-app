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
} from '../../images';
import { HeaderText } from '../atoms';
import { getlanguage, getBasePoints } from '../../utils/diary';
import { Language } from '../../types';
import { TutorialCorrectingListItem } from '../molecules';

const { width } = Dimensions.get('window');

interface Props {
  isLoading?: boolean;
  displayed: boolean;
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

const TutorialCorrecting: React.FC<Props> = ({
  isLoading = false,
  displayed,
  nativeLanguage,
  buttonText = I18n.t('tutorialPostDiary.buttonText'),
  rightButtonText = I18n.t('common.skip'),
  onPress,
}: Props): JSX.Element | null => {
  const entries = [
    {
      text: I18n.t('tutorialCorrecting.text1', {
        nativeLanguage: getlanguage(nativeLanguage),
      }),
      subText: I18n.t('tutorialCorrecting.subText1'),
      image: HowToCorrect1en,
      width: 638,
      height: 396,
    },
    {
      text: I18n.t('tutorialCorrecting.text2'),
      subText: I18n.t('tutorialCorrecting.subText2'),
      image: HowToCorrect2en,
      width: 642,
      height: 542,
    },
    {
      text: I18n.t('tutorialCorrecting.text3', {
        nativeCharacters: getBasePoints(nativeLanguage),
      }),
      image: HowToCorrect3en,
      width: 636,
      height: 210,
    },
    {
      text: I18n.t('tutorialCorrecting.text4'),
      subText: I18n.t('tutorialCorrecting.subText4'),
      image: HowToCorrect4en,
      width: 637,
      height: 497,
    },
    {
      text: I18n.t('tutorialCorrecting.text5'),
      image: HowToCorrect5en,
      width: 639,
      height: 471,
    },
    {
      text: I18n.t('tutorialCorrecting.text6'),
      image: HowToCorrect6en,
      width: 646,
      height: 321,
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
    <Modal visible={!displayed}>
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

export default TutorialCorrecting;
