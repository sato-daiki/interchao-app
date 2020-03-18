import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { pinBlue } from '../../styles/Common';

interface Props {
  isEnd: boolean;
  onGestureEvent: (event: PanGestureHandlerGestureEvent) => void;
  // onHandlerStateChange: (event: PanGestureHandlerStateChangeEvent) => void;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    right: -7,
    // bottom: -7,
  },
  cicleBottom: {
    right: 3.5,
    backgroundColor: pinBlue,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stick: {
    width: 1.5,
    height: 16,
    backgroundColor: pinBlue,
  },
});

const SelectedPicBottom: React.FC<Props> = ({
  isEnd,
  onGestureEvent,
}: // onHandlerStateChange,
Props): JSX.Element => {
  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      // onHandlerStateChange={onHandlerStateChange}
    >
      {isEnd ? (
        <View style={styles.container}>
          <View style={styles.stick} />
          <View style={styles.cicleBottom} />
        </View>
      ) : (
        <View />
      )}
    </PanGestureHandler>
  );
};

export default SelectedPicBottom;
