import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Linking } from 'expo';
import { GooglePlayBadge, Appstore } from '../../../images/web/index';
import WebTemplate from '../template/WebTemplate';

const styles = StyleSheet.create({
  warapper: {
    paddingTop: 16,
    paddingBottom: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 80,
    marginHorizontal: 8,
  },
});

const AppDownload = (): JSX.Element => {
  const onPressGoogle = (): void => {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=app.interchao'
    );
  };

  const onPressApple = (): void => {
    Linking.openURL('https://apps.apple.com/jp/app/interchao/id1510150748/');
  };

  const renderCenter = (
    <View style={styles.row}>
      <TouchableOpacity onPress={onPressGoogle}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={GooglePlayBadge}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressApple}>
        <Image resizeMode="contain" style={styles.image} source={Appstore} />
      </TouchableOpacity>
    </View>
  );

  return (
    <WebTemplate
      warapper={styles.warapper}
      leftTop={false}
      isMaxLayoutChange={false}
      renderLeft={renderCenter}
    />
  );
};

export default AppDownload;
