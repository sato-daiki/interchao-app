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
import { Language } from '../../types';
import googleTranslate from '../../utils/googleTranslate';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  summary: string;
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
    borderColor: primaryColor,
  },
  icon: {
    position: 'absolute',
    top: 8,
    right: 12,
    zIndex: 1,
  },
  title: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    color: primaryColor,
    paddingBottom: 16,
  },
  line: {
    alignSelf: 'center',
    width: '100%',
    marginHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  text: {
    paddingTop: 16,
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
  row: {
    flexDirection: 'row',
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

const SummaryCard = ({
  containerStyle,
  summary,
  isEdit = false,
  nativeLanguage,
  onPressMore,
}: Props): JSX.Element | null => {
  const [displaySummary, setDisplaySummary] = useState(summary);
  const [isTranslated, setIsTranslated] = useState(false);

  const onPressTranslate = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isTranslated) {
        setDisplaySummary(summary);
        setIsTranslated(false);
      } else {
        const mentionRemovedText = summary.replace(/@\w+\s/g, '');
        if (nativeLanguage) {
          const translatedText = await googleTranslate(
            mentionRemovedText,
            nativeLanguage
          );
          if (translatedText && translatedText.length > 0) {
            setDisplaySummary(translatedText);
            setIsTranslated(true);
          }
        }
      }
    };
    f();
  }, [isTranslated, nativeLanguage, summary]);
  if (!summary || summary.length === 0) {
    return null;
  }

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
      <View style={styles.row}>
        <Text style={styles.title}>{I18n.t('summaryCard.title')}</Text>
        {nativeLanguage ? (
          <TouchableOpacity onPress={onPressTranslate}>
            <Text style={styles.translation}>
              {I18n.t('common.translation')}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.line} />
      <Text style={[styles.text, isTranslated ? styles.italic : undefined]}>
        {displaySummary}
      </Text>
    </View>
  );
};

export default SummaryCard;
