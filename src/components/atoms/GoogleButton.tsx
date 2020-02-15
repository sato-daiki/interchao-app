import React from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { GLogo } from '../../images';
import { fontSizeM, primaryColor } from '../../styles/Common';

interface Props {
  title: string;
  isLoading?: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  contaner: {
    borderRadius: 22,
    width: '100%',
    borderWidth: 1,
    borderColor: primaryColor,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
  logo: {
    position: 'absolute',
    left: 16,
    width: 22,
    height: 22,
  },
});

const GoogleButton: React.FC<Props> = ({
  isLoading = false,
  title,
  onPress,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.contaner}
      onPress={isLoading ? undefined : onPress}
    >
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <>
          <Image style={styles.logo} source={GLogo} />
          <Text style={styles.title}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default GoogleButton;
