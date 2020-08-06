import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { clipboard } from '../../styles/Common';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import I18n from '../../utils/I18n';

interface Props {
  onPressCopy: () => void;
  onPressTranslate: () => void;
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: -66,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: clipboard,
    borderRadius: 8,
    width: 200,
    height: 56,
  },
  menu: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: 'white',
    alignItems: 'center',
    zIndex: 1,
  },
  menuText: {
    marginTop: 4,
    color: 'white',
  },
  triangle: {
    alignSelf: 'center',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: clipboard,
    transform: [{ rotate: '180deg' }],
  },
});

const TextMenu = ({ onPressCopy, onPressTranslate }: Props): JSX.Element => {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.menu} onPress={onPressCopy}>
          <MaterialCommunityIcons
            size={20}
            color={'white'}
            name="content-copy"
          />
          <Text style={styles.menuText}>{I18n.t('common.copy')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={onPressTranslate}>
          <MaterialCommunityIcons size={20} color={'white'} name="translate" />
          <Text style={styles.menuText}>{I18n.t('common.translation')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.triangle} />
    </View>
  );
};

export default TextMenu;
