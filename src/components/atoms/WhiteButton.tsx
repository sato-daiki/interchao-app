import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { fontSizeM, maxButtonWidth, mainColor } from '../../styles/Common';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  disable?: boolean;
  title: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  contaner: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: mainColor,
    width: '100%',
    maxWidth: maxButtonWidth,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    color: mainColor,
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

const WhiteButton: React.FC<Props> = ({
  isLoading = false,
  disable = false,
  title,
  onPress,
  containerStyle,
  textStyle,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity
      style={[styles.contaner, containerStyle]}
      activeOpacity={isLoading || disable ? 1 : 0.2}
      onPress={isLoading || disable ? undefined : onPress}
    >
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text style={[styles.title, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default WhiteButton;
