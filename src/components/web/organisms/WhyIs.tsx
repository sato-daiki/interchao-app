import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { primaryColor } from '../../../styles/Common';
import { Giar, Pen } from '../../../images/web';
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
  },
  chatText: {
    fontSize: 18,
    color: primaryColor,
    lineHeight: 18 * 1.3,
  },
  rowChat: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 16,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 8,
  },
});

const WhyIs = ({ isPcWidth }: Props): JSX.Element => {
  const renderLeft = (
    <>
      <View style={styles.row}>
        <Image source={Pen} resizeMode="contain" style={styles.icon} />
        <Text style={styles.title}>{I18n.t('web.whyTitle')}</Text>
      </View>
      <Text style={styles.text}>{I18n.t('web.whyText')}</Text>
    </>
  );

  const renderRight = (
    <View style={styles.rowChat}>
      <View style={styles.textContainer}>
        <Text style={styles.chatText}>{I18n.t('web.whyCnatText1')}</Text>
        <Text style={styles.chatText}>{I18n.t('web.whyCnatText2')}</Text>
        <Text style={styles.chatText}>{I18n.t('web.whyCnatText3')}</Text>
      </View>
      <View>
        <Image
          resizeMode="cover"
          style={{
            width: isPcWidth ? 150 : 75,
            height: isPcWidth ? 150 : 75,
          }}
          source={Giar}
        />
      </View>
    </View>
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

export default WhyIs;
