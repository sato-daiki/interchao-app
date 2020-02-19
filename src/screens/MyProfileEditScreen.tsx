import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { TextInput } from 'react-native-gesture-handler';
import { profile } from '../utils/testdata';
import { ProfileHeader } from '../components/molecules';
import {
  borderLightColor,
  primaryColor,
  fontSizeM,
  offWhite,
} from '../styles/Common';
import { openCameraRoll } from '../utils/CameraRoll';

import { LoadingModal, Avatar } from '../components/atoms';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 8,
  },
  avatar: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  row: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    width: 96,
  },
  textInput: {
    fontSize: fontSizeM,
    color: primaryColor,
    textAlignVertical: 'top',
  },
  introduction: {
    padding: 16,
    borderBottomColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 170,
  },
});

/**
 * マイページ編集画面
 */
const MyProfileEditScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(profile.name);
    setUserName(profile.userName);
    setUserName(profile.introduction);
    setPhotoUrl(profile.photoUrl);
  }, []);

  const pickImage = useCallback(() => {
    const f = async () => {
      const result: any = await openCameraRoll({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (!result.cancelled) {
        setPhotoUrl(result.uri);
      }
    };
    f();
  }, []);

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <View style={styles.avatar}>
        <Avatar photoUrl={photoUrl} pickImage={pickImage} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>名前</Text>
        <TextInput
          value={name}
          onChangeText={(text: string): void => setName(text)}
          maxLength={50}
          placeholder="zebra"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          style={styles.textInput}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>ユーザネーム</Text>
        <TextInput
          value={userName}
          onChangeText={(text: string): void => setUserName(text)}
          maxLength={50}
          placeholder="zebra"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          style={styles.textInput}
        />
      </View>
      <TextInput
        value={introduction}
        onChangeText={(text: string): void => setIntroduction(text)}
        maxLength={200}
        placeholder="自己紹介(200字以内)"
        multiline
        numberOfLines={3}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        style={styles.introduction}
      />
    </View>
  );
};

export default MyProfileEditScreen;
