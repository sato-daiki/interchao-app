import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { primaryColor } from '../../styles/Common';
import { GiarEn } from '../../images/web/index';
import { WebTemplate } from '.';

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
    marginBottom: 2,
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
      <Text style={styles.title}>Correct entries to get points</Text>
      <Text style={styles.text}>
        Mark a journal entry in your native language and get 10 points.
      </Text>
      <Text style={styles.text}>
        Use the points for writing your own journal entry!
      </Text>
    </>
  );

  const renderRight = (
    <>
      <Image resizeMode="contain" style={styles.image} source={GiarEn} />
      <Text style={styles.titleDetail}>
        The system works by allowingyour work to be checkedafter you check
        others’
      </Text>
      <Text style={styles.textDetail}>
        The journal entries you write will be corrected by native speakers!
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

export default Correct;
