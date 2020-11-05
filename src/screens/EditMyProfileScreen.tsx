import React, { useCallback, useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import {
  borderLightColor,
  primaryColor,
  fontSizeM,
  subTextColor,
} from '../styles/Common';
import { openCameraRoll, uploadImageAsync } from '../utils/CameraRoll';
import firebase from '../constants/firebase';
import {
  LoadingModal,
  Avatar,
  Space,
  Hoverable,
  HeaderText,
  CountryNameWithFlag,
  SmallButtonWhite,
} from '../components/atoms';
import { Profile, Language, CountryCode } from '../types';
import I18n from '../utils/I18n';
import ModalSpokenLanguages from '../components/organisms/ModalSpokenLanguages';
import {
  allLanguage,
  getLanguage,
  getTargetLanguages,
  getLanguageNum,
  checkSelectLanguage,
} from '../utils/diary';
import { ModalConfirm } from '../components/organisms';
import { MyPageTabNavigationProp } from '../navigations/MyPageTabNavigator';
import {
  ModalEditMyProfileStackNavigationProp,
  ModalEditMyProfileStackParamList,
} from '../navigations/ModalNavigator';
import { KeyboardHideButton } from '../components/molecules';

export interface Props {
  profile: Profile;
}

interface DispatchProps {
  setProfile: (profile: Profile) => {};
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalEditMyProfileStackParamList, 'EditMyProfile'>,
  ModalEditMyProfileStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp & MyPageTabNavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAwareScrollView: {
    flex: 1,
    paddingVertical: 32,
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
    width: 98,
    lineHeight: fontSizeM * 1.3,
  },
  textInput: {
    fontSize: fontSizeM,
    color: primaryColor,
    textAlignVertical: 'center',
    flex: 1,
    paddingVertical: Platform.OS === 'web' ? 8 : 0,
  },
  introduction: {
    textAlignVertical: 'top',
    paddingHorizontal: 16,
    // paddingとかくとpaddingTopがなぜか反応しない
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 170,
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
const EditMyProfileScreen: React.FC<ScreenType> = ({
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
  const [nationalityCode, setNationalityCode] = useState<
    CountryCode | undefined
  >(profile.nationalityCode);
  const [isModalError, setIsModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isKeyboard, setIsKeyboard] = useState(false);
  const targetLanguages = useRef(
    getTargetLanguages(learnLanguage, nativeLanguage, spokenLanguages)
  );

  const onPressSubmit = useCallback(async (): Promise<void> => {
    if (isLoading) return;

    const checked = checkSelectLanguage(
      nationalityCode,
      learnLanguage,
      nativeLanguage,
      spokenLanguages
    );
    if (!checked.result) {
      setErrorMessage(checked.errorMessage);
      setIsModalError(true);
      return;
    }
    setIsLoading(true);
    // 画像のuodate
    let newPhotoUrl = '';
    const postIndex = Date.now().toString();
    const path = `profileImages/${profile.uid}/${postIndex}`;
    if (photoUrl && profile.photoUrl !== photoUrl) {
      // 変更があった場合のみ
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
    navigation.navigate('MyPageTab');
  }, [
    introduction,
    isLoading,
    learnLanguage,
    name,
    nationalityCode,
    nativeLanguage,
    navigation,
    photoUrl,
    profile,
    setProfile,
    spokenLanguages,
    userName,
  ]);

  const onPressGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (): JSX.Element => (
        <HeaderText text={I18n.t('common.close')} onPress={onPressGoBack} />
      ),
      headerRight: (): JSX.Element | null => (
        <HeaderText text={I18n.t('common.done')} onPress={onPressSubmit} />
      ),
    });
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

  const pickImage = useCallback(async (): Promise<void> => {
    const result = await openCameraRoll({
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.cancelled) {
      setPhotoUrl(result.uri);
    }
  }, []);

  const onPressCloseError = useCallback((): void => {
    setErrorMessage('');
    setIsModalError(false);
  }, []);

  const onPressUserName = useCallback(() => {
    // 次ページのuserNameは最終更新でないためstateで渡す
    navigation.navigate('EditUserName', {
      userName,
      setUserName: (text: string): void => setUserName(text),
    });
  }, [navigation, userName]);

  const onChangeTextName = useCallback((text: string): void => {
    setName(text);
  }, []);

  const onChangeTextIntroduction = useCallback((text: string): void => {
    setIntroduction(text);
  }, []);

  const onBlurIntroduction = useCallback((): void => {
    setIsKeyboard(false);
  }, []);

  const onOpenCountryPicker = useCallback((): void => {
    navigation.navigate('EditCountry', {
      nationalityCode,
      setNationalityCode: (code: CountryCode): void => setNationalityCode(code),
    });
  }, [nationalityCode, navigation]);

  const onPressSubmitLanguagesLearn = useCallback(
    (language: Language): void => {
      setLearnLanguage(language);
      setIsLearn(false);
    },
    []
  );

  const onPressCloseLanguagesLearn = useCallback((): void => {
    setIsLearn(false);
  }, []);

  const onPressOpenLanguagesLearn = useCallback((): void => {
    setIsLearn(true);
  }, []);

  const onPressSubmitLanguagesNative = useCallback(
    (language: Language): void => {
      setNativeLanguage(language);
      setIsNative(false);
    },
    []
  );

  const onPressCloseLanguagesNative = useCallback((): void => {
    setIsNative(false);
  }, []);

  const onPressOpenLanguagesNative = useCallback((): void => {
    setIsNative(true);
  }, []);

  const onPressSubmitLanguagesSpoken = useCallback(
    (language: Language): void => {
      setSpokenLanguages([...spokenLanguages, language]);
      setIsSpoken(false);
    },
    [spokenLanguages]
  );

  const onPressCloseLanguagesSpoken = useCallback((): void => {
    setIsSpoken(false);
  }, []);

  const onPressOpenLanguagesSpoken = useCallback((): void => {
    setIsSpoken(true);
  }, []);

  return (
    <View style={styles.container}>
      <ModalConfirm
        visible={isModalError}
        title={I18n.t('common.error')}
        message={errorMessage}
        mainButtonText={I18n.t('common.close')}
        onPressMain={onPressCloseError}
      />
      <ModalSpokenLanguages
        visible={isLearn}
        defaultLanguage={learnLanguage}
        languages={allLanguage}
        onPressSubmit={onPressSubmitLanguagesLearn}
        onPressClose={onPressCloseLanguagesLearn}
      />

      <ModalSpokenLanguages
        visible={isNative}
        defaultLanguage={nativeLanguage}
        languages={allLanguage}
        onPressSubmit={onPressSubmitLanguagesNative}
        onPressClose={onPressCloseLanguagesNative}
      />
      <ModalSpokenLanguages
        visible={isSpoken}
        languages={targetLanguages.current}
        onPressSubmit={onPressSubmitLanguagesSpoken}
        onPressClose={onPressCloseLanguagesSpoken}
      />
      <KeyboardAwareScrollView style={styles.keyboardAwareScrollView}>
        <LoadingModal visible={isLoading} />
        <View style={styles.avatar}>
          <Avatar photoUrl={photoUrl} pickImage={pickImage} />
          <Space size={12} />
          <SmallButtonWhite
            title={I18n.t('editMyProfile.imageButton')}
            onPress={pickImage}
            color={primaryColor}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{I18n.t('editMyProfile.name')}</Text>
          <TextInput
            style={styles.textInput}
            value={name || ''}
            placeholder="name"
            maxLength={20}
            autoCorrect={false}
            blurOnSubmit
            keyboardType="default"
            spellCheck
            returnKeyType="done"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            onChangeText={onChangeTextName}
          />
        </View>

        <Hoverable
          style={styles.row}
          activeOpacity={1}
          onPress={onPressUserName}
        >
          <Text style={[styles.label]}>{I18n.t('editMyProfile.userName')}</Text>
          <Text>{userName}</Text>
        </Hoverable>

        <Hoverable
          style={styles.row}
          activeOpacity={1}
          onPress={onPressOpenLanguagesLearn}
        >
          <Text style={styles.label}>{I18n.t('editMyProfile.learn')}</Text>
          <Text>{getLanguage(learnLanguage)}</Text>
        </Hoverable>
        <Hoverable
          style={styles.row}
          activeOpacity={1}
          onPress={onPressOpenLanguagesNative}
        >
          <Text style={styles.label}>{I18n.t('editMyProfile.native')}</Text>
          <Text>{getLanguage(nativeLanguage)}</Text>
        </Hoverable>

        <View style={styles.spokenContainer}>
          <Text style={styles.label}>{I18n.t('editMyProfile.spoken')}</Text>
          <View style={styles.right}>
            {spokenLanguages.map(item => (
              <View style={styles.spokenRow} key={item}>
                <Text style={styles.spoken}>{getLanguage(item)}</Text>
                <Hoverable
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
                </Hoverable>
              </View>
            ))}

            {spokenLanguages.length < getLanguageNum() - 2 ? (
              <Hoverable
                style={styles.addRow}
                onPress={onPressOpenLanguagesSpoken}
              >
                <MaterialCommunityIcons
                  size={24}
                  color={subTextColor}
                  name="plus"
                />
                <Text style={styles.addText}>
                  {I18n.t('selectLanguage.add')}
                </Text>
              </Hoverable>
            ) : null}
          </View>
        </View>
        <Hoverable style={styles.row} onPress={onOpenCountryPicker}>
          <Text style={styles.label}>
            {I18n.t('selectLanguage.nationality')}
          </Text>
          {nationalityCode ? (
            <CountryNameWithFlag nationalityCode={nationalityCode} />
          ) : (
            <Text>{I18n.t('selectLanguage.placeholder')}</Text>
          )}
        </Hoverable>
        <TextInput
          style={styles.introduction}
          value={introduction || ''}
          onChangeText={onChangeTextIntroduction}
          maxLength={200}
          placeholder={I18n.t('editMyProfile.placeholderIntroduction')}
          multiline
          numberOfLines={3}
          spellCheck
          autoCorrect
          underlineColorAndroid="transparent"
          onBlur={onBlurIntroduction}
        />
        <Space size={32} />
      </KeyboardAwareScrollView>
      <KeyboardHideButton
        isKeyboard={isKeyboard}
        setIsKeyboard={setIsKeyboard}
      />
    </View>
  );
};

export default EditMyProfileScreen;
