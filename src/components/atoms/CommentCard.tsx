import React from 'react';
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

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  index: number;
  original: string;
  fix: string;
  detail: string;
  isEdit?: boolean;
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
});

const CommentCard = ({
  containerStyle,
  index,
  original,
  fix,
  detail,
  isEdit = false,
  onPressMore,
}: Props): JSX.Element => {
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
      <Text style={styles.label}>{I18n.t('commentCard.detail')}</Text>
      <Text style={styles.detail}>{detail}</Text>
    </View>
  );
};

export default CommentCard;
