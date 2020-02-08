import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  textInput: {
    fontSize: 14,
    color: 'black',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    margin: 16,
  },
});

const VerificationCodeScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  navigation,
}): JSX.Element => {
  const [code, setCode] = useState('');

  const onPressConfirmCode = (): void => {
    if (code.length) {
      const { params = {} } = navigation.state;

      params.confirmResult
        .confirm(code)
        .then(user => {
          console.log('Code Confirmed!');
        })
        .catch(error => console.log(`Code Confirm Error: ${error.message}`));
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter verification code below:</Text>
      <TextInput
        style={styles.textInput}
        value={code}
        onChangeText={(value): void => setCode(value)}
        editable
        maxLength={50}
        placeholder="Code"
        autoCapitalize="none"
        keyboardType="numeric"
        returnKeyType="done"
      />
      <Button
        title="Confirm Code"
        color="#841584"
        onPress={onPressConfirmCode}
      />
    </View>
  );
};

export default VerificationCodeScreen;
