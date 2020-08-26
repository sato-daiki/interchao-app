import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { primaryColor } from '../../../styles/Common';
import { App } from '../../../images/web';
import WebTemplate from '../template/WebTemplate';
import I18n from '../../../utils/I18n';
import { getImage } from '../../../utils/web';

interface Props {
  isMaxLayoutChange: boolean;
}

const styles = StyleSheet.create({
  warapper: {
    paddingTop: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    color: primaryColor,
    fontWeight: 'bold',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 12,
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

const WhatIs = ({ isMaxLayoutChange }: Props): JSX.Element | null => {
  const source = getImage('correct');
  const renderLeft = source ? (
    <Image resizeMode="contain" style={styles.image} source={source} />
  ) : (
    <View />
  );

  const renderRight = (
    <>
      <View style={styles.row}>
        <Image source={App} resizeMode="contain" style={styles.icon} />
        <Text style={styles.title}>{I18n.t('web.wahtTitle')}</Text>
      </View>
      <Text style={styles.text}>{I18n.t('web.wahtText1')}</Text>
      <Text style={styles.text}>{I18n.t('web.wahtText2')}</Text>
    </>
  );

  return (
    <WebTemplate
      warapper={styles.warapper}
      leftTop={false}
      isMaxLayoutChange={isMaxLayoutChange}
      renderLeft={renderLeft}
      renderRight={renderRight}
    />
  );
};

export default WhatIs;
