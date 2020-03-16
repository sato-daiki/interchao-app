import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { connectSearchBox } from 'react-instantsearch-native';
import {
  subTextColor,
  offWhite,
  primaryColor,
  fontSizeM,
  borderLightColor,
} from '../../styles/Common';
import { HeaderText } from '../atoms';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    width,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  searchBarInput: {
    marginVertical: 8,
    marginRight: 16,
    borderRadius: 20,
    backgroundColor: offWhite,
    color: primaryColor,
    fontSize: fontSizeM,
    paddingHorizontal: 24,
    height: 30,
    flex: 1,
  },
});

interface Props {
  placeholder?: string;
  onPressClose: () => void;
}

const SearchBar: React.FC<Props & any> = ({
  placeholder,
  onPressClose,
  refine,
  currentRefinement,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBarInput}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="web-search"
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        placeholderTextColor={subTextColor}
        autoFocus
        numberOfLines={1}
        value={currentRefinement}
        onChangeText={refine}
      />
      <HeaderText title="キャンセル" onPress={onPressClose} />
    </View>
  );
};

export default connectSearchBox(SearchBar);
