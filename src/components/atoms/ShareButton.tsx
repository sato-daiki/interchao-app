import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, primaryColor } from '../../styles/Common';
import I18n from '../../utils/I18n';
import { Language } from '../../types';
import { appShare } from '../../utils/common';
import Hoverable from './Hoverable';

interface Props {
  viewShotRef: any;
  nativeLanguage: Language;
}

const styles = StyleSheet.create({
  contaner: {
    flexDirection: 'row',
    borderRadius: 22,
    borderColor: primaryColor,
    borderWidth: 3,
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 8,
    color: primaryColor,
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

const ShareButton: React.FC<Props> = ({
  viewShotRef,
  nativeLanguage,
}: Props): JSX.Element => {
  const onPressShare = async (): Promise<void> => {
    if (Platform.OS === 'ios') {
      const imageUrl = await viewShotRef.current.capture();
      appShare(nativeLanguage, imageUrl);
    } else {
      appShare(nativeLanguage);
    }
  };
  return (
    <Hoverable style={styles.contaner} onPress={onPressShare}>
      <MaterialCommunityIcons
        size={24}
        color={primaryColor}
        name="share-variant"
      />
      <Text style={styles.title}>
        {I18n.t(Platform.OS === 'ios' ? 'sns.diary' : 'sns.app')}
      </Text>
    </Hoverable>
  );
};

export default ShareButton;
