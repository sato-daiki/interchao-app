import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { mainColor } from '../../styles/Common';

interface Props {
  checked: boolean;
  onPress: () => void;
}

const Checkbox: React.FC<Props> = ({
  checked,
  onPress,
}: Props): JSX.Element => {
  if (checked) {
    return (
      <MaterialCommunityIcons
        size={28}
        color={mainColor}
        name="checkbox-blank-outline"
        onPress={onPress}
      />
    );
  }
  return (
    <MaterialCommunityIcons
      size={28}
      color={mainColor}
      name="checkbox-marked"
      onPress={onPress}
    />
  );
};

export default Checkbox;
