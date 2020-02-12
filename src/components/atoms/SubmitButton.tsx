import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { mainColor, fontSizeM } from '../../styles/Common';

interface Props {
  title: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  contaner: {
    borderRadius: 22,
    backgroundColor: mainColor,
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

const SubmitButton: React.FC<Props> = ({
  title,
  onPress,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity style={styles.contaner} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
