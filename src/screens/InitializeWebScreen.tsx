import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import Lp from '../components/organisms/Lp';
import { AuthStackParamList } from '../navigations/AuthNavigator';

type InitializeWebNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Initialize'
>;

type ScreenType = {
  navigation: InitializeWebNavigationProp;
};

const InitializeWebScreen: React.FC<ScreenType> = ({ navigation }) => {
  return (
    <Lp
      isAbout={false}
      onPressHeader={(): void => {
        navigation.navigate('Initialize');
      }}
      onPressStart={(): void => {
        navigation.navigate('SelectLanguage');
      }}
      onPressLogin={(): void => {
        navigation.navigate('SignIn');
      }}
    />
  );
};

export default InitializeWebScreen;
