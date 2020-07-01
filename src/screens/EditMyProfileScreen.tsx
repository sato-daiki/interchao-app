import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  borderLightColor,
  primaryColor,
  fontSizeM,
  subTextColor,
} from '../styles/Common';
import { openCameraRoll, uploadImageAsync } from '../utils/CameraRoll';
import firebase from '../constants/firebase';
import { LoadingModal, Avatar, HeaderText } from '../components/atoms';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { Profile, Language } from '../types';
import I18n from '../utils/I18n';
import ModalSpokenLanguages from '../components/organisms/ModalSpokenLanguages';
import {
  getAllLanguage,
  getLanguage,
  getTargetLanguages,
} from '../utils/diary';

export interface Props {
  profile: Profile;
}

interface DispatchProps {
  setProfile: (profile: Profile) => {};
}

type PickerLanguage = 'native' | 'learn' | 'spoken';

type ScreenType = React.ComponentType<
  Props & DispatchProps & NavigationStackScreenProps
> & {
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    width: 96,
    lineHeight: fontSizeM * 1.3,
  },
  textInput: {
    fontSize: fontSizeM,
    color: primaryColor,
    textAlignVertical: 'center',
    flex: 1,
  },
  introduction: {
    paddingHorizontal: 16,
    // paddingとかくとpaddingTopがなぜか反応しない
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 170,
  },
  headerLeft: {
    paddingLeft: Platform.OS === 'android' ? 16 : 0,
  },
  spokenContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  right: {
    flex: 1,
  },
  spokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  spoken: {
    color: primaryColor,
    fontSize: fontSizeM,
    marginRight: 4,
  },
  trash: {
    width: 40,
    alignItems: 'center',
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addText: {
    color: subTextColor,
    fontSize: fontSizeM,
    marginLeft: 2,
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
  const [isNative, setIsNative] = useState(false);
  const [isLearn, setIsLearn] = useState(false);
  const [isSpoken, setIsSpoken] = useState(false);
  const [nativeLanguage, setNativeLanguage] = useState(profile.nativeLanguage);
  const [learnLanguage, setLearnLanguage] = useState(profile.learnLanguage);
  const [spokenLanguages, setSpokenLanguages] = useState(
    profile.spokenLanguages || []
  );
  const [introduction, setIntroduction] = useState(profile.introduction);
  const [photoUrl, setPhotoUrl] = useState(profile.photoUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [nationalityCode, setNationalityCode] = useState(
    profile.nationalityCode
  );
  const [isNationality, setIsNationality] = useState(false);

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isLoading) return;
      setIsLoading(true);
      // 画像のuodate
      let newPhotoUrl = '';
      const postIndex = Date.now().toString();
      const path = `profileImages/${profile.uid}/${postIndex}`;
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
        learnLanguage,
        nativeLanguage,
        spokenLanguages: spokenLanguages || null,
        nationalityCode,
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
    photoUrl,
    name,
    userName,
    learnLanguage,
    nativeLanguage,
    spokenLanguages,
    nationalityCode,
    introduction,
    setProfile,
    navigation,
  ]);

  useEffect(() => {
    navigation.setParams({ onPressSubmit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    name,
    userName,
    learnLanguage,
    nativeLanguage,
    spokenLanguages,
    nationalityCode,
    introduction,
    photoUrl,
  ]);

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

  const rowStyle = { paddingVertical: nationalityCode ? 6 : 16 };

  return (
    <View style={styles.container}>
      <ModalSpokenLanguages
        visible={isLearn}
        defaultLanguage={learnLanguage}
        languages={getAllLanguage()}
        onPressSubmit={(language: Language): void => {
          setLearnLanguage(language);
          setIsLearn(false);
        }}
        onPressClose={(): void => setIsLearn(false)}
      />
      <ModalSpokenLanguages
        visible={isNative}
        defaultLanguage={nativeLanguage}
        languages={getAllLanguage()}
        onPressSubmit={(language: Language): void => {
          setNativeLanguage(language);
          setIsNative(false);
        }}
        onPressClose={(): void => setIsNative(false)}
      />
      <ModalSpokenLanguages
        visible={isSpoken}
        languages={getTargetLanguages(
          learnLanguage,
          nativeLanguage,
          spokenLanguages
        )}
        onPressSubmit={(language: Language): void => {
          setSpokenLanguages([...spokenLanguages, language]);
          setIsSpoken(false);
        }}
        onPressClose={(): void => setIsSpoken(false)}
      />
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
        <TouchableOpacity
          style={styles.row}
          activeOpacity={1}
          onPress={(): void => setIsLearn(true)}
        >
          <Text style={styles.label}>{I18n.t('editMyProfile.learn')}</Text>
          <Text>{getLanguage(learnLanguage)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={1}
          onPress={(): void => setIsNative(true)}
        >
          <Text style={styles.label}>{I18n.t('editMyProfile.native')}</Text>
          <Text>{getLanguage(nativeLanguage)}</Text>
        </TouchableOpacity>
        <View style={styles.spokenContainer}>
          <Text style={styles.label}>{I18n.t('editMyProfile.spoken')}</Text>
          <View style={styles.right}>
            {spokenLanguages.map(item => (
              <View style={styles.spokenRow} key={item}>
                <Text style={styles.spoken}>{getLanguage(item)}</Text>
                <TouchableOpacity
                  style={styles.trash}
                  onPress={(): void => {
                    setSpokenLanguages(spokenLanguages.filter(s => s !== item));
                  }}
                >
                  <MaterialCommunityIcons
                    size={20}
                    color={primaryColor}
                    name="trash-can-outline"
                  />
                </TouchableOpacity>
              </View>
            ))}

            {spokenLanguages.length < 2 ? (
              <TouchableOpacity
                style={styles.addRow}
                onPress={(): void => setIsSpoken(true)}
              >
                <MaterialCommunityIcons
                  size={24}
                  color={subTextColor}
                  name="plus"
                />
                <Text style={styles.addText}>
                  {I18n.t('selectLanguage.add')}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.row, rowStyle]}
          activeOpacity={1}
          onPress={(): void => setIsNationality(true)}
        >
          <Text style={styles.label}>
            {I18n.t('selectLanguage.nationality')}
          </Text>
          <CountryPicker
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            countryCode={nationalityCode}
            placeholder={I18n.t('selectLanguage.placeholder')}
            withFilter
            withFlag
            withCountryNameButton
            withEmoji
            withModal
            withAlphaFilter
            onSelect={(country: Country): void => {
              setNationalityCode(country.cca2);
            }}
            onClose={(): void => setIsNationality(false)}
            onOpen={(): void => setIsNationality(true)}
            visible={isNationality}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.introduction}
          value={introduction || ''}
          onChangeText={(text: string): void => setIntroduction(text)}
          maxLength={200}
          placeholder={I18n.t('editMyProfile.placeholderIntroduction')}
          multiline
          numberOfLines={3}
          spellCheck
          autoCorrect
          underlineColorAndroid="transparent"
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
        containerStyle={styles.headerLeft}
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
