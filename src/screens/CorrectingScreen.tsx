import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { split } from 'sentence-splitter';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  HeaderLeft,
  HeaderButton,
  LoadingModal,
  Space,
} from '../components/atoms';
import { CorrectingHeader, KeyboardHideButton } from '../components/molecules';
import ModalCorrectingDone from '../components/organisms/ModalCorrectingDone';
import ModalTimeUp from '../components/organisms/ModalTimeUp';

import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import { User, Diary, Profile, Correction, TextInfo, Diff } from '../types';
import I18n from '../utils/I18n';
import { getUsePoints } from '../utils/diary';
import { getProfile } from '../utils/profile';
import { updateDone, onUpdateTimeUp, onClose } from '../utils/correcting';
import { getCorrection } from '../utils/corrections';
import CorrectingListItem from '../components/organisms/CorrectingListItem';
import {
  mainColor,
  fontSizeM,
  subTextColor,
  primaryColor,
} from '../styles/Common';
import Corrections from '../components/organisms/Corrections';

export interface Props {
  user: User;
  currentProfile: Profile;
  teachDiary: Diary;
}

interface DispatchProps {
  setUser: (user: User) => void;
  editTeachDiary: (objectID: string, diary: Diary) => void;
}

type Info =
  | {
      fix: string | null;
      diffs: Diff[] | null;
    }
  | {
      detail: string | null;
    };

type ScreenType = React.ComponentType<
  Props & DispatchProps & NavigationStackScreenProps
> & {
  navigationOptions:
    | NavigationStackOptions
    | ((props: NavigationStackScreenProps) => NavigationStackOptions);
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    backgroundColor: '#FFF',
    // flex: 1,
  },
  scrollView: {
    paddingBottom: 32,
  },
  header: {
    paddingTop: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 12,
  },
  label: {
    fontSize: fontSizeM,
    color: subTextColor,
    marginLeft: 2,
  },
  textInputSummary: {
    lineHeight: fontSizeM * 1,
    fontSize: fontSizeM,
    color: primaryColor,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
});

/**
 * 添削中
 */
