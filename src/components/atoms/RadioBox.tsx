import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { mainColor } from '../../styles/Common';

interface Props {
  checked: boolean;
  color: string;
}

const RadioBox: React.FC<Props> = ({
  checked,
  color = mainColor,
}: Props): JSX.Element => {
  return (
    <MaterialCommunityIcons
      size={24}
      color={color}
      name={checked ? 'radiobox-marked' : 'radiobox-blank'}
    />
  );
};

export default RadioBox;
