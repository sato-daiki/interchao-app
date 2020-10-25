import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInputTitle, TextInputText } from '../atoms';

interface Props {
  title: string;
  text: string;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  titleInput: {
    paddingVertical: 16,
  },
});

const PostDiaryKeybordWeb = ({
  title,
  text,
  onChangeTextTitle,
  onChangeTextText,
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <TextInputTitle
          style={styles.titleInput}
          value={title}
          onChangeText={onChangeTextTitle}
        />
        <TextInputText value={text} onChangeText={onChangeTextText} />
      </View>
    </View>
  );
};

export default React.memo(PostDiaryKeybordWeb);
