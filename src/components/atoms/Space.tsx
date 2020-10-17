import React from 'react';
import { View } from 'react-native';

interface Props {
  size: number;
}

const Space: React.FC<Props> = ({ size }: Props): JSX.Element => {
  return <View style={{ paddingBottom: size }} />;
};

export default React.memo(Space);
