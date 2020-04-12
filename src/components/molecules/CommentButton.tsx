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
        <Text style={styles.cancel}>{I18n.t('common.cancel')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressAdd}>
        <Text style={styles.add}>{I18n.t('common.add')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentButton;
