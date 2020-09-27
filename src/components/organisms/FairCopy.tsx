import React, { useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { GrayHeader, ShareButton, Space, WhiteButton } from '../atoms';
import DiaryOriginal from './DiaryOriginal';

import { Diary, Profile } from '../../types';
import { mainColor, primaryColor } from '../../styles/Common';
import ModalSpeech from './ModalSpeech';
import ModalVoice from './ModalVoice';

export interface Props {
  diary: Diary;
  profile: Profile;
  goToRecord: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  viewShot: {
    backgroundColor: '#FFF',
    paddingTop: 12,
  },
  scrollView: {
    flex: 1,
  },
  containerStyle: {
    justifyContent: 'center',
  },
  button: {
    width: 300,
    alignSelf: 'center',
    marginBottom: 16,
  },
});

const FairCopy: React.FC<Props> = ({ diary, profile, goToRecord }) => {
  const [visibleSpeech, setVisibleSpeech] = useState(false);
  const [visibleVoice, setVisibleVoice] = useState(false);

  const viewShotRef = useRef<ViewShot | null>(null);

  const iconHeader = <AntDesign size={22} color={primaryColor} name="like1" />;

  const iconMachine = (
    <MaterialCommunityIcons size={22} color={mainColor} name="volume-high" />
  );

  const iconRecord = (
    <MaterialCommunityIcons size={24} color={mainColor} name="microphone" />
  );

  const iconMyVoice = (
    <MaterialCommunityIcons size={22} color={mainColor} name="headphones" />
  );

  return (
    <View style={styles.container}>
      <ModalSpeech
        visible={visibleSpeech}
        text={diary.fairCopyText || diary.text}
        textLanguage={profile.learnLanguage}
        onClose={(): void => setVisibleSpeech(false)}
      />
      {diary.voiceUrl && visibleVoice ? (
        <ModalVoice
          visible={visibleVoice}
          text={diary.fairCopyText || diary.text}
          voiceUrl={diary.voiceUrl}
          afterClose={(): void => setVisibleVoice(false)}
        />
      ) : null}

      <ScrollView style={styles.scrollView}>
        <ViewShot
          style={styles.viewShot}
          ref={viewShotRef}
          options={{ format: 'jpg', quality: 0.9 }}
        >
          <DiaryOriginal
            diary={diary}
            profile={profile}
            title={diary.fairCopyTitle || diary.title}
            text={diary.fairCopyText || diary.text}
          />
        </ViewShot>
        <Space size={24} />
        <GrayHeader
          titleStyle={styles.containerStyle}
          icon={iconHeader}
          title="音読練習をする"
        />
        <Space size={24} />
        {diary.voiceUrl ? (
          <WhiteButton
            containerStyle={styles.button}
            icon={iconMyVoice}
            title="自分の音声を聞く"
            onPress={(): void => setVisibleVoice(true)}
          />
        ) : null}
        <WhiteButton
          containerStyle={styles.button}
          icon={iconMachine}
          title="機械の音声を聞く"
          onPress={(): void => setVisibleSpeech(true)}
        />
        <WhiteButton
          containerStyle={styles.button}
          title="音声を録音する"
          icon={iconRecord}
          onPress={goToRecord}
        />
        <Space size={32} />
        <View style={styles.button}>
          {Platform.OS !== 'web' ? (
            <ShareButton
              viewShotRef={viewShotRef}
              nativeLanguage={profile.nativeLanguage}
            />
          ) : null}
        </View>
        <Space size={32} />
      </ScrollView>
    </View>
  );
};

export default FairCopy;
