import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import LottieViewWeb from 'react-native-web-lottie';

import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
} from '@/styles/Common';
import I18n from '@/utils/I18n';
import { FlashLeft, FlashRight } from '@/images';
import { Modal } from '@/components/template';
import { Space, UserPointsBig, SubmitButton } from '@/components/atoms';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    paddingBottom: 16,
    textAlign: 'center',
  },
  line: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  text: {
    textAlign: 'center',
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
  lottieView: {
    height: 160,
    alignSelf: 'center',
  },
  img: {
    position: 'absolute',
    right: Platform.OS === 'web' ? 0 : 20,
    top: 20,
    width: 30,
    height: 30,
  },
  img2: {
    position: 'absolute',
    left: Platform.OS === 'web' ? 0 : 20,
    top: 20,
    width: 30,
    height: 30,
  },
  flashWrapper: {
    position: 'relative',
  },
});

interface Props {
  visible: boolean;
  points: number;
  getPoints: number;
  onPressClose: () => void;
}

const ModalCorrectingDone: React.FC<Props> = ({
  visible,
  points,
  getPoints,
  onPressClose,
}: Props): JSX.Element | null => {
  const [isShowFlash, setIsShowFlash] = useState(false);
  const refLottieViewWeb = useRef<LottieViewWeb | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visible) setIsShowFlash(true);
    }, 2300);
    return (): void => clearTimeout(timer);
  }, [visible]);

  useEffect(() => {
    const timer2 = setTimeout(() => {
      if (visible && refLottieViewWeb.current) refLottieViewWeb.current.play();
    }, 500);
    return (): void => clearTimeout(timer2);
  }, [visible]);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>{I18n.t('modalCorrectingDone.title')}</Text>
        <View style={styles.line} />
        <View style={styles.flashWrapper}>
          {isShowFlash ? (
            <>
              <Image style={styles.img} source={FlashLeft} />
              <Image style={styles.img2} source={FlashRight} />
            </>
          ) : null}
          {Platform.OS === 'web' ? (
            <LottieViewWeb
              ref={refLottieViewWeb}
              style={styles.lottieView}
              // eslint-disable-next-line global-require
              source={require('../../animations/points-get.json')}
              loop={false}
            />
          ) : (
            <LottieView
              ref={refLottieViewWeb}
              style={styles.lottieView}
              // eslint-disable-next-line global-require
              source={require('../../animations/points-get.json')}
              loop={false}
            />
          )}
        </View>
        <Text style={styles.text}>
          {I18n.t('modalCorrectingDone.text', { getPoints })}
        </Text>
        <Space size={24} />
        <UserPointsBig points={points} />
        <Space size={32} />
        <SubmitButton title={I18n.t('common.close')} onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalCorrectingDone;
