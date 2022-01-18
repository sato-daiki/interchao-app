import React from 'react';
import { StyleSheet } from 'react-native';

import { transparentBlack } from '@/styles/common';
import { LoadingWhite } from '@/images';
import LoadingModal, { Props } from './LoadingModal';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: transparentBlack,
  },
  textStyle: {
    marginTop: 7,
    color: '#fff',
  },
});

const DarkLoadingModal: React.FC<Props> = props => (
  <LoadingModal
    source={LoadingWhite}
    containerStyle={styles.containerStyle}
    textStyle={styles.textStyle}
    {...props}
  />
);

export default React.memo(DarkLoadingModal);
