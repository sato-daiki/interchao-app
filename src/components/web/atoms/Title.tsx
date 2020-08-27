import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { primaryColor, fontSizeLLLL } from '../../../styles/Common';
import { getSize } from '../../../utils/responsibleCss';

interface Props {
  text: string;
  isMobileDevice: boolean;
}

const styles = StyleSheet.create({
  title: {
    color: primaryColor,
    fontWeight: 'bold',
  },
});

const Title = ({ text, isMobileDevice = false }: Props): JSX.Element => {
  return (
    <Text
      style={[
        styles.title,
        {
          fontSize: getSize(isMobileDevice, fontSizeLLLL),
          lineHeight: getSize(isMobileDevice, fontSizeLLLL) * 1.3,
        },
      ]}
    >
      {text}
    </Text>
  );
};

export default Title;
