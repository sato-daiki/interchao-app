import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { primaryColor } from '../../styles/Common';
import { EntryEn, CommentEn, SummaryEn } from '../../images/web/index';
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
  titleDetail: {
    fontSize: 20,
    color: primaryColor,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textDetail: {
    fontSize: 16,
    color: primaryColor,
    lineHeight: 16 * 1.3,
    marginBottom: 8,
  },
  image: {
    width: 320,
    height: 200,
    marginBottom: 16,
  },
  paddingBottom0: {
    paddingBottom: 0,
  },
  paddingHorizontal0: {
    paddingHorizontal: 0,
  },
});

const Example = ({ isPcWidth }: Props): JSX.Element => {
  const renderTopCenter = (
    <>
      <Text style={styles.title}>{I18n.t('web.exampleTitle')}</Text>
      <Text style={styles.text}>{I18n.t('web.exampleText')}</Text>
    </>
  );

  const renderLeft = (
    <>
      <Text style={styles.titleDetail}>
        {I18n.t('web.exampleDetailTitle1')}
      </Text>
      <Text style={styles.textDetail}>{I18n.t('web.exampleDetailText1')}</Text>
      <Image resizeMode="contain" source={EntryEn} style={styles.image} />
    </>
  );

  const renderCenter = (
    <>
      <Text style={styles.titleDetail}>
        {I18n.t('web.exampleDetailTitle2')}
      </Text>
      <Text style={styles.textDetail}>{I18n.t('web.exampleDetailText2')}</Text>
      <Image resizeMode="contain" source={CommentEn} style={styles.image} />
    </>
  );

  const renderRight = (
    <>
      <Text style={styles.titleDetail}>
        {I18n.t('web.exampleDetailTitle3')}
      </Text>
      <Text style={styles.textDetail}>{I18n.t('web.exampleDetailText3')}</Text>
      <Image resizeMode="contain" source={SummaryEn} style={styles.image} />
    </>
  );

  return (
    <>
      <WebTemplate
        leftTop
        isPcWidth={isPcWidth}
        renderCenter={renderTopCenter}
        container={{ paddingBottom: 0 }}
      />
      <WebTemplate
        leftTop
        isPcWidth={isPcWidth}
        renderLeft={renderLeft}
        renderCenter={renderCenter}
        renderRight={renderRight}
        leftContainer={styles.paddingBottom0}
        centerContainer={styles.paddingHorizontal0}
        rightContainer={styles.paddingHorizontal0}
      />
    </>
  );
};

export default Example;
