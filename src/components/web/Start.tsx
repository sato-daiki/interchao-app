import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { primaryColor } from '../../styles/Common';
import { Zenny } from '../../images/web/index';
import { WebTemplate } from '.';

interface Props {
  isPcWidth: boolean;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: primaryColor,
    fontWeight: 'bold',
    marginBottom: 8,
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
      <Text style={styles.title}>Start by writing a journalentry for free</Text>
      <Text style={styles.text}>
        By registering for a free account, you can receive 100 pts (10 journal
        entry’s worth). Hurry and write a journal entry so you can have it
        corrected!
      </Text>
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
