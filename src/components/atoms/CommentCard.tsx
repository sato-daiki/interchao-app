import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
  mainColor,
} from '../../styles/Common';
import { TotalStatus, ProfileIconVertical } from '.';
import { getDiaryStatus, getPostDay } from '../../utils/diary';
import firebase from '../../configs/firebase';
import { Commment } from '../../types';

interface Props {
  title: string;
  text: string;
  borderColor: string;
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
  },
  title: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    color: primaryColor,
    paddingBottom: 16,
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

const CommentCard = ({ title, text, borderColor }: Props): JSX.Element => {
  return (
    <View style={[styles.container, { borderColor }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default CommentCard;
