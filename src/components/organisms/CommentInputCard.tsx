import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Comment } from '../../types';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  mainColor,
  subTextColor,
  offWhite,
} from '../../styles/Common';
import { Space } from '../atoms';

interface Props {
  item: Comment;
  onPressCard: (startWordIndex: number, endWordIndex: number) => void;
  onPressDelete: (id: string) => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: mainColor,
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 9,
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  label: {
    color: subTextColor,
    fontSize: fontSizeM,
    paddingBottom: 4,
  },
  title: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    color: primaryColor,
    paddingBottom: 16,
    lineHeight: fontSizeM * 1.3,
  },
  line: {
    alignSelf: 'center',
    width: '100%',
    marginHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 16,
  },
  textInput: {
    lineHeight: fontSizeM * 1.3,
    fontSize: fontSizeM,
    color: primaryColor,
    paddingHorizontal: 8,
    paddingVertical: 14,
    textAlignVertical: 'top',
    backgroundColor: offWhite,
    borderRadius: 6,
    borderColor: borderLightColor,
    flexWrap: 'wrap',
  },
  closeIcon: {
    position: 'absolute',
    right: 6,
    top: 6,
  },
});

const CommentInputCard: React.FC<Props> = ({
  item,
  onPressCard,
  onPressDelete,
}) => {
  const { original, id, startWordIndex, endWordIndex } = item;
  return (
    <TouchableWithoutFeedback
      onPress={(): void => onPressCard(startWordIndex, endWordIndex)}
    >
      <View style={[styles.container]}>
        <View style={styles.closeIcon}>
          <TouchableOpacity onPress={(): void => onPressDelete(id)}>
            <MaterialCommunityIcons
              name="close"
              size={22}
              color={primaryColor}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>原文</Text>
        <Text style={styles.title}>{original}</Text>
        <View style={styles.line} />
        <Text style={styles.label}>修正文</Text>
        <TextInput
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          style={styles.textInput}
          defaultValue={original}
          multiline
        />
        <Space size={16} />
        <View style={styles.line} />
        <Text style={styles.label}>コメント</Text>
        <TextInput
          autoCorrect={false}
          underlineColorAndroid="transparent"
          style={styles.textInput}
          multiline
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentInputCard;
