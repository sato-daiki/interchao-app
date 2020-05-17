import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fontSizeM, mainColor } from '../../styles/Common';
import I18n from '../../utils/I18n';

interface Props {
  onPressAdd: () => void;
  onPressCancel: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 16,
  },
  touchSpaceAdd: {
    position: 'absolute',
    top: -16,
    left: -10,
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  touchSpaceCancel: {
    position: 'absolute',
    top: -16,
    right: -10,
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  add: {
    fontSize: fontSizeM,
    color: mainColor,
    fontWeight: 'bold',
  },
  cancel: {
    fontSize: fontSizeM,
    color: mainColor,
  },
});

const CommentButton: React.FC<Props> = ({ onPressAdd, onPressCancel }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressCancel} style={styles.touchSpaceAdd}>
        <Text style={styles.cancel}>{I18n.t('common.cancel')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressAdd} style={styles.touchSpaceCancel}>
        <Text style={styles.add}>{I18n.t('common.add')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentButton;
