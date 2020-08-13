import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as jsdiff from 'diff';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import I18n from '../../utils/I18n';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
} from '../../styles/Common';
import { CorrectingText, Space } from '../atoms';
import { Diff, TextInfo } from '../../types';

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
    flex: 1,
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
  detailLabel: {
    fontSize: fontSizeM,
    color: subTextColor,
  },
  textInput: {
    lineHeight: fontSizeM * 1,
    fontSize: fontSizeM,
    color: subTextColor,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    // flexWrap: 'wrap',
    marginRight: 38,
  },
  buttonRow: {
    marginLeft: -4,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  textInputDetail: {
    marginRight: 16,
    lineHeight: fontSizeM * 1,
    fontSize: fontSizeM,
    color: primaryColor,
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
  const refDetail = useRef<any>(null);

  const onEndEditingFix = (): void => {
    if (item.original === fix) {
      // 変更がない場合は初期化
      setDiffs(null);
      editText({
        fix: null,
        diffs: null,
      });
    } else {
      const newDiff = jsdiff.diffChars(item.original, fix).map(d => {
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
  };

  const onEndEditingDetail = (): void => {
    editText({
      detail,
    });
    onHideKeyboard();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={(): void => setIsEdit(true)}>
        {diffs === null ? (
          <View style={styles.rowNoEdit}>
            <Text style={styles.text}>{item.original}</Text>
            <View style={styles.pen}>
              <MaterialCommunityIcons
                size={28}
                color={primaryColor}
                name="pen"
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
        {isEdit ? (
          <TextInput
            style={styles.textInput}
            defaultValue={item.original}
            value={fix}
            multiline
            blurOnSubmit
            autoFocus
            autoCapitalize="none"
            spellCheck
            autoCorrect
            underlineColorAndroid="transparent"
            returnKeyType="done"
            scrollEnabled={false}
            onChangeText={(text: string): void => setFix(text)}
            onEndEditing={onEndEditingFix}
          />
        ) : (
          <>
            {!diffs ? null : (
              <>
                <Space size={16} />
                <CorrectingText
                  isOrigin={false}
                  isMenu={false}
                  text={fix || ''}
                  diffs={diffs}
                />
              </>
            )}
          </>
        )}
      </TouchableOpacity>
      {!isEdit && diffs ? (
        <>
          <TouchableOpacity
            style={styles.buttonRow}
            onPress={(): void => {
              refDetail.current.focus();
            }}
          >
            <MaterialCommunityIcons
              size={22}
              color={subTextColor}
              name="plus"
            />
            <Text style={styles.detailLabel}>
              {I18n.t('commentCard.detail')}
            </Text>
          </TouchableOpacity>
          <TextInput
            ref={refDetail}
            style={styles.textInputDetail}
            value={detail}
            multiline
            blurOnSubmit
            autoCapitalize="none"
            spellCheck
            autoCorrect
            underlineColorAndroid="transparent"
            returnKeyType="done"
            scrollEnabled={false}
            onEndEditing={onEndEditingDetail}
            onChangeText={(text: string): void => setDetail(text)}
          />
        </>
      ) : null}
    </View>
  );
};

export default CorrectingListItem;
