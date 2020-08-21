import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import Modal from 'react-native-modal';
import ModalWeb from 'modal-enhanced-react-native-web';
import { maxModal } from '../../styles/Common';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  modalWeb: {
    width: '100%',
    maxWidth: maxModal,
    alignSelf: 'center',
    borderRadius: 8,
    marginHorizontal: 8,
    paddingVertical: 32,
    backgroundColor: '#fff',
  },
  modal: {
    width: width - 16,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#fff',
  },
});

interface Props {
  visible: boolean;
  animationIn?: any;
  animationOut?: any;
  children: React.ReactNode;
}

const Modal1: React.FC<Props> = ({
  visible,
  animationIn = 'zoomIn',
  animationOut = 'zoomOut',
  children,
}: Props): JSX.Element | null => {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <ModalWeb
          isVisible={visible}
          animationIn={animationIn}
          animationOut={animationOut}
        >
          <View style={styles.modalWeb}>{children}</View>
        </ModalWeb>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Modal
        isVisible={visible}
        animationIn={animationIn}
        animationOut={animationOut}
      >
        <View style={styles.modal}>{children}</View>
      </Modal>
    </View>
  );
};

export default Modal1;
