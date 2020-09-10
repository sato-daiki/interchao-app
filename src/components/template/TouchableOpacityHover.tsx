import React, { useState } from 'react';
import { ViewStyle, StyleProp, TouchableOpacity } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  hoverStyle: StyleProp<ViewStyle>;
  onPress: () => void;
  children: React.ReactNode;
}

const TouchableOpacityHover: React.FC<Props> = ({
  style,
  hoverStyle,
  onPress,
  children,
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <TouchableOpacity
      style={[style, isHover ? hoverStyle : undefined]}
      // @ts-ignore
      onMouseEnter={(): void => setIsHover(true)}
      onMouseLeave={(): void => setIsHover(false)}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default TouchableOpacityHover;
