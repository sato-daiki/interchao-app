import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { primaryColor } from '../../../styles/Common';
import { Zenny, Note } from '../../../images/web/index';
import WebTemplate from '../template/WebTemplate';
import I18n from '../../../utils/I18n';

interface Props {
  isPcWidth: boolean;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 2,
  },
  image: {
    width: 300,
    height: 300,
  },
});

const Start = ({ isPcWidth }: Props): JSX.Element => {
  const renderRight = (
    <Image resizeMode="contain" style={styles.image} source={Zenny} />
  );

  const renderLeft = (
    <>
      <View style={styles.row}>
        <Image source={Note} resizeMode="contain" style={styles.icon} />
        <Text style={styles.title}>{I18n.t('web.startTitle')}</Text>
      </View>
      <Text style={styles.text}>{I18n.t('web.startText')}</Text>
    </>
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

export default Start;
