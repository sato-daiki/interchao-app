import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { primaryColor } from '../../styles/Common';
import { Giar } from '../../images/web/index';
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
  chatText: {
    fontSize: 18,
    color: primaryColor,
    lineHeight: 18 * 1.3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 16,
  },
  textContainer: {
    flex: 1,
  },
});

const WhyIs = ({ isPcWidth }: Props): JSX.Element => {
  const renderLeft = (
    <>
      <Text style={styles.title}>Why is it necessary to write?</Text>
      <Text style={styles.text}>
        Writing is the optimal language learning method
      </Text>
    </>
  );

  const renderRight = (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <Text style={styles.chatText}>「最近調子はどうですか？」</Text>
        <Text style={styles.chatText}>「絶好調です。あなたは？」</Text>
        <Text style={styles.chatText}>
          「元気です...(Oh no, I can’t keep the conversation going...)」
        </Text>
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
