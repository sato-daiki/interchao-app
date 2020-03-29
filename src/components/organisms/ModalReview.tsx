import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  offWhite,
  fontSizeM,
} from '../../styles/Common';
import { Modal } from '../template';
import { SubmitButton, WhiteButton, Space } from '../atoms';
import { UserListItem } from '../molecules';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    paddingBottom: 16,
    textAlign: 'center',
  },
  line: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
  },
  review: {
    padding: 16,
    borderBottomColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 170,
    backgroundColor: offWhite,
  },
  text: {
    textAlign: 'center',
    fontSize: fontSizeM,
    color: primaryColor,
  },
});

interface Props {
  visible: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  userName: string;
  photoUrl: string;
  onPressSubmit: (rating: number, comment: string) => void;
  onPressClose: () => void;
}

const ModalReview: React.FC<Props> = ({
  visible,
  isLoading,
  isSuccess,
  userName,
  photoUrl,
  onPressSubmit,
  onPressClose,
}: Props): JSX.Element | null => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const onPressFavorite = useCallback(() => {}, []);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>添削のお礼とレビュー</Text>
        <View style={styles.line} />
        {!isSuccess ? (
          <>
            <UserListItem
              userName={userName}
              photoUrl={photoUrl}
              onPressButton={onPressFavorite}
            />
            <Space size={24} />
            <AirbnbRating
              showRating={false}
              defaultRating={0}
              onFinishRating={(num: number): void => setRating(num)}
            />
            <Space size={24} />
            <TextInput
              value={comment}
              onChangeText={(text: string): void => setComment(text)}
              maxLength={140}
              placeholder="コメント（任意）"
              multiline
              numberOfLines={3}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              style={styles.review}
            />
            <Space size={32} />
            <SubmitButton
              isLoading={isLoading}
              title="送信する"
              onPress={(): void => onPressSubmit(rating, comment)}
            />
            <Space size={16} />
            <WhiteButton title="キャンセル" onPress={onPressClose} />
          </>
        ) : (
          <>
            <Text style={styles.text}>
              レビューありがとうがとうございます。10ポイント獲得。
            </Text>
            <Space size={32} />
            <WhiteButton title="閉じる" onPress={onPressClose} />
          </>
        )}
      </View>
    </Modal>
  );
};

export default ModalReview;
