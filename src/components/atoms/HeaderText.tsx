import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { fontSizeM, mainColor } from '../../styles/Common';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
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
  containerStyle,
  title,
  onPress,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default HeaderText;
