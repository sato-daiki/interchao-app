import React, { useCallback } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
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
  setIsEmpty: (isEmpty: boolean) => void;
  onPressClose: () => void;
  refine: any;
  currentRefinement: string;
}

const SearchBar: React.FC<Props & any> = ({
  placeholder,
  setIsEmpty,
  onPressClose,
  refine,
  currentRefinement,
}) => {
  const onChangeText = useCallback(
    (text: string): void => {
      if (!text) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
      refine(text);
    },
    [refine, setIsEmpty]
  );

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
        onChangeText={onChangeText}
      />
      <HeaderText title="キャンセル" onPress={onPressClose} />
    </View>
  );
};

export default connectSearchBox(SearchBar);
