import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, mainColor, primaryColor } from '../../styles/Common';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  name?: string;
  text?: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  title: {
    color: mainColor,
    fontSize: fontSizeM,
  },
});

const HeaderRight: React.FC<Props> = ({
  containerStyle,
  name,
  text,
  onPress,
}: Props): JSX.Element => {
  if (name) {
    return (
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons size={28} color={primaryColor} name={name} />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Text style={styles.title}>{text}</Text>
    </TouchableOpacity>
  );
};

export default HeaderRight;
