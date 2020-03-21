import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  mainColor,
} from '../../styles/Common';

interface Props {
  index: number;
  original: string;
  fix: string;
  detail: string;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 9,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderColor: mainColor,
  },
  origin: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    color: primaryColor,
    paddingBottom: 16,
  },
  index: {
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 4,
  },
  line: {
    alignSelf: 'center',
    width: '100%',
    marginHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  text: {
    paddingTop: 16,
    fontSize: fontSizeM,
    color: primaryColor,
  },
});

const CommentCard = ({ index, original, fix, detail }: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.original}>
        <Text style={styles.index}>{index}</Text>
        {original}
      </Text>
      <View style={styles.line} />
      <Text style={styles.fix}>{fix}</Text>
      <Text style={styles.detail}>{detail}</Text>
    </View>
  );
};

export default CommentCard;
