import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  fontSizeM,
  primaryColor,
  offWhite,
  subTextColor,
} from '../../styles/Common';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width - 64,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: offWhite,
  },
  textInput: {
    lineHeight: fontSizeM * 1.3,
    fontSize: fontSizeM,
    color: primaryColor,
    padding: 8,
    flex: 1,
  },
  iconContainer: {
    padding: 8,
  },
});

type Props = {
  onPressClear: () => void;
} & TextInputProps;

const ClearTextInput = ({
  autoFocus = false,
  autoCapitalize = 'none',
  defaultValue,
  value,
  onChangeText,
  onPressClear,
}: Props): JSX.Element => {
  const [isDeleteButton, setIsDeleteButton] = useState(true);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        autoFocus={autoFocus}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        underlineColorAndroid="transparent"
        value={value}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        onFocus={(): void => setIsDeleteButton(false)}
        onEndEditing={(): void => setIsDeleteButton(true)}
        multiline
        scrollEnabled={false}
      />
      {isDeleteButton && value ? (
        <TouchableOpacity style={styles.iconContainer} onPress={onPressClear}>
          <MaterialCommunityIcons
            size={16}
            name="close-circle"
            color={subTextColor}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ClearTextInput;
