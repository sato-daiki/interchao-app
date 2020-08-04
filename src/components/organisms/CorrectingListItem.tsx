import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as jsdiff from 'diff';
import I18n from '../../utils/I18n';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
  offWhite,
} from '../../styles/Common';
import { CorrectingOriginalText, CorrectingFixText, Space } from '../atoms';
import { Diff, TextInfo } from '../../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  icon: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
  },
  rowEdited: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  original: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.1,
    marginRight: 38,
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
    flexWrap: 'wrap',
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

const CorrectingListItem: React.FC<Props> = ({ item, editText, editFirst }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [fix, setFix] = useState(item.original);
  const [detail, setDetail] = useState('');
  const [diffs, setDiffs] = useState<Diff[] | null>(null);
  const refDetail = useRef<any>(null);

  const onEndEditingFix = () => {
    if (item.original === fix) {
      // 変更がない場合は初期化
      setDiffs([]);
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
  };

  const onEndEditingDetail = (): void => {
    editText({
      detail,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsEdit(true)}>
        {!diffs ? (
          <View style={styles.rowNoEdit}>
            <Text style={styles.text}>{item.original}</Text>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                size={28}
                color={primaryColor}
                name="pen"
              />
            </View>
          </View>
        ) : (
          <CorrectingOriginalText original={item.original} diffs={diffs} />
        )}
        {isEdit ? (
          <TextInput
            onEndEditing={onEndEditingFix}
            autoFocus
            style={styles.textInput}
            autoCapitalize="none"
            spellCheck
            autoCorrect
            underlineColorAndroid="transparent"
            value={fix}
            onChangeText={(text: string) => setFix(text)}
            defaultValue={item.original}
            multiline
            blurOnSubmit
            scrollEnabled={false}
          />
        ) : (
          <>
            {!diffs ? null : (
              <>
                <Space size={16} />
                <CorrectingFixText fix={fix} diffs={diffs} />
              </>
            )}
          </>
        )}
      </TouchableOpacity>
      {!isEdit && diffs ? (
        <>
          <TouchableOpacity
            style={styles.buttonRow}
            onPress={() => {
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
            autoCapitalize="none"
            spellCheck
            autoCorrect
            underlineColorAndroid="transparent"
            value={detail}
            onEndEditing={onEndEditingDetail}
            onChangeText={(text: string) => setDetail(text)}
            multiline
            scrollEnabled={false}
          />
        </>
      ) : null}
    </View>
  );
};

export default CorrectingListItem;
