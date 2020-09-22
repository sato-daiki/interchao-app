import React, { useRef } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { ShareButton, Space } from '../atoms';
import DiaryOriginal from './DiaryOriginal';

import { Diary, Profile } from '../../types';

export interface Props {
  diary: Diary;
  profile: Profile;
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
  shareButton: {
    width: 300,
    alignSelf: 'center',
  },
});

const FairCopy: React.FC<Props> = ({ diary, profile }) => {
  const viewShotRef = useRef<ViewShot | null>(null);

  return (
    <View style={styles.container}>
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
        <Space size={48} />
        <View style={styles.shareButton}>
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
