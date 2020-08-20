import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { primaryColor } from '../../styles/Common';
import { Zebra } from '../../images/web/index';
import { WebTemplate } from '.';

interface Props {
  isPcWidth: boolean;
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

const Reason = ({ isPcWidth }: Props): JSX.Element => {
  const renderLeft = (
    <Image resizeMode="contain" style={styles.image} source={Zebra} />
  );

  const renderRight = (
    <>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          You can’t speak more than what you can write
        </Text>
        <Text style={styles.text}>
          You can’t talk what you cannot pen down.
        </Text>
        <Text style={styles.text}>Writing is a training for speaking.</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Make your articles checked by native speakers
        </Text>
        <Text style={styles.text}>
          Since you have written down something, you want to know if there were
          mistakes.
        </Text>
        <Text style={styles.text}>
          Are the words and grammar correct? Are you making sense? Let’s have
          your articles checked by native speakers!
        </Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Write in your own words</Text>
        <Text style={styles.text}>
          Textbooks and scripts from movies are sometimes not applicable in our
          daily life.
        </Text>
        <Text style={styles.text}>
          Through outputting something in your own words, you are able to learn
          in a practical way.
        </Text>
      </View>
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

export default Reason;
