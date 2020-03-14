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
        <Text style={styles.title}>退会確定処理</Text>
        <View style={styles.line} />
        <Text style={styles.text}>
          パスワードを入力して確定ボタンを押してください。
        </Text>
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
            title="退会する"
            onPress={onPressSubmit}
          />
          <Space size={16} />
          <WhiteButton title="キャンセル" onPress={onPressClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalDeleteAcount;
