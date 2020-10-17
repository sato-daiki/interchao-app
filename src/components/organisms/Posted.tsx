import React, { useState, useEffect, ReactNode, useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import { Diary, Profile } from '../../types';
import MyDiaryCorrection from './MyDiaryCorrection';
import { Correction } from '../../types/correction';
import { getCorrection } from '../../utils/corrections';
import { GrayHeader, Space, ShareButton } from '../atoms';
import I18n from '../../utils/I18n';
import DiaryOriginal from './DiaryOriginal';
import { appShare, diaryShare } from '../../utils/common';

export interface Props {
  diary: Diary;
  profile: Profile;
  isEditing: boolean;
  onPressUser: (uid: string, userName: string) => void;
  onPressReview: (correctedNum: number) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  viewShot: {
    paddingTop: 12,
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  activityIndicator: {
    marginVertical: 16,
  },
  shareButton: {
    width: 300,
    alignSelf: 'center',
  },
});

/**
 * 日記詳細
 */
const Posted: React.FC<Props> = ({
  profile,
  diary,
  isEditing,
  onPressUser,
  onPressReview,
}) => {
  const viewShotRef = useRef<ViewShot | null>(null);
  const [correction, setCorrection] = useState<Correction>();
  const [correction2, setCorrection2] = useState<Correction>();
  const [correction3, setCorrection3] = useState<Correction>();
  const [isCorrectionLoading, setIsCorrectionLoading] = useState(true);

  useEffect(() => {
    const f = async (): Promise<void> => {
      // 添削がある場合データを取得
      if (diary.correction) {
        const newCorrection = await getCorrection(diary.correction.id);
        if (newCorrection) {
          setCorrection(newCorrection);
        }
      }
      if (diary.correction2) {
        const newCorrection = await getCorrection(diary.correction2.id);
        if (newCorrection) {
          setCorrection2(newCorrection);
        }
      }
      if (diary.correction3) {
        const newCorrection = await getCorrection(diary.correction3.id);
        if (newCorrection) {
          setCorrection3(newCorrection);
        }
      }
      setIsCorrectionLoading(false);
    };
    f();
  }, [diary]);

  const onPressShare = async (): Promise<void> => {
    if (viewShotRef?.current?.capture) {
      const imageUrl = await viewShotRef.current.capture();
      diaryShare(profile.nativeLanguage, imageUrl);
      return;
    }

    appShare(profile.nativeLanguage);
  };

  const { isReview, isReview2, isReview3 } = diary;

  const renderMyDiaryCorrection = (
    correctedNum: number,
    prmCorrection: Correction,
    prmIsReview: boolean | undefined
  ): ReactNode => {
    return (
      <MyDiaryCorrection
        isReview={prmIsReview}
        isEditing={isEditing}
        nativeLanguage={profile.nativeLanguage}
        textLanguage={profile.learnLanguage}
        correction={prmCorrection}
        onPressUser={onPressUser}
        onPressReview={(): void => onPressReview(correctedNum)}
      />
    );
  };

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
            title={diary.title}
            text={diary.text}
          />
          {isCorrectionLoading ? (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="small" />
            </View>
          ) : (
            <>
              {correction ? (
                <GrayHeader title={I18n.t('myDiaryCorrection.header')} />
              ) : null}
              {correction
                ? renderMyDiaryCorrection(1, correction, isReview)
                : null}
              {correction2
                ? renderMyDiaryCorrection(2, correction2, isReview2)
                : null}
              {correction3
                ? renderMyDiaryCorrection(3, correction3, isReview3)
                : null}
            </>
          )}
          <Space size={16} />
        </ViewShot>
        <Space size={48} />
        <View style={styles.shareButton}>
          {Platform.OS === 'web' || isEditing ? null : (
            <ShareButton onPressShare={onPressShare} />
          )}
        </View>
        <Space size={32} />
      </ScrollView>
    </View>
  );
};

export default Posted;
