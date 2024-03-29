import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Platform, TextInput } from 'react-native';
import * as jsdiff from 'diff';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
} from '../../styles/Common';
import { Space, AutoHeightTextInput, Hoverable } from '../atoms';
import { Diff, TextInfo } from '../../types';
import CorrectingCommentNative from './CorrectingCommentNative';
import CorrectingCommentWeb from './CorrectingCommentWeb';
import { CorrectingText } from '../molecules';

type Info =
  | {
      fix: string | null;
      diffs: Diff[] | null;
    }
  | {
      detail: string | null;
    };

interface Props {
  item: TextInfo;
  editText: (info: Info) => void;
  editFirst: () => void;
  onHideKeyboard: () => void;
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  rowNoEdit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.1,
    marginRight: 38,
  },
  pen: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
  },
  textInput: {
    lineHeight: fontSizeM * 1.1,
    fontSize: fontSizeM,
    color: subTextColor,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    marginRight: 38,
  },
  textInputWeb: {
    marginTop: 12,
  },
});

const CorrectingListItem: React.FC<Props> = ({
  item,
  editText,
  editFirst,
  onHideKeyboard,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [fix, setFix] = useState(item.original);
  const [detail, setDetail] = useState('');
  const [diffs, setDiffs] = useState<Diff[] | null>(null);

  const onBlurFix = useCallback((): void => {
    if (item.original === fix) {
      // 変更がない場合は初期化
      setDiffs(null);
      editText({
        fix: null,
        diffs: null,
      });
    } else {
      const newDiff = jsdiff.diffChars(item.original, fix).map((d) => {
        return {
          count: d.count,
          added: d.added || null,
          removed: d.removed || null,
          value: d.value,
        };
      }) as Diff[];
      setDiffs(newDiff);
      editText({
        fix,
        diffs: newDiff,
      });
      editFirst();
    }
    setIsEdit(false);
    onHideKeyboard();
  }, [editFirst, editText, fix, item.original, onHideKeyboard]);

  const onPressEdit = useCallback((): void => {
    setIsEdit(true);
  }, []);

  const onBlurDetail = useCallback((): void => {
    editText({
      detail,
    });
    onHideKeyboard();
  }, [detail, editText, onHideKeyboard]);

  const onChangeTextComment = useCallback(
    (value): void => {
      setDetail(value);
      editText({
        detail: value,
      });
    },
    [editText],
  );

  const renderFix = useCallback(() => {
    if (!isEdit) {
      return (
        <>
          {!diffs ? null : (
            <Hoverable onPress={onPressEdit}>
              <Space size={16} />
              <CorrectingText
                isOrigin={false}
                isMenu={false}
                text={fix || ''}
                diffs={diffs}
              />
            </Hoverable>
          )}
        </>
      );
    }

    if (Platform.OS === 'web') {
      return (
        <AutoHeightTextInput
          style={styles.textInputWeb}
          defaultValue={item.original}
          value={fix}
          autoFocus
          onChangeText={setFix}
          onBlur={onBlurFix}
        />
      );
    }
    return (
      <TextInput
        style={styles.textInput}
        defaultValue={item.original}
        value={fix}
        multiline
        blurOnSubmit
        autoFocus
        autoCapitalize='none'
        spellCheck
        autoCorrect
        underlineColorAndroid='transparent'
        returnKeyType='done'
        scrollEnabled={false}
        onChangeText={setFix}
        onBlur={onBlurFix}
      />
    );
  }, [diffs, fix, isEdit, item.original, onBlurFix, onPressEdit]);

  const renderComment = useCallback(() => {
    if (!diffs) return null;

    if (Platform.OS === 'web') {
      return (
        <CorrectingCommentWeb
          detail={detail}
          onChangeText={onChangeTextComment}
        />
      );
    }
    return (
      <CorrectingCommentNative
        detail={detail}
        onBlur={onBlurDetail}
        onChangeText={setDetail}
      />
    );
  }, [detail, diffs, onBlurDetail, onChangeTextComment]);

  return (
    <View style={styles.container}>
      <Hoverable onPress={onPressEdit}>
        {!diffs ? (
          <View style={styles.rowNoEdit}>
            <Text style={styles.text}>{item.original}</Text>
            <View style={styles.pen}>
              <MaterialCommunityIcons
                size={28}
                color={primaryColor}
                name='pen'
              />
            </View>
          </View>
        ) : (
          <CorrectingText
            isMenu={false}
            isOrigin
            text={item.original}
            diffs={diffs}
          />
        )}
      </Hoverable>
      {renderFix()}
      {renderComment()}
    </View>
  );
};

export default React.memo(CorrectingListItem);
