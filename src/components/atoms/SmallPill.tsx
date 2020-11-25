import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { fontSizeS } from '@/styles/Common';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
  backgroundColor: string;
  color: string;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
  },
  text: {
    fontSize: fontSizeS,
    color: '#fff',
  },
});

const SmallPill: React.FC<Props> = ({
  containerStyle,
  text,
  color,
  backgroundColor,
}) => {
  return (
    <View style={[styles.container, containerStyle, { backgroundColor }]}>
      <Text style={[styles.text, { color }]}>{text}</Text>
    </View>
  );
};

export default React.memo(SmallPill);
