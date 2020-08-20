import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { primaryColor } from '../../styles/Common';
import { CorrectEn } from '../../images/web/index';
import { WebTemplate } from '.';
import I18n from '../../utils/I18n';

interface Props {
  isPcWidth: boolean;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: primaryColor,
    fontWeight: 'bold',
    lineHeight: 40 * 1.3,
    marginBottom: 16,
  },
  text: {
    fontSize: 20,
    color: primaryColor,
    lineHeight: 20 * 1.3,
  },
  image: {
    width: 300,
    height: 300,
  },
});

const WhatIs = ({ isPcWidth }: Props): JSX.Element | null => {
  const renderLeft = (
    <Image resizeMode="contain" style={styles.image} source={CorrectEn} />
  );

  const renderRight = (
    <>
      <Text style={styles.title}>{I18n.t('web.wahtTitle')}</Text>
      <Text style={styles.text}>{I18n.t('web.wahtText1')}</Text>
      <Text style={styles.text}>{I18n.t('web.wahtText2')}</Text>
    </>
  );

  return (
    <WebTemplate
      leftTop={false}
      isPcWidth={isPcWidth}
      renderLeft={renderLeft}
      renderRight={renderRight}
    />
  );
};

export default WhatIs;
