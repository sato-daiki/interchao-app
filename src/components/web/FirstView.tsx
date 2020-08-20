import React, { useCallback } from 'react';
import { View, StyleSheet, Text, StyleProp, TextStyle } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { maxWindowWidth, offBlack, maxButtonWidth } from '../../styles/Common';
import { WhiteButton, Space, SubmitButton } from '../atoms';

interface Props {
  isPcWidth: boolean;
  navigation: NavigationStackProp;
}

const styles = StyleSheet.create({
  warapper: {
    width: '100%',
    backgroundColor: offBlack,
  },
  container: {
    width: '100%',
    maxWidth: maxWindowWidth,
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: 32,
  },
  containerPc: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerSp: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
  },
  loginContainer: {
    maxWidth: 300,
    alignItems: 'flex-start',
    width: maxButtonWidth,
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 40 * 1.3,
    marginBottom: 16,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    lineHeight: 20 * 1.3,
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 20 * 1.3,
  },
  button: {
    alignSelf: 'flex-start',
  },
});

const FirstView = ({ isPcWidth, navigation }: Props): JSX.Element => {
  const onPressSignIn = useCallback((): void => {
    navigation.navigate('SignIn');
  }, [navigation]);

  const onPressSignUp = useCallback((): void => {
    navigation.navigate('SignIn');
  }, [navigation]);

  const setLeft = (): StyleProp<TextStyle> => {
    return {
      alignSelf: isPcWidth ? 'flex-start' : 'center',
      textAlign: isPcWidth ? 'left' : 'center',
    };
  };

  const setRight = (): StyleProp<TextStyle> => {
    return {
      alignSelf: isPcWidth ? 'flex-start' : 'center',
    };
  };

  return (
    <View style={styles.warapper}>
      <View
        style={[
          styles.container,
          isPcWidth ? styles.containerPc : styles.containerSp,
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.title, setLeft()]}>
            “Speaking” starts from “Writing”
          </Text>
          <Text style={[styles.text, setLeft()]}>
            Interactive language learning app
          </Text>
        </View>
        <View style={styles.loginContainer}>
          <Space size={36} />
          <Text style={[styles.loginText, setRight()]}>
            Interchaoを始めよう
          </Text>
          <Space size={8} />
          <SubmitButton
            containerStyle={styles.button}
            title="Signin"
            onPress={onPressSignIn}
          />
          <Space size={16} />
          <WhiteButton
            containerStyle={styles.button}
            title="Login"
            onPress={onPressSignUp}
          />
        </View>
      </View>
    </View>
  );
};

export default FirstView;
