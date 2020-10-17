import React from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { mainColor, fontSizeM } from '../../styles/Common';
import Hoverable from './Hoverable';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  disable?: boolean;
  backgroundColor?: string;
  titleColor?: string;
  title: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  contaner: {
    borderRadius: 8,
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

const SmallButtonSubmit: React.FC<Props> = ({
  containerStyle,
  isLoading = false,
  disable = false,
  title,
  onPress,
  backgroundColor = mainColor,
  titleColor = '#fff',
}: Props): JSX.Element => {
  return (
    <Hoverable
      style={[styles.contaner, containerStyle, { backgroundColor }]}
      activeOpacity={isLoading || disable ? 1 : 0.2}
      onPress={isLoading || disable ? undefined : onPress}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      )}
    </Hoverable>
  );
};

export default React.memo(SmallButtonSubmit);
