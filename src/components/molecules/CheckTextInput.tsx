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
// @ts-ignore
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Value } from 'react-native-reanimated';
import {
  errorColor,
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  offWhite,
  green,
} from '../../styles/Common';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    position: 'absolute',
    right: 16,
    paddingTop: 2,
  },
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
    width: '100%',
    fontSize: fontSizeM,
    color: primaryColor,
    paddingLeft: 16,
    paddingRight: 46,
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
  errorMessage: string;
} & TextInputProps;

const CheckTextInput = (props: Props): JSX.Element => {
  const { errorMessage, value } = props;
  return (
    <>
      <View style={styles.row}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          style={[
            styles.textInput,
            errorMessage.length > 0 ? styles.errorBorder : {},
          ]}
          {...props}
        />
        {errorMessage.length === 0 && value && value.length > 0 ? (
          <MaterialCommunityIcons
            style={styles.checkIcon}
            size={24}
            name="check-circle-outline"
            color={green}
          />
        ) : null}
      </View>
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

export default CheckTextInput;
