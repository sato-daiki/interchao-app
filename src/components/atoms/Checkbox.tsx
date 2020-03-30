import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mainColor } from '../../styles/Common';

interface Props {
  checked: boolean;
  color?: string;
  onPress: () => void;
}

const Checkbox: React.FC<Props> = ({
  checked,
  color = mainColor,
  onPress,
}: Props): JSX.Element => {
  if (!checked) {
    return (
      <MaterialCommunityIcons
        size={28}
        color={color}
        name="checkbox-blank-outline"
        onPress={onPress}
      />
    );
  }
  return (
    <MaterialCommunityIcons
      size={28}
      color={color}
      name="checkbox-marked"
      onPress={onPress}
    />
  );
};

export default Checkbox;
