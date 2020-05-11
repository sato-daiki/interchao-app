import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, subTextColor, offWhite } from '../../styles/Common';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: Platform.OS === 'ios' ? 56 : 64,
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
    width,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: offWhite,
    borderRadius: 18,
    paddingHorizontal: 16,
    margin: 8,
    marginLeft: Platform.OS === 'ios' ? 8 : 0,
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
