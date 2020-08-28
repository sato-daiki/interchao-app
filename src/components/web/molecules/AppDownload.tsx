import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Linking } from 'expo';
import I18n from '../../../utils/I18n';
import { GooglePlayBadge, Appstore } from '../../../images/web/index';
import {
  fontSizeL,
  fontSizeM,
  mainColor,
  offWhite,
  primaryColor,
} from '../../../styles/Common';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  isWhite: boolean;
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: fontSizeL,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  text: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 130,
    height: 80,
    marginHorizontal: 8,
  },
});

const AppDownload = ({ isWhite, containerStyle }: Props): JSX.Element => {
  const onPressGoogle = (): void => {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=app.interchao'
    );
  };

  const onPressApple = (): void => {
    Linking.openURL('https://apps.apple.com/jp/app/interchao/id1510150748/');
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isWhite ? offWhite : mainColor },
        containerStyle,
      ]}
    >
      <Text style={[styles.title, { color: isWhite ? primaryColor : '#fff' }]}>
        {I18n.t('modalAppSuggestion.title')}
      </Text>
      <Text style={[styles.text, { color: isWhite ? primaryColor : '#fff' }]}>
        {I18n.t('modalAppSuggestion.text')}
      </Text>
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
    </View>
  );
};

export default AppDownload;
