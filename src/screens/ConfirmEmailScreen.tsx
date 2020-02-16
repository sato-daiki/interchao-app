import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { Email } from '../images';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
  linkBlue,
} from '../styles/Common';
import { LoadingModal } from '../components/atoms';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 26,
  },
  title: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    color: primaryColor,
    paddingBottom: 16,
  },
  description: {
    fontSize: fontSizeM,
    color: subTextColor,
    paddingBottom: 16,
  },
  emailIcon: {
    width: 64,
    height: 64,
    marginBottom: 16,
  },
  emailText: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingVertical: 16,
  },
  linkText: {
    color: linkBlue,
  },
  line: {
    width: '100%',
    borderBottomColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 38,
  },
});
const ConfirmEmailScreen: React.FC<{ navigation: NavigationStackProp }> = ({
  email,
  unconfirmedEmail,
}): JSX.Element => {
  const [isReSending, setIsReSending] = useState(false);

  const onPressReSend = useCallback((): void => {}, []);
  const onPressChangeEmail = useCallback((): void => {}, []);

  return (
    <View style={styles.container}>
      <LoadingModal visible={isReSending} />
      <Text style={styles.title}>アカウントの登録を受け付けました。</Text>
      <Image style={styles.emailIcon} source={Email} />
      <Text style={styles.description}>
        ご登録いただいた以下アドレスにメールが届きます。
        メール本文内のURLをクリックし、認証手続きを完了させてください。
      </Text>
      <Text style={styles.emailText}>{unconfirmedEmail || email}</Text>

      <View style={styles.line} />

      <Text style={styles.title}>メールが届かない場合</Text>
      <Text style={styles.description}>
        再度送信する場合は
        <Text style={styles.linkText} onPress={onPressReSend}>
          こちら
        </Text>
      </Text>
      <Text style={styles.description}>
        アドレスを変更する場合は
        <Text style={styles.linkText} onPress={onPressChangeEmail}>
          こちら
        </Text>
      </Text>
    </View>
  );
};

export default ConfirmEmailScreen;
