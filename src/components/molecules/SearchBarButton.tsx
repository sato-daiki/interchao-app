import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, subTextColor, offWhite } from '../../styles/Common';
import { getEachOS } from '../../utils/common';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: getEachOS({ ios: 16, android: 0, web: 0 }),
    width: width - getEachOS({ ios: 56, android: 64, web: 70 }),
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: offWhite,
    borderRadius: 18,
    paddingHorizontal: 16,
    marginLeft: getEachOS({ ios: 8, android: 0, web: 8 }),
    paddingVertical: getEachOS({ ios: 0, android: 0, web: 4 }),
    height: 30,
  },
  icon: {
    paddingRight: 4,
  },
  label: {
    color: subTextColor,
    fontSize: fontSizeM,
    lineHeight: 20,
  },
});

interface Props {
  title?: string;
  onPress: () => void;
}

const SearchBarButton: React.FC<Props> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            color={subTextColor}
            size={18}
            name="magnify"
          />
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBarButton;
