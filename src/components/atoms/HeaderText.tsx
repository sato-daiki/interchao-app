import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fontSizeM, mainColor } from '../../styles/Common';

interface Props {
  title: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  title: {
    color: mainColor,
    fontSize: fontSizeM,
  },
});

const HeaderText: React.FC<Props> = ({
  title,
  onPress,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default HeaderText;
