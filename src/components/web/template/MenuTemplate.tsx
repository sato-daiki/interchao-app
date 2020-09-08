import React, { ReactNode } from 'react';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { primaryColor, fontSizeM } from '../../../styles/Common';

interface Props {
  children: ReactNode;
}

const styles = StyleSheet.create({
  optionsWrapper: {
    width: 200,
  },
  optionWrapper: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  optionText: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
});

const MenuTemplate = ({ children }: Props): JSX.Element => {
  return (
    <Menu
      renderer={renderers.Popover}
      rendererProps={{
        placement: 'bottom',
      }}
    >
      <MenuTrigger>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={28}
          color={primaryColor}
        />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsWrapper: styles.optionsWrapper,
          optionWrapper: styles.optionWrapper,
          optionText: styles.optionText,
        }}
      >
        {children}
      </MenuOptions>
    </Menu>
  );
};

export default MenuTemplate;
