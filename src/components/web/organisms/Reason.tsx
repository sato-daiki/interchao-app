import React from 'react';
import { StyleSheet, Text, View, Image, ViewProps } from 'react-native';
import { primaryColor } from '../../../styles/Common';
import { Zebra } from '../../../images/web/index';
import WebTemplate from '../template/WebTemplate';
import I18n from '../../../utils/I18n';

interface Props {
  isMaxLayoutChange: boolean;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: primaryColor,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textContainer: {
    marginBottom: 32,
  },
  text: {
    fontSize: 16,
    color: primaryColor,
    lineHeight: 16 * 1.3,
    marginBottom: 2,
  },
  image: {
    width: 300,
    height: 300,
  },
});

const Reason = ({ isMaxLayoutChange }: Props): JSX.Element => {
  const renderLeft = (
    <Image resizeMode="contain" style={styles.image} source={Zebra} />
  );

  const textContainer = [
    styles.textContainer,
    { alignSelf: isMaxLayoutChange ? 'flex-start' : 'center' },
    { textAlign: isMaxLayoutChange ? 'left' : 'center' },
  ] as ViewProps;

  const renderRight = (
    <>
      <View style={textContainer}>
        <Text style={styles.title}>{I18n.t('web.reasonTitle1')}</Text>
        <Text style={styles.text}>{I18n.t('web.reasonText11')}</Text>
        <Text style={styles.text}>{I18n.t('web.reasonText12')}</Text>
      </View>

      <View style={textContainer}>
        <Text style={styles.title}>{I18n.t('web.reasonTitle2')}</Text>
        <Text style={styles.text}>{I18n.t('web.reasonText21')}</Text>
        <Text style={styles.text}>{I18n.t('web.reasonText22')}</Text>
      </View>

      <View style={textContainer}>
        <Text style={styles.title}>{I18n.t('web.reasonTitle3')}</Text>
        <Text style={styles.text}>{I18n.t('web.reasonText31')}</Text>
        <Text style={styles.text}>{I18n.t('web.reasonText32')}</Text>
      </View>
    </>
  );

  return (
    <WebTemplate
      leftTop={false}
      isMaxLayoutChange={isMaxLayoutChange}
      renderLeft={renderLeft}
      renderRight={renderRight}
    />
  );
};

export default Reason;