const CorrectingScreen: ScreenType = ({
  navigation,
  user,
  currentProfile,
  teachDiary,
  setUser,
  editTeachDiary,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // keyboardはshowはKeyboardのaddListenerで管理し、HideはTextInputのendeditingで管理
  const [isKeyboard, setIsKeyboard] = useState(false);

  // Profile関連
  const [targetProfile, setTargetProfile] = useState<Profile>();
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isCorrectionLoading, setIsCorrectionLoading] = useState(true);
  const [correction, setCorrection] = useState<Correction>();
  const [correction2, setCorrection2] = useState<Correction>();

  const [isModalDone, setIsModalDone] = useState(false); // 投稿完了後のアラートモーダル
  const [isModalTimeUp, setIsModalTimeUp] = useState(false); // タイムアップモーダル

  /* 総評関連 */
  const [summary, setSummary] = useState(''); // まとめ

  /* テキストの情報 */
  const [textInfos, setTextInfos] = useState<TextInfo[]>([]); // まとめ

  /* 一つでも修正したらたつフラグ */
  const [isFirstEdit, setIsFirstEdit] = useState(false);

  const refSummary = useRef<any>(null);

  const initTextsInfo = useCallback((): void => {
    const splitTexts = split(teachDiary.text);
    const newTextInfos = splitTexts
      .filter(i => i.raw.trim().length > 0)
      .map((item, index) => {
        return {
          rowNumber: index,
          original: item.raw,
          fix: null,
          detail: null,
          diffs: null,
        };
      });
    setTextInfos(newTextInfos);
  }, [teachDiary.text]);

  /**
   * 閉じる処理
   */
  const close = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isLoading) return;
      setIsLoading(true);
      await onClose(
        isLoading,
        teachDiary,
        setIsLoading,
        user,
        editTeachDiary,
        setUser,
        navigation
      );
      setIsLoading(false);
    };
    f();
  }, [editTeachDiary, isLoading, navigation, setUser, teachDiary, user]);

  const getNewProfile = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!teachDiary) return;
      const newProfile = await getProfile(teachDiary.profile.uid);
      if (newProfile) {
        setTargetProfile(newProfile);
      }
      setIsProfileLoading(false);
    };
    f();
  }, [teachDiary]);

  const getNewCorrection = useCallback(() => {
    const f = async (): Promise<void> => {
      if (!teachDiary) return;
      if (teachDiary.correction) {
        const newCorrection = await getCorrection(teachDiary.correction.id);
        if (newCorrection) {
          setCorrection(newCorrection);
        }
      }
      if (teachDiary.correction2) {
        const newCorrection = await getCorrection(teachDiary.correction2.id);
        if (newCorrection) {
          setCorrection2(newCorrection);
        }
      }
      setIsCorrectionLoading(false);
    };
    f();
  }, [teachDiary]);

  useEffect(() => {
    const f = async (): Promise<void> => {
      initTextsInfo();
      // プロフィールを取得
      await Promise.all([getNewProfile(), getNewCorrection()]);
    };
    f();
  }, [getNewCorrection, getNewProfile, initTextsInfo]);

  /**
   * 完了する
   */
  const onPressSubmitButton = useCallback(() => {
    const f = async (): Promise<void> => {
      const comments = textInfos.filter(item => item.diffs !== null);
      if (comments.length === 0) {
        Alert.alert('', I18n.t('correcting.nothing'));
        return;
      }
      if (isLoading) return;
      setIsLoading(true);

      await updateDone({
        summary,
        teachDiary,
        currentProfile,
        user,
        comments,
        editTeachDiary,
        setUser,
      });

      setIsLoading(false);
      setIsModalDone(true);
    };
    f();
  }, [
    textInfos,
    teachDiary,
    isLoading,
    currentProfile,
    user,
    summary,
    editTeachDiary,
    setUser,
  ]);

  /**
   * 左上の閉じるボタンが押下された時の処理
   */
  const onPressClose = useCallback(() => {
    Alert.alert(
      I18n.t('common.confirmation'),
      I18n.t('correcting.deleteAlert'),
      [
        {
          text: I18n.t('common.cancel'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async (): Promise<void> => {
            await close();
          },
        },
      ],
      { cancelable: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * ヘッダーに初期値設定
   */
  useEffect(() => {
    navigation.setParams({
      isFirstEdit,
      onPressClose,
      onPressSubmitButton,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstEdit, onPressSubmitButton]);

  /*
   * 添削完了
   */
  const onPressCloseDone = useCallback(() => {
    navigation.navigate('TeachDiaryList');
    setIsModalDone(false);
  }, [navigation]);

  /**
   * 30分が経過した時の処理
   */
  const onTimeUp = useCallback(() => {
    const f = async (): Promise<void> => {
      await onUpdateTimeUp(
        teachDiary,
        user,
        setIsLoading,
        editTeachDiary,
        setUser,
        setIsModalTimeUp
      );
    };
    f();
  }, [editTeachDiary, setUser, teachDiary, user]);

  /**
   * タイムアップ後のアラート画面での遷移
   */
  const onPressCloseTimeUp = useCallback(() => {
    navigation.navigate('TeachDiaryList');
  }, [navigation]);

  /* キーボード閉じる */
  const onHideKeyboard = (): void => {
    setIsKeyboard(false);
  };

  const getPoints = getUsePoints(
    teachDiary.text.length,
    teachDiary.profile.learnLanguage
  );

  const editText = useCallback(
    (index: number, info: Info): void => {
      const newTextInfos = textInfos.map(item => {
        if (item.rowNumber === index) {
          return {
            ...item,
            ...info,
          };
        }
        return item;
      });
      setTextInfos(newTextInfos);
    },
    [textInfos]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: TextInfo; index: number }): JSX.Element => {
      return (
        <CorrectingListItem
          item={item}
          editText={(info: Info): void => editText(index, info)}
          editFirst={(): void => setIsFirstEdit(true)}
          onHideKeyboard={onHideKeyboard}
        />
      );
    },
    [editText]
  );

  const listHeaderComponent = useCallback(() => {
    return (
      <View style={styles.header}>
        <CorrectingHeader
          isProfileLoading={isProfileLoading}
          teachDiary={teachDiary}
          targetProfile={targetProfile}
          onTimeUp={onTimeUp}
        />
      </View>
    );
  }, [isProfileLoading, teachDiary, targetProfile, onTimeUp]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <LoadingModal visible={isLoading} />
        <ModalTimeUp
          visible={isModalTimeUp}
          onPressClose={onPressCloseTimeUp}
        />
        <ModalCorrectingDone
          visible={isModalDone}
          getPoints={getPoints}
          points={user.points}
          onPressClose={onPressCloseDone}
        />
        <KeyboardAwareScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={32}
        >
          <FlatList
            data={textInfos}
            keyExtractor={(item: TextInfo): string => String(item.rowNumber)}
            renderItem={renderItem}
            ListHeaderComponent={listHeaderComponent}
          />
          {isFirstEdit ? (
            <>
              <TouchableOpacity
                style={styles.buttonRow}
                onPress={(): void => {
                  refSummary.current.focus();
                }}
              >
                <MaterialCommunityIcons
                  size={22}
                  color={subTextColor}
                  name="plus"
                />
                <Text style={styles.label}>{I18n.t('correcting.summary')}</Text>
              </TouchableOpacity>
              {/* まとめは改行がある。他のはない */}
              <TextInput
                ref={refSummary}
                style={styles.textInputSummary}
                value={summary}
                multiline
                autoCapitalize="none"
                spellCheck
                autoCorrect
                underlineColorAndroid="transparent"
                scrollEnabled={false}
                onChangeText={(text: string): void => setSummary(text)}
                onBlur={onHideKeyboard}
              />
            </>
          ) : null}
          {correction ? <Space size={32} /> : null}
          <Corrections
            headerTitle={I18n.t('correcting.header')}
            correction={correction}
            correction2={correction2}
            textLanguage={teachDiary.profile.learnLanguage}
            nativeLanguage={currentProfile.nativeLanguage}
          />
          <Space size={32} />
        </KeyboardAwareScrollView>
      </View>
      <KeyboardHideButton
        isKeyboard={isKeyboard}
        setIsKeyboard={setIsKeyboard}
      />
    </SafeAreaView>
  );
};

CorrectingScreen.navigationOptions = ({
  navigation,
}): NavigationStackOptions => {
  const isFirstEdit = navigation.getParam('isFirstEdit');
  const onPressSubmitButton = navigation.getParam('onPressSubmitButton');
  const onPressClose = navigation.getParam('onPressClose');
  return {
    ...DefaultNavigationOptions,
    title: I18n.t('correcting.headerTitle'),
    headerLeft: (): JSX.Element => (
      <HeaderLeft text={I18n.t('common.close')} onPress={onPressClose} />
    ),
    headerRight: (): JSX.Element | null =>
      isFirstEdit ? (
        <HeaderButton
          title={I18n.t('correcting.titleDone')}
          color={mainColor}
          onPress={onPressSubmitButton}
        />
      ) : null,
  };
};

export default CorrectingScreen;
