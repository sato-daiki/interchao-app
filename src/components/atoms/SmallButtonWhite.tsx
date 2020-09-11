import React from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import { mainColor, fontSizeM } from '../../styles/Common';
import Hoverable from './Hoverable';

interface Props {
  isLoading?: boolean;
  disable?: boolean;
  color?: string;
  title: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  contaner: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

const SmallButtonWhite: React.FC<Props> = ({
  isLoading = false,
  disable = false,
  color = mainColor,
  title,
  onPress,
}: Props): JSX.Element => {
  return (
    <Hoverable
      style={[styles.contaner, { borderColor: color }]}
      activeOpacity={isLoading || disable ? 1 : 0.2}
      onPress={isLoading || disable ? undefined : onPress}
    >
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text style={[styles.title, { color }]}>{title}</Text>
      )}
    </Hoverable>
  );
};

export default SmallButtonWhite;
