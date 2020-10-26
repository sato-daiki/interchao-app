import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
} from '../../styles/Common';
import { Modal } from '../template';
import { WhiteButton, Space, SubmitButton } from '../atoms';
import { CheckTextInput } from '../molecules';
import I18n from '../../utils/I18n';

interface Props {
  visible: boolean;
  isLoading: boolean;
  isPasswordInput: boolean;
  password: string;
  errorMessage: string;
  onChangeText: (text: string) => void;
  onPressDelete1: () => void;
  onPressDelete2: () => void;
  onBlur: () => void;
  onPressClose: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    paddingBottom: 16,
    textAlign: 'center',
  },
  line: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
  },
  text: {
    textAlign: 'center',
    fontSize: fontSizeM,
    color: primaryColor,
    paddingBottom: 16,
  },
  button: {
    paddingHorizontal: 16,
  },
});

const ModalDeleteAcount: React.FC<Props> = ({
  visible,
  isPasswordInput,
  isLoading,
  password,
  errorMessage,
  onChangeText,
  onPressDelete1,
  onPressDelete2,
  onPressClose,
  onBlur,
}: Props): JSX.Element | null => {
  if (!isPasswordInput) {
    // 削除の最終確認
    return (
      <Modal visible={visible}>
        <View style={styles.container}>
          <Text style={styles.title}>{I18n.t('common.confirmation')}</Text>
          <View style={styles.line} />
          <Text style={styles.text}>{I18n.t('deleteAcount.confirmation')}</Text>
          <Space size={32} />
          <View style={styles.button}>
            <SubmitButton
              title={I18n.t('deleteAcount.withdrawal')}
              onPress={onPressDelete1}
            />
            <Space size={16} />
            <WhiteButton
              title={I18n.t('common.cancel')}
              onPress={onPressClose}
            />
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>{I18n.t('modalDeleteAcount.title')}</Text>
        <View style={styles.line} />
        <Text style={styles.text}>{I18n.t('modalDeleteAcount.text')}</Text>
        <CheckTextInput
          value={password}
          onChangeText={onChangeText}
          onBlur={onBlur}
          maxLength={20}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          secureTextEntry
          returnKeyType="done"
          errorMessage={errorMessage}
        />
        <Space size={32} />
        <View style={styles.button}>
          <SubmitButton
            isLoading={isLoading}
            title={I18n.t('modalDeleteAcount.button')}
            onPress={onPressDelete2}
          />
          <Space size={16} />
          <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalDeleteAcount;
