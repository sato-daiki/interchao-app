import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { fontSizeM, mainColor } from '../../styles/Common';
import { getEachOS } from '../../utils/common';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getEachOS({ ios: 0, android: 16, web: 16 }),
  },
  title: {
    color: mainColor,
    fontSize: fontSizeM,
  },
});

const HeaderLeft: React.FC<Props> = ({
  containerStyle,
  text,
  onPress,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      <Text style={styles.title}>{text}</Text>
    </TouchableOpacity>
  );
};

export default HeaderLeft;
