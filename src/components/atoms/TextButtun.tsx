import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { mainColor, fontSizeM, borderLightColor } from '../../styles/Common';

interface Props {
  isLoading?: boolean;
  disable?: boolean;
  title: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  contaner: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    backgroundColor: '#fff',
    borderColor: borderLightColor,
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: {
    color: mainColor,
    fontSize: fontSizeM,
  },
});

const TextButtun: React.FC<Props> = ({
  isLoading = false,
  disable = false,
  title,
  onPress,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.contaner}
      activeOpacity={isLoading || disable ? 1 : 0.2}
      onPress={isLoading || disable ? undefined : onPress}
    >
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default TextButtun;
