import React, { useState, useCallback } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { mainColor } from '../../styles/Common';
import { Space } from '../atoms';
import { CommentButton, CommentInputIOS } from '../molecules';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  original: string;
  onPressSubmit: (fix: string, detail: string) => void;
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

const CommentInputCardIOS: React.FC<Props> = ({
  containerStyle,
  original,
  onPressSubmit,
  onPressClose,
}) => {
  const [fix, setFix] = useState(''); // 新規追加時の修正文
  const [detail, setDetail] = useState(''); // 新規追加時のコメント

  const clear = useCallback(() => {
    setFix('');
    setDetail('');
  }, []);

  const onPressCancel = useCallback(() => {
    onPressClose();
    clear();
  }, [clear, onPressClose]);

  const onPressAdd = useCallback(() => {
    onPressSubmit(fix, detail);
    clear();
  }, [onPressSubmit, fix, detail, clear]);

  return (
    <View style={[styles.container, containerStyle]}>
      <CommentInputIOS
        original={original}
        fix={fix}
        detail={detail}
        onChangeTextFix={(text: string): void => setFix(text)}
        onChangeTextDetail={(text: string): void => setDetail(text)}
      />
      <Space size={16} />
      <CommentButton onPressAdd={onPressAdd} onPressCancel={onPressCancel} />
    </View>
  );
};

export default CommentInputCardIOS;