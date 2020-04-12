import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

interface Props {
  visible: boolean;
  isLoading: boolean;
  password: string;
  errorMessage: string;
  onChangeText: (text: string) => void;
  onEndEditing: () => void;
  onPressSubmit: () => void;
  onPressClose: () => void;
}

const ModalDeleteAcount: React.FC<Props> = ({
  visible,
  isLoading,
  password,
  errorMessage,
  onChangeText,
  onEndEditing,
  onPressSubmit,
  onPressClose,
}: Props): JSX.Element | null => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>{I18n.t('modalDeleteAcount.title')}</Text>
        <View style={styles.line} />
        <Text style={styles.text}>{I18n.t('modalDeleteAcount.text')}</Text>
        <CheckTextInput
          value={password}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
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
            onPress={onPressSubmit}
          />
          <Space size={16} />
          <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalDeleteAcount;
