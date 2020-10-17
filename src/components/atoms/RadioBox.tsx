import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { mainColor, fontSizeM, primaryColor } from '../../styles/Common';

interface Props {
  checked: boolean;
  color: string;
  text: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioBoxText: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingLeft: 4,
  },
});

const RadioBox: React.FC<Props> = ({
  checked,
  color = mainColor,
  text,
  onPress,
}: Props): JSX.Element => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          size={24}
          color={color}
          name={checked ? 'radiobox-marked' : 'radiobox-blank'}
        />
        <Text style={styles.radioBoxText}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(RadioBox);
