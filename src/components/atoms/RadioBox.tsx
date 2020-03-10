import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { mainColor } from '../../styles/Common';

interface Props {
  checked: boolean;
  color: string;
}

const styles = StyleSheet.create({
  container: {
    // 初期値で高さを指定しておかないとぱらつく
    height: 24,
  },
});

const RadioBox: React.FC<Props> = ({
  checked,
  color = mainColor,
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        size={24}
        color={color}
        name={checked ? 'radiobox-marked' : 'radiobox-blank'}
      />
    </View>
  );
};

export default RadioBox;
