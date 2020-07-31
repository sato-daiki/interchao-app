import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
} from '../../styles/Common';
import {
  CorrectingOriginalText,
  CorrectingRightIcon,
  CorrectingFixText,
} from '../atoms';
import { Diff, TextInfo } from '../../types';
const jsdiff = require('diff');

interface Props {
  item: TextInfo;
  editText: (textInfo: TextInfo) => void;
  editFirst: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  row: {
    flexDirection: 'row',
  },
  original: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.1,
    marginRight: 46,
  },
  textInput: {
    lineHeight: fontSizeM * 1,
    fontSize: fontSizeM,
    color: subTextColor,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: borderLightColor,
    flexWrap: 'wrap',
    marginRight: 46,
  },
});

const CorrectingListItem: React.FC<Props> = ({ item, editText, editFirst }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(item.original);
  const [diffs, setDiffs] = useState<Diff[]>([]);

  const onEndEditing = () => {
    if (item.original === text) {
      // 変更がない場合は初期化
      setDiffs([]);
      editText({
        rowNumber: item.rowNumber,
        original: item.original,
        fix: null,
        detail: null,
        diff: null,
      });
    } else {
      const newDiff = jsdiff.diffChars(item.original, text);
      setDiffs(newDiff);
      editText({
        rowNumber: item.rowNumber,
        original: item.original,
        fix: text,
        // TODO
        detail: 'string | null',
        diff: newDiff,
      });
      editFirst();
    }
    setIsEdit(false);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => setIsEdit(true)}>
      <View
        style={[
          styles.row,
          { alignItems: diffs.length === 0 ? 'center' : 'flex-start' },
        ]}
      >
        <CorrectingOriginalText original={item.original} diffs={diffs} />
        {isEdit ? null : (
          <CorrectingRightIcon
            isDiff={diffs.length === 0}
            onPress={() => setIsEdit(true)}
          />
        )}
      </View>
      {isEdit ? (
        <TextInput
          onEndEditing={onEndEditing}
          autoFocus
          style={styles.textInput}
          autoCapitalize="none"
          spellCheck
          autoCorrect
          underlineColorAndroid="transparent"
          value={text}
          onChangeText={(text: string) => setText(text)}
          defaultValue={item.original}
          multiline
          returnKeyType="done"
          blurOnSubmit
          scrollEnabled={false}
        />
      ) : (
        <CorrectingFixText diffs={diffs} />
      )}
    </TouchableOpacity>
  );
};

export default CorrectingListItem;
