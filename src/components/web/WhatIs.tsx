import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { primaryColor } from '../../styles/Common';
import { CorrectEn } from '../../images/web/index';
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
  image: {
    width: 300,
    height: 300,
  },
});

const WhatIs = ({ isPcWidth }: Props): JSX.Element => {
  const renderLeft = (
    <Image resizeMode="contain" style={styles.image} source={CorrectEn} />
  );

  const renderRight = (
    <>
      <Text style={styles.title}>What is Interchao?</Text>
      <Text style={styles.text}>
        Interchao is a free, interactive language learning app for Japanese,
        English, Chinese, and Korean learners.
      </Text>
      <Text style={styles.text}>
        Your journal entry will be read and marked by native speakers. Let’s
        mark others’ journal entry as a native teacher as a return!
      </Text>
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
