import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Modal from 'react-native-modal';
import ModalWeb from 'modal-enhanced-react-native-web';
import { Animation, CustomAnimation } from 'react-native-animatable';
import { maxModal } from '../../styles/Common';

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
    backgroundColor: '#fff',
  },
  modal: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  padding0: {
    paddingVertical: 8,
  },
  padding32: {
    paddingVertical: 32,
  },
});

interface Props {
  visible: boolean;
  disablePadding?: boolean;
  animationIn?: Animation | CustomAnimation;
  animationOut?: Animation | CustomAnimation;
  children: React.ReactNode;
}

const Modal1: React.FC<Props> = ({
  visible,
  disablePadding,
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
          <View
            style={[
              styles.modalWeb,
              disablePadding ? styles.padding0 : styles.padding32,
            ]}
          >
            {children}
          </View>
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
