import { DayComponentProps } from '@/components/molecules/Calendar';
import { borderLightColor } from '@/styles/Common';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = DayComponentProps & {
  today: Date;
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: borderLightColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftColor: borderLightColor,
    borderLeftWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
  },
});

export const Day: React.FC<Props> = React.memo(
  ({ date, today, onPress, state, marking }) => {
    console.log('marking', marking);
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: 'center',
            color: state === 'disabled' ? 'gray' : 'black',
          }}
        >
          {date.day}
        </Text>
        <Text>{marking.marked ? 'marcu' : ''}</Text>
      </View>
    );
  }
);
