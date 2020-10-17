import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextButtun, TextInputTitle, TextInputText } from '../atoms';
import I18n from '../../utils/I18n';

interface Props {
  title: string;
  text: string;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressDraft: () => void;
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
  footer: {
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 16,
    marginBottom: 16,
  },
});

const PostDiaryKeybordWeb = ({
  title,
  text,
  onChangeTextTitle,
  onChangeTextText,
  onPressDraft,
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
      <View style={styles.footer}>
        <TextButtun
          title={I18n.t('postDiaryComponent.draft')}
          onPress={onPressDraft}
        />
      </View>
    </View>
  );
};

export default React.memo(PostDiaryKeybordWeb);
