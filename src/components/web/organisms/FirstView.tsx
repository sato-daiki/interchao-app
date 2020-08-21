import React from 'react';
import { View, StyleSheet, Text, StyleProp, TextStyle } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { maxLayoutChange, offBlack, maxPartS } from '../../../styles/Common';
import { WhiteButton, Space, SubmitButton } from '../../atoms';
import I18n from '../../../utils/I18n';

interface Props {
  isMaxLayoutChange: boolean;
  navigation: NavigationStackProp;
  onPressStart: () => void;
  onPressLogin: () => void;
}

const styles = StyleSheet.create({
  warapper: {
    width: '100%',
    backgroundColor: offBlack,
    marginBottom: 32,
  },
  container: {
    width: '100%',
    maxWidth: maxLayoutChange,
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
    width: maxPartS,
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

const FirstView = ({
  isMaxLayoutChange,
  onPressStart,
  onPressLogin,
}: Props): JSX.Element => {
  const setLeft = (): StyleProp<TextStyle> => {
    return {
      alignSelf: isMaxLayoutChange ? 'flex-start' : 'center',
      textAlign: isMaxLayoutChange ? 'left' : 'center',
    };
  };

  const setRight = (): StyleProp<TextStyle> => {
    return {
      alignSelf: isMaxLayoutChange ? 'flex-start' : 'center',
    };
  };

  return (
    <View style={styles.warapper}>
      <View
        style={[
          styles.container,
          isMaxLayoutChange ? styles.containerPc : styles.containerSp,
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.title, setLeft()]}>
            {I18n.t('web.firstViewTitle')}
          </Text>
          <Text style={[styles.text, setLeft()]}>
            {I18n.t('web.firstViewSubTitle')}
          </Text>
        </View>
        <View style={styles.loginContainer}>
          <Space size={36} />
          <Text style={[styles.loginText, setRight()]}>
            {I18n.t('web.firstViewStart')}
          </Text>
          <Space size={8} />
          <SubmitButton
            containerStyle={styles.button}
            title={I18n.t('initialize.start')}
            onPress={onPressStart}
          />
          <Space size={16} />
          <WhiteButton
            containerStyle={styles.button}
            title={I18n.t('signIn.login')}
            onPress={onPressLogin}
          />
        </View>
      </View>
    </View>
  );
};

export default FirstView;
