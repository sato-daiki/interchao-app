import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { fontSizeM, primaryColor } from '../../styles/Common';
import { Profile, UserReview } from '../../types';
import { ProfileLanguage } from '../molecules';
import { GrayHeader, ScoreStar, Space, ProfileIconHorizontal } from '../atoms';

interface Props {
  loadingProfile: boolean;
  diaryTotalNum: number;
  profile: Profile;
  userReview?: UserReview | null;
}

const styles = StyleSheet.create({
  profileContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  name: {
    fontSize: fontSizeM,
    color: primaryColor,
    fontWeight: 'bold',
  },
  introduction: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
});

const UserProfileHeader = ({
  loadingProfile,
  diaryTotalNum,
  profile,
  userReview,
}: Props): JSX.Element => {
  return (
    <>
      <View style={styles.profileContainer}>
        {loadingProfile ? (
          <ActivityIndicator />
        ) : (
          <>
            <ProfileIconHorizontal
              userName={profile.userName}
              photoUrl={profile.photoUrl}
            />
            {profile.name ? (
              <>
                <Space size={16} />
                <Text style={styles.name}>{profile.name}</Text>
              </>
            ) : null}
            {userReview ? (
              <>
                <Space size={8} />
                <ScoreStar
                  score={userReview.score}
                  reviewNum={userReview.reviewNum}
                />
              </>
            ) : null}
            <Text style={styles.introduction}>{profile.introduction}</Text>
            <ProfileLanguage
              nativeLanguage={profile.nativeLanguage}
              learnLanguage={profile.learnLanguage}
            />
          </>
        )}
      </View>
      <GrayHeader
        title={
          diaryTotalNum !== 0 ? `日記一覧(${diaryTotalNum}件)` : '日記一覧'
        }
      />
    </>
  );
};

export default UserProfileHeader;
