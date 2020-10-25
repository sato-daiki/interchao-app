import React from 'react';
import LottieView from 'lottie-react-native';
import LottieViewWeb from 'react-native-web-lottie';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
} from '@/styles/Common';
import I18n from '@/utils/I18n';
import { WhiteButton, Space } from '@/components/atoms';

interface Props {
  publishMessage: string | null;
  onPressCloseSns: () => void;
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  line: {
    paddingHorizontal: 16,
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: fontSizeM * 1.3,
  },
  img: {
    backgroundColor: 'red',
    width: 40,
    height: 40,
  },
  lottieViewWrapper: {
    height: 100,
  },
  lottieViewWebWrapper: {
    height: 70,
  },
  lottieViewWeb: {
    position: 'absolute',
    height: 180,
    top: -60,
    alignSelf: 'center',
  },
  lottieView: {
    position: 'absolute',
    height: 180,
    top: -15,
    alignSelf: 'center',
  },
});

const AfterPublished: React.FC<Props> = ({
  publishMessage,
  onPressCloseSns,
}: Props): JSX.Element | null => {
  return (
    <>
      <Text style={styles.title}>{I18n.t('modalAlertPublish.publish')}</Text>
      <View>
        <View style={styles.line} />
        {Platform.OS === 'web' ? (
          <View style={styles.lottieViewWebWrapper}>
            <LottieViewWeb
              style={styles.lottieViewWeb}
              // eslint-disable-next-line global-require
              source={require('../../../animations/taking-notes.json')}
              autoPlay
              loop={false}
            />
          </View>
        ) : (
          <View style={styles.lottieViewWrapper}>
            <LottieView
              style={styles.lottieView}
              // eslint-disable-next-line global-require
              source={require('../../../animations/taking-notes.json')}
              autoPlay
              loop={false}
            />
          </View>
        )}
      </View>
      <View>
        <Text style={styles.text}>{publishMessage}</Text>
      </View>
      <Space size={16} />
      <WhiteButton title={I18n.t('common.close')} onPress={onPressCloseSns} />
    </>
  );
};

export default AfterPublished;
