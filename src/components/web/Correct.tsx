import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { primaryColor } from '../../styles/Common';
import { GiarEn } from '../../images/web/index';
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
    lineHeight: 32 * 1.3,
    marginBottom: 16,
  },
  text: {
    fontSize: 20,
    color: primaryColor,
    lineHeight: 20 * 1.3,
  },
  image: {
    width: 400,
    height: 200,
    marginBottom: 16,
  },
});

const Correct = ({ isPcWidth }: Props): JSX.Element => {
  const renderLeft = (
    <>
      <Text style={styles.title}>{I18n.t('web.correctTitle')}</Text>
      <Text style={styles.text}>{I18n.t('web.correctText1')}</Text>
      <Text style={styles.text}>{I18n.t('web.correctText2')}</Text>
    </>
  );

  const renderRight = (
    <Image resizeMode="contain" style={styles.image} source={GiarEn} />
  );

  return (
    <WebTemplate
      leftTop
      isPcWidth={isPcWidth}
      renderLeft={renderLeft}
      renderRight={renderRight}
    />
  );
};

export default Correct;
