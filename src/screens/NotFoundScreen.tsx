import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  primaryColor,
  fontSizeM,
  fontSizeLLLL,
  linkBlue,
} from '../styles/Common';
import { Fotter, Header } from '../components/web/molecules';
import { Hoverable } from '../components/atoms';
import I18n from '../utils/I18n';
import { AuthStackParamList } from '../navigations/AuthNavigator';

type ScreenType = StackScreenProps<AuthStackParamList, 'notfound'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  main: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 64,
    fontSize: fontSizeLLLL,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: fontSizeM,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 16,
  },
  link: {
    fontSize: fontSizeM,
    color: linkBlue,
    alignSelf: 'center',
  },
  hoverLink: {
    borderBottomColor: linkBlue,
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
});

/**
 * 添削中
 */
const NotFoundScreen: React.FC<ScreenType> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={(): void => {
          navigation.navigate('Initialize');
        }}
      />
      <View style={styles.main}>
        <View>
          <Text style={styles.title}>404 NOT FOUND</Text>
          <Text style={styles.text}>{I18n.t('notFound.text')}</Text>
          <Hoverable
            hoverStyle={styles.hoverLink}
            onPress={(): void => {
              navigation.navigate('Initialize');
            }}
          >
            <Text style={styles.link}>{I18n.t('notFound.link')}</Text>
          </Hoverable>
        </View>
      </View>
      <Fotter />
    </SafeAreaView>
  );
};

export default NotFoundScreen;
