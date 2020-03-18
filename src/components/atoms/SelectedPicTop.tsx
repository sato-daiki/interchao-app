import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { pinBlue } from '../../styles/Common';

interface Props {
  isStart: boolean;
  onGestureEvent: (event: PanGestureHandlerGestureEvent) => void;
  // onHandlerStateChange: (event: PanGestureHandlerStateChangeEvent) => void;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignContent: 'flex-start',
    top: -6,
    zIndex: 1,
  },
  cicleTop: {
    left: -4,
    backgroundColor: pinBlue,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stick: {
    left: -1,
    width: 1.5,
    height: 16,
    backgroundColor: pinBlue,
  },
});

const SelectedPicTop: React.FC<Props> = ({
  isStart,
  onGestureEvent,
}: // onHandlerStateChange,
Props): JSX.Element => {
  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      // onHandlerStateChange={onHandlerStateChange}
    >
      {isStart ? (
        <View style={styles.container}>
          <View style={styles.cicleTop} />
          <View style={styles.stick} />
        </View>
      ) : (
        <View />
      )}
    </PanGestureHandler>
  );
};

export default SelectedPicTop;
