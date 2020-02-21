import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Rating } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
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
    paddingBottom: 24,
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
  name: string;
  photoUrl: string;
  onPressClose: () => void;
}

const ModalReview: React.FC<Props> = ({
  visible,
  name,
  photoUrl,
  onPressClose,
}: Props): JSX.Element | null => {
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const onPressUser = useCallback(() => {}, []);
  const onPressFavorite = useCallback(() => {}, []);

  const onPressSubmit = useCallback(() => {
    setIsSuccess(true);
  }, []);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>添削のお礼とレビュー</Text>
        <View style={styles.line} />
        {!isSuccess ? (
          <>
            <UserListItem
              name={name}
              photoUrl={photoUrl}
              onPressUser={onPressUser}
              onPressButton={onPressFavorite}
            />
            <Space size={24} />
            <Rating imageSize={40} startingValue={rating} />
            <Space size={24} />
            <TextInput
              value={review}
              onChangeText={(text: string): void => setReview(text)}
              maxLength={200}
              placeholder="任意"
              multiline
              numberOfLines={3}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              style={styles.review}
            />
            <Space size={32} />
            <SubmitButton title="送信する" onPress={onPressSubmit} />
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
