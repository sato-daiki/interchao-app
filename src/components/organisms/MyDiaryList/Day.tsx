import { Hoverable } from '@/components/atoms';
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
    height: 50,
    paddingVertical: 4,
    padding: 8,
    alignItems: 'center',
  },
  day: {
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {},
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  hover: {
    backgroundColor: hoverGray,
  },
});

export const Day: React.FC<Props> = React.memo(
  ({ date, today, onPress, state, marking }) => {
    const onPressItem = React.useCallback(() => onPress(date), [date, onPress]);

    return (
      <Hoverable
        style={styles.container}
        hoverStyle={styles.hover}
        onPress={onPressItem}
      >
        <Text style={styles.day}>{date.day}</Text>
        {marking.marked ? (
          <View style={[styles.circle, { backgroundColor: marking.color }]} />
        ) : null}
      </Hoverable>
    );
  }
);
