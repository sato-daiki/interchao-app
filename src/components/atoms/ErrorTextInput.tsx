import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
// @ts-ignore
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import {
  errorColor,
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  offWhite,
} from '../../styles/Common';

const styles = StyleSheet.create({
  errorBorder: {
    borderColor: errorColor,
    borderBottomWidth: 2,
    borderWidth: 2,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  textInput: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingHorizontal: 16,
    paddingVertical: 14,
    textAlignVertical: 'top',
    backgroundColor: offWhite,
    borderRadius: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: borderLightColor,
  },
  error: {
    color: errorColor,
    fontSize: fontSizeS,
    marginLeft: 6,
  },
});

type Props = {
  errorMessage?: string;
} & TextInputProps;

const ErrorTextInput = ({
  errorMessage = '',
  ...attributes
}: Props): JSX.Element => {
  return (
    <>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        style={[
          styles.textInput,
          errorMessage.length > 0 ? styles.errorBorder : {},
        ]}
        {...attributes}
      />
      {errorMessage.length > 0 ? (
        <View style={styles.errorContainer}>
          <FontAwesomeIcon
            size={fontSizeM}
            name="exclamation-circle"
            color={errorColor}
          />
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      ) : null}
    </>
  );
};

export default ErrorTextInput;
