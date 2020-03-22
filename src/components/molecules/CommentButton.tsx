import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fontSizeM, mainColor } from '../../styles/Common';

interface Props {
  onPressAdd: () => void;
  onPressCancel: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancel: {
    fontSize: fontSizeM,
    color: mainColor,
  },
  add: {
    fontSize: fontSizeM,
    color: mainColor,
    fontWeight: 'bold',
  },
});

const CommentButton: React.FC<Props> = ({ onPressAdd, onPressCancel }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressCancel}>
        <Text style={styles.cancel}>キャンセル</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressAdd}>
        <Text style={styles.add}>追加</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentButton;
