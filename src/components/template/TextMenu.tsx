import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { clipboard } from '../../styles/Common';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import I18n from '../../utils/I18n';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  children: React.ReactNode;
  onPressCopy: () => void;
  onPressTranslate: () => void;
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: -66,
    left: 30,
    width: 180,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: clipboard,
    borderRadius: 8,
  },
  menu: {
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
    width: 90,
  },
  menuText: {
    marginTop: 4,
    color: 'white',
  },
  border: {
    borderRightWidth: 1,
    borderRightColor: 'black',
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

const TextMenu = ({
  children,
  onPressCopy,
  onPressTranslate,
}: Props): JSX.Element => {
  const copyButton = (
    <MenuOption style={[styles.menu, styles.border]} onSelect={onPressCopy}>
      <MaterialCommunityIcons size={20} color={'white'} name="content-copy" />
      <Text style={styles.menuText}>{I18n.t('common.copy')}</Text>
    </MenuOption>
  );

  const translateButton = (
    <MenuOption style={styles.menu} onSelect={onPressTranslate}>
      <MaterialCommunityIcons size={20} color={'white'} name="translate" />
      <Text style={styles.menuText}>{I18n.t('common.translation')}</Text>
    </MenuOption>
  );

  /** AndroidのMenuOption　onSlectが機能しない為 */
  const renderMenuButton = () => {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.row}>
          {copyButton}
          {translateButton}
        </View>
      );
    }
    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={onPressCopy}>{copyButton}</TouchableOpacity>
        <TouchableOpacity onPress={onPressTranslate}>
          {translateButton}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Menu>
        <MenuTrigger>{children}</MenuTrigger>
        <MenuOptions>
          <View style={styles.menuContainer}>
            {renderMenuButton()}
            <View style={styles.triangle} />
          </View>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default TextMenu;
