import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { borderLightColor, primaryColor, fontSizeM } from '../styles/Common';
import { openCameraRoll } from '../utils/CameraRoll';
import firebase from '../constants/firebase';
import { LoadingModal, Avatar, HeaderText } from '../components/atoms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { Profile } from '../types';

interface Props {
  profile: Profile;
  setProfile: (profile: Profile) => {};
}

type ScreenType = React.ComponentType<Props & NavigationStackScreenProps> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 32,
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
const EditMyProfileScreen: ScreenType = ({
  profile,
  setProfile,
  navigation,
}) => {
  const [name, setName] = useState(profile.name);
  const [userName, setUserName] = useState(profile.userName);
  const [introduction, setIntroduction] = useState(profile.introduction);
  const [photoUrl, setPhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      const ref = firebase
        .firestore()
        .collection('profiles')
        .doc(profile.uid);

      const profileInfo = {
        name,
        userName,
        introduction,
        photoUrl,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      await ref.update(profileInfo);
      setProfile({
        ...profile,
        ...profileInfo,
      });
      navigation.navigate('MyPage');
    };
    f();
  }, [profile, setProfile, navigation, name, userName, introduction, photoUrl]);

  useEffect(() => {
    navigation.setParams({ onPressSubmit });
  }, []);

  const pickImage = useCallback(() => {
    const f = async (): Promise<void> => {
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

  const onPressUserName = useCallback(() => {
    // 次ページのuserNameは最終更新でないためstateで渡す
    navigation.navigate('EditUserName', {
      userName,
      setUserName: (text: string): void => setUserName(text),
    });
  }, [navigation, userName]);

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
      <TouchableOpacity
        style={styles.row}
        activeOpacity={1}
        onPress={onPressUserName}
      >
        <Text style={styles.label}>ユーザネーム</Text>
        <Text>{userName}</Text>
      </TouchableOpacity>
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

EditMyProfileScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressSubmit = navigation.getParam('onPressSubmit');
  return {
    ...DefaultNavigationOptions,
    title: 'プロフィール変更',
    headerLeft: (): JSX.Element => (
      <HeaderText
        title="閉じる"
        onPress={(): boolean => navigation.goBack(null)}
      />
    ),
    headerRight: (): JSX.Element => (
      <HeaderText title="完了" onPress={onPressSubmit} />
    ),
  };
};

export default EditMyProfileScreen;
