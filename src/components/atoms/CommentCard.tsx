import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  mainColor,
  subTextColor,
} from '../../styles/Common';
import I18n from '../../utils/I18n';
import googleTranslate from '../../utils/googleTranslate';
import { Language } from '../../types';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  index: number;
  original: string;
  fix: string;
  detail: string;
  isEdit?: boolean;
  nativeLanguage?: Language;
  onPressMore?: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
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
    borderColor: mainColor,
  },
  icon: {
    position: 'absolute',
    top: 8,
    right: 12,
    zIndex: 1,
  },
  label: {
    color: subTextColor,
    fontSize: fontSizeM,
    paddingBottom: 4,
  },
  originalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  original: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
    paddingLeft: 4,
    fontWeight: 'bold',
  },
  index: {
    fontSize: fontSizeM,
    color: primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  line: {
    alignSelf: 'center',
    width: '100%',
    margin: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  fix: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
  detail: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  translation: {
    color: mainColor,
  },
  italic: {
    color: subTextColor,
    fontStyle: 'italic',
  },
});

const CommentCard = ({
  containerStyle,
  index,
  original,
  fix,
  detail,
  isEdit = false,
  nativeLanguage,
  onPressMore,
}: Props): JSX.Element => {
  const [displayDetail, setDisplayDetail] = useState(detail);
  const [isTranslated, setIsTranslated] = useState(false);

  const onPressTranslate = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isTranslated) {
        setDisplayDetail(detail);
        setIsTranslated(false);
      } else {
        const mentionRemovedText = detail.replace(/@\w+\s/g, '');
        if (nativeLanguage) {
          const translatedText = await googleTranslate(
            mentionRemovedText,
            nativeLanguage
          );
          if (translatedText && translatedText.length > 0) {
            setDisplayDetail(translatedText);
            setIsTranslated(true);
          }
        }
      }
    };
    f();
  }, [detail, isTranslated, nativeLanguage]);

  const indexText = `${index + 1}.`;
  return (
    <View style={[styles.container, containerStyle]}>
      {isEdit ? (
        <View style={styles.icon}>
          <TouchableOpacity onPress={onPressMore}>
            <MaterialCommunityIcons
              size={28}
              color={primaryColor}
              name="dots-horizontal"
            />
          </TouchableOpacity>
        </View>
      ) : null}
      <Text style={styles.label}>{I18n.t('commentCard.original')}</Text>
      <View style={styles.originalContainer}>
        <Text style={styles.index}>{indexText}</Text>
        <Text style={styles.original}>{original}</Text>
      </View>
      <View style={styles.line} />
      <Text style={styles.label}>{I18n.t('commentCard.fix')}</Text>
      <Text style={styles.fix}>{fix}</Text>
      <View style={styles.line} />
      <View style={styles.row}>
        <Text style={styles.label}>{I18n.t('commentCard.detail')}</Text>
        {nativeLanguage ? (
          <TouchableOpacity onPress={onPressTranslate}>
            <Text style={styles.translation}>
              {I18n.t('common.translation')}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <Text style={[styles.detail, isTranslated ? styles.italic : undefined]}>
        {displayDetail}
      </Text>
    </View>
  );
};

export default CommentCard;
