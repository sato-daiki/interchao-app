import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { fontSizeS } from '../../styles/Common';

interface Props {
  color: string;
  text: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  text: {
    fontSize: fontSizeS,
  },
});

const TotalStatus: React.FC<Props> = ({ color, text }: Props): JSX.Element => (
  <View style={styles.container}>
    <View style={[styles.circle, { backgroundColor: color }]} />
    <Text style={[styles.text, { color }]}>{text}</Text>
  </View>
);

export default TotalStatus;
