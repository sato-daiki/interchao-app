import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { primaryColor, fontSizeL } from '../../styles/Common';
import { Loading } from '../../images';

const { height } = Dimensions.get('window');
const size = 40;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.4)',
    height,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  text: {
    fontSize: fontSizeL,
    color: primaryColor,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  loadingImage: {
    width: size,
    height: size,
  },
});

interface Props {
  visible?: boolean;
  transparent?: boolean;
  text?: string;
}
const LoadingModal: React.FC<Props> = ({
  visible,
  transparent,
  text,
}: Props): JSX.Element | null =>
  visible ? (
    <View
      style={[styles.overlay, { height }, transparent && styles.transparent]}
    >
      <Image source={Loading} style={styles.loadingImage} />
      {text ? <Text style={styles.text}>{text}</Text> : null}
    </View>
  ) : null;

export default LoadingModal;
