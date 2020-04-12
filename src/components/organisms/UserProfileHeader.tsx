import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizeM, primaryColor } from '../../styles/Common';
import { Profile, UserReview } from '../../types';
import { ProfileLanguage } from '../molecules';
import { ScoreStar, Space, ProfileIconHorizontal } from '../atoms';

interface Props {
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
    paddingBottom: 8,
  },
  introduction: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
    paddingBottom: 16,
  },
});

const UserProfileHeader = ({ profile, userReview }: Props): JSX.Element => {
  return (
    <View style={styles.profileContainer}>
      <ProfileIconHorizontal
        userName={profile.userName}
        photoUrl={profile.photoUrl}
      />
      <Space size={16} />
      {profile.name ? <Text style={styles.name}>{profile.name}</Text> : null}
      {userReview ? (
        <ScoreStar score={userReview.score} reviewNum={userReview.reviewNum} />
      ) : null}
      <Space size={8} />
      <Text style={styles.introduction}>{profile.introduction}</Text>
      <ProfileLanguage
        nativeLanguage={profile.nativeLanguage}
        learnLanguage={profile.learnLanguage}
      />
    </View>
  );
};

export default UserProfileHeader;
