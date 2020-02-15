import React from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { FLogo } from '../../images';
import { fontSizeM, facebook } from '../../styles/Common';

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
    borderColor: facebook,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    color: facebook,
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
  logo: {
    position: 'absolute',
    left: 14,
    width: 26,
    height: 26,
  },
});

const FacebookButton: React.FC<Props> = ({
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
          <Image style={styles.logo} source={FLogo} />
          <Text style={styles.title}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default FacebookButton;
