import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { connectSearchBox } from 'react-instantsearch-native';
import {
  subTextColor,
  offWhite,
  primaryColor,
  fontSizeM,
} from '../../styles/Common';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingLeft: 56,
    marginRight: 16,
    width,
  },
  searchBarInput: {
    margin: 8,
    borderRadius: 20,
    backgroundColor: offWhite,
    color: primaryColor,
    fontSize: fontSizeM,
    paddingHorizontal: 24,
    height: 30,
  },
});

interface Props {
  placeholder?: string;
}

const SearchBar: React.FC<Props & any> = ({
  placeholder,
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
    </View>
  );
};

export default connectSearchBox(SearchBar);
