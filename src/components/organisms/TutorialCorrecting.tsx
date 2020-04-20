import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Modal from '../template/Modal';
import {
  fontSizeL,
  primaryColor,
  borderLightColor,
  fontSizeM,
  mainColor,
  subTextColor,
} from '../../styles/Common';
import I18n from '../../utils/I18n';
import { Star } from '../../images';
import { Space, SubmitButton, SmallButtonBlue } from '../atoms';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
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
    right: 0,
  },
  line: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
  },
  text: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    color: primaryColor,
  },
  subText: {
    paddingTop: 16,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.7,
    color: primaryColor,
  },
  slide: {
    alignItems: 'center',
    paddingHorizontal: 16,
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

interface Props {
  isLoading?: boolean;
  displayed: boolean;
  buttonText: string;
  rightButtonText: string;
  onPress: () => void;
}

const entries = [
  {
    text: I18n.t('tutorialCorrecting.text1'),
    subText: I18n.t('tutorialCorrecting.subText1'),
    image: 'aaa',
  },
  {
    text: I18n.t('tutorialCorrecting.text2'),
    subText: I18n.t('tutorialCorrecting.subText2'),
    image: 'aaa',
  },
  {
    text: I18n.t('tutorialCorrecting.text3'),

    image: 'aaa',
  },
  {
    text: I18n.t('tutorialCorrecting.text4'),
    subText: I18n.t('tutorialCorrecting.subText4'),
    image: 'aaa',
  },
  { text: I18n.t('tutorialCorrecting.text5'), image: 'aaa' },
  { text: I18n.t('tutorialCorrecting.text6'), image: 'aaa' },
  { text: I18n.t('tutorialCorrecting.text7'), image: 'aaa' },
];

const TutorialCorrecting: React.FC<Props> = ({
  isLoading = false,
  displayed,
  buttonText = I18n.t('tutorialPostDiary.buttonText'),
  rightButtonText = I18n.t('common.skip'),
  onPress,
}: Props): JSX.Element | null => {
  const [activeSlide, setActiveSlide] = useState(0);
  const refContainer = useRef(null);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image source={Star} style={styles.loadingImage} />
        <Space size={32} />
        <Text style={styles.text}>{item.text}</Text>
        {item.subText ? (
          <Text style={styles.subText}>{item.subText}</Text>
        ) : null}
        {index === entries.length ? (
          <SubmitButton
            isLoading={isLoading}
            title={buttonText}
            onPress={onPress}
          />
        ) : null}
      </View>
    );
  };

  return (
    <Modal visible={!displayed}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{I18n.t('tutorialCorrecting.title')}</Text>
          <View style={styles.skip}>
            <SmallButtonBlue
              isLoading={isLoading}
              title={rightButtonText}
              onPress={onPress}
            />
          </View>
        </View>
        <View style={styles.line} />
        <Carousel
          ref={refContainer}
          data={entries}
          renderItem={renderItem}
          sliderWidth={width - 48}
          itemWidth={width - 32}
          onSnapToItem={(index: number): void => setActiveSlide(index)}
        />
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
