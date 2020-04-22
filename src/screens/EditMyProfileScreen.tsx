import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { borderLightColor, primaryColor, fontSizeM } from '../styles/Common';
import { openCameraRoll, uploadImageAsync } from '../utils/CameraRoll';
import firebase from '../constants/firebase';
import { LoadingModal, Avatar, HeaderText } from '../components/atoms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { Profile } from '../types';
import I18n from '../utils/I18n';

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
    backgroundColor: '#fff',
    paddingTop: 32,
  },
  keyboardAwareScrollView: {
    flex: 1,
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
    flex: 1,
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
  const [photoUrl, setPhotoUrl] = useState(profile.photoUrl);
  const [isLoading, setIsLoading] = useState(false);

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isLoading) return;
      setIsLoading(true);
      // 画像のuodate
      let newPhotoUrl = '';
      const postIndex = Date.now().toString();
      const path = `${profile.uid}/profileImages/${postIndex}`;
      if (photoUrl) {
        newPhotoUrl = await uploadImageAsync(photoUrl, path, 300);
      }

      const ref = firebase
        .firestore()
        .collection('profiles')
        .doc(profile.uid);

      const profileInfo = {
        name,
        userName,
        introduction,
        photoUrl: newPhotoUrl || photoUrl,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      await ref.update({
        ...profileInfo,
      });
      setIsLoading(false);
      setProfile({
        ...profile,
        ...profileInfo,
      });
      navigation.navigate('MyPage');
    };
    f();
  }, [
    isLoading,
    profile,
    name,
    userName,
    introduction,
    photoUrl,
    setProfile,
    navigation,
  ]);

  useEffect(() => {
    navigation.setParams({ onPressSubmit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, userName, introduction, photoUrl]);

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
      <KeyboardAwareScrollView style={styles.keyboardAwareScrollView}>
        <LoadingModal visible={isLoading} />
        <View style={styles.avatar}>
          <Avatar photoUrl={photoUrl} pickImage={pickImage} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{I18n.t('editMyProfile.name')}</Text>
          <TextInput
            value={name || ''}
            onChangeText={(text: string): void => setName(text)}
            maxLength={20}
            placeholder="username"
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
          <Text style={styles.label}>{I18n.t('editMyProfile.userName')}</Text>
          <Text>{userName}</Text>
        </TouchableOpacity>
        <TextInput
          value={introduction || ''}
          onChangeText={(text: string): void => setIntroduction(text)}
          maxLength={200}
          placeholder={I18n.t('editMyProfile.placeholderIntroduction')}
          multiline
          numberOfLines={3}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          style={styles.introduction}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

EditMyProfileScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const onPressSubmit = navigation.getParam('onPressSubmit');
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('editMyProfile.headerTitle'),
    headerLeft: (): JSX.Element => (
      <HeaderText
        title={I18n.t('common.close')}
        onPress={(): boolean => navigation.goBack(null)}
      />
    ),
    headerRight: (): JSX.Element => (
      <HeaderText title={I18n.t('common.done')} onPress={onPressSubmit} />
    ),
  };
};

export default EditMyProfileScreen;
