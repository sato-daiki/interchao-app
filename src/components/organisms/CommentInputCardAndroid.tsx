import React, { useState, useCallback } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { mainColor } from '../../styles/Common';
import { Space } from '../atoms';
import { CommentButton, CommentInputAndroid } from '../molecules';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  onPressSubmit: (original: string, fix: string, detail: string) => void;
  onPressClose: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: mainColor,
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 9,
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
});

const CommentInputCardAndroid: React.FC<Props> = ({
  containerStyle,
  onPressSubmit,
  onPressClose,
}) => {
  const [original, setOriginal] = useState(''); // 新規追加時原文
  const [fix, setFix] = useState(''); // 新規追加時の修正文
  const [detail, setDetail] = useState(''); // 新規追加時のコメント

  const clear = useCallback(() => {
    setOriginal('');
    setFix('');
    setDetail('');
  }, []);

  const onPressCancel = useCallback(() => {
    onPressClose();
    clear();
  }, [clear, onPressClose]);

  const onPressAdd = useCallback(() => {
    onPressSubmit(original, fix, detail);
    clear();
  }, [onPressSubmit, original, fix, detail, clear]);

  return (
    <View style={[styles.container, containerStyle]}>
      <CommentInputAndroid
        original={original}
        fix={fix}
        detail={detail}
        onChangeTextOriginal={(text: string): void => setOriginal(text)}
        onChangeTextFix={(text: string): void => setFix(text)}
        onChangeTextDetail={(text: string): void => setDetail(text)}
      />
      <Space size={16} />
      <CommentButton onPressAdd={onPressAdd} onPressCancel={onPressCancel} />
    </View>
  );
};

export default CommentInputCardAndroid;
