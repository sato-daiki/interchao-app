import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  fontSizeS,
  primaryColor,
  subTextColor,
  fontSizeM,
} from '../../styles/Common';
import { Points } from '../../images';

interface Props {
  points: number;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 24,
    height: 24,
    tintColor: primaryColor,
    marginBottom: 2,
  },
  label: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingLeft: 4,
    paddingRight: 16,
  },
  points: {
    fontSize: fontSizeM,
    color: primaryColor,
  },
});

const UserPointsBig: React.FC<Props> = ({ points }: Props): JSX.Element => {
  const text = `${points}P`;
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={Points} />
      <Text style={styles.label}>現在のポイント</Text>
      <Text style={styles.points}>{text}</Text>
    </View>
  );
};

export default UserPointsBig;
