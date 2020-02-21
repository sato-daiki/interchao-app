import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { mainColor, fontSizeM } from '../../styles/Common';

interface Props {
  isLoading?: boolean;
  disable?: boolean;
  title: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  contaner: {
    borderRadius: 22,
    borderColor: mainColor,
    borderWidth: 1,
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
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

export default WhiteButton;
