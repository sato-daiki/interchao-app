import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, primaryColor, borderLightColor } from '../../styles/Common';

interface Props {
  summary: string;
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
  },
});

const SummaryCard = ({
  summary,
  isEdit = false,
  onPressMore,
}: Props): JSX.Element | null => {
  if (!summary || summary.length === 0) {
    return null;
  }
  return (
    <View style={styles.container}>
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
      <Text style={styles.title}>まとめ</Text>
      <View style={styles.line} />
      <Text style={styles.text}>{summary}</Text>
    </View>
  );
};

export default SummaryCard;
