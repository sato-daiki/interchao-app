import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import {
  Space,
  SubmitButton,
  AddButton,
  HoverableIcon,
} from '@/components/atoms';
import { LanguageRadioBox } from '@/components/molecules';
import ModalSpokenLanguages from '@/components/organisms/ModalSpokenLanguages';
import { ModalConfirm } from '@/components/organisms';

import { primaryColor, fontSizeL, fontSizeM } from '@/styles/Common';
import I18n from '@/utils/I18n';

import { getLanguage, getTargetLanguages, getLanguageNum } from '@/utils/diary';
import SelectLanguageWeb from '@/components/organisms/SelectLanguageWeb';
import SelectLanguageNative from '@/components/organisms/SelectLanguageNative';
import { useSelectLanguage } from './useSelectLanguage';
import { ScreenType } from './interface';

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 32,
    alignItems: Platform.OS === 'web' ? 'center' : 'flex-start',
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    paddingBottom: 16,
  },
  label: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
    paddingBottom: 6,
  },
  rowSpoken: {
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
    alignItems: 'center',
  },
});

/**
 * 概要：学びたい言語とネイティブの言語の登録
 */
const SelectLanguageScreen: React.FC<ScreenType> = ({
  navigation,
  profile,
  setProfile,
}) => {
  const {
    nationalityCode,
    learnLanguage,
    nativeLanguage,
    spokenLanguages,
    isModalError,
    spokenVisible,
    errorMessage,
    onPressCloseError,
    onPressSpokenLanguages,
    onPressCloseSpoken,
    onPressLearnLanguage,
    onPressNativeLanguage,
    onPressDeleteSpokenLanguages,
    onPressAdd,
    onPressNext,
    setNationalityCode,
  } = useSelectLanguage({
    navigation,
    profile,
    setProfile,
  });

  return (
    <View style={styles.contaner}>
      <ModalConfirm
        visible={isModalError}
        title={I18n.t('common.error')}
        message={errorMessage}
        mainButtonText={I18n.t('common.close')}
        onPressMain={onPressCloseError}
      />
      {/* <ModalSpokenLanguages
        visible={spokenVisible}
        languages={getTargetLanguages(
          learnLanguage,
          nativeLanguage,
          spokenLanguages
        )}
        onPressSubmit={onPressSpokenLanguages}
        onPressClose={onPressCloseSpoken}
      /> */}
      <Text style={styles.title}>{I18n.t('selectLanguage.title')}</Text>
      <LanguageRadioBox
        label={I18n.t('selectLanguage.learn')}
        value={learnLanguage}
        onPress={onPressLearnLanguage}
      />
      <Space size={16} />
      <LanguageRadioBox
        label={I18n.t('selectLanguage.native')}
        value={nativeLanguage}
        onPress={onPressNativeLanguage}
      />
      <Space size={16} />

      {/*  2022/3/31 言語を日本語と英語に一旦絞る
      <Text style={styles.label}>{I18n.t('selectLanguage.spoken')}</Text>
      {spokenLanguages.map((item) => (
        <View style={styles.rowSpoken} key={item}>
          <Text style={styles.spoken}>{getLanguage(item)}</Text>
          <HoverableIcon
            icon='community'
            size={22}
            hoverBorderRadius={32}
            color={primaryColor}
            name='trash-can-outline'
            style={styles.trash}
            onPress={(): void => onPressDeleteSpokenLanguages(item)}
          />
        </View>
      ))}
      {spokenLanguages.length < getLanguageNum() - 2 ? (
        <AddButton onPress={onPressAdd} />
      ) : null}

      <Space size={24} /> */}
      <Text style={styles.label}>{I18n.t('selectLanguage.nationality')}</Text>

      {Platform.OS === 'web' ? (
        <SelectLanguageWeb
          nationalityCode={nationalityCode}
          setNationalityCode={setNationalityCode}
          navigation={navigation}
        />
      ) : (
        <SelectLanguageNative
          nationalityCode={nationalityCode}
          setNationalityCode={setNationalityCode}
        />
      )}
      <Space size={32} />
      <SubmitButton title={I18n.t('common.next')} onPress={onPressNext} />
    </View>
  );
};

export default SelectLanguageScreen;
