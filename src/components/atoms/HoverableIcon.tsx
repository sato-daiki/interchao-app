import React, { useState } from 'react';
import { ViewStyle, StyleProp, TouchableOpacity, View } from 'react-native';
import { mainColor, hoverMain, primaryColor } from '../../styles/Common';
import Icon, { IconType } from './Icon';

type Props = {
  style?: StyleProp<ViewStyle>;
  hoverStyle?: StyleProp<ViewStyle>;
  icon: IconType;
  name: string;
  size: number;
  hoverBorderRadius?: number;
  hoverPadding?: number;
  color?: string;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  onPress?: () => void;
};

// defautlはopacityの設定のみ
const HoverableIcon: React.FC<Props> = ({
  style,
  icon,
  name,
  size,
  color = primaryColor,
  hoverColor = mainColor,
  hoverBackgroundColor = hoverMain,
  hoverBorderRadius = 24,
  hoverPadding = 4,
  onPress,
  ...props
}) => {
  const [isHover, setIsHover] = useState(false);

  const touchableOpacityStyle = [
    {
      borderRadius: hoverBorderRadius,
      padding: hoverPadding,
    },
    style,
    isHover ? { backgroundColor: hoverBackgroundColor } : undefined,
  ];

  return onPress ? (
    <TouchableOpacity
      style={touchableOpacityStyle}
      // @ts-ignore
      onMouseEnter={(): void => setIsHover(true)}
      onMouseLeave={(): void => setIsHover(false)}
      onPress={onPress}
      {...props}
    >
      <Icon
        isHover={isHover}
        icon={icon}
        name={name}
        size={size}
        color={color}
        hoverColor={hoverColor}
      />
    </TouchableOpacity>
  ) : (
    // onPressがnullの時反応しないため
    <View
      style={touchableOpacityStyle}
      // @ts-ignore
      onMouseEnter={(): void => setIsHover(true)}
      onMouseLeave={(): void => setIsHover(false)}
      {...props}
    >
      <Icon
        isHover={isHover}
        icon={icon}
        name={name}
        size={size}
        color={color}
        hoverColor={hoverColor}
      />
    </View>
  );
};

export default HoverableIcon;
