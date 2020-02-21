import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    width: width - 16,
  },
});

interface Props {
  visible: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({
  visible,
  children,
}: Props): JSX.Element | null => {
  return visible ? (
    <View style={styles.overlay}>
      <View style={styles.modal}>{children}</View>
    </View>
  ) : null;
};

export default Modal;
