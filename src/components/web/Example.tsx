import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { primaryColor } from '../../styles/Common';
import { EntryEn, CommentEn, SummaryEn } from '../../images/web/index';
import { WebTemplate } from '.';

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
});

const Example = ({ isPcWidth }: Props): JSX.Element => {
  const renderTopCenter = (
    <>
      <Text style={styles.title}>Example of a Correction</Text>
      <Text style={styles.text}>Take a look at an actual example.</Text>
    </>
  );

  const renderLeft = (
    <>
      <Text style={styles.titleDetail}>Your Journal Entry</Text>
      <Text style={styles.textDetail}>Hurry up and publish an entry.</Text>
      <Image resizeMode="contain" source={EntryEn} style={styles.image} />
    </>
  );

  const renderCenter = (
    <>
      <Text style={styles.titleDetail}>Correction Results</Text>
      <Text style={styles.textDetail}>Hurry up and publish an entry.</Text>
      <Image resizeMode="contain" source={CommentEn} style={styles.image} />
    </>
  );

  const renderRight = (
    <>
      <Text style={styles.titleDetail}>General Comments on the Entry</Text>
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
        leftContainer={{ paddingHorizontal: 0 }}
        centerContainer={{ paddingHorizontal: 0 }}
        rightContainer={{ paddingHorizontal: 0 }}
      />
    </>
  );
};

export default Example;
