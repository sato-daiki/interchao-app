import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { primaryColor } from '../../../styles/Common';
import { PointGet } from '../../../images/web/index';
import WebTemplate from '../template/WebTemplate';
import I18n from '../../../utils/I18n';
import { getImage } from '../../../utils/web';

interface Props {
  isPcWidth: boolean;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 32,
    color: primaryColor,
    fontWeight: 'bold',
    lineHeight: 32 * 1.3,
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
      <View style={styles.row}>
        <Image source={PointGet} resizeMode="contain" style={styles.icon} />
        <Text style={styles.title}>{I18n.t('web.correctTitle')}</Text>
      </View>
      <Text style={styles.text}>{I18n.t('web.correctText1')}</Text>
      <Text style={styles.text}>{I18n.t('web.correctText2')}</Text>
    </>
  );

  const source = getImage('girl');
  const renderRight = source ? (
    <Image resizeMode="contain" style={styles.image} source={source} />
  ) : (
    <View />
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
