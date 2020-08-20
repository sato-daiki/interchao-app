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
    backgroundColor: mainColor,
    width: '100%',
    maxWidth: 600,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    color: '#fff',
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

const SubmitButton: React.FC<Props> = ({
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
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default SubmitButton;
