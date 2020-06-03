import React from 'react';
import {
  View,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Text,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, primaryColor } from '../../styles/Common';
import I18n from '../../utils/I18n';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  onPressShare: () => void;
  onPressFacebook: () => void;
  onPressTwitter: () => void;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeM,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    borderRadius: 24,
    borderColor: primaryColor,
    borderWidth: 3,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});

const Sns: React.FC<Props> = ({
  onPressShare,
  onPressFacebook,
  onPressTwitter,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{I18n.t('sns.title')}</Text>
    <View style={styles.row}>
      <TouchableOpacity style={styles.icon} onPress={onPressFacebook}>
        <MaterialCommunityIcons
          size={28}
          color={primaryColor}
          name="facebook"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={onPressTwitter}>
        <MaterialCommunityIcons size={24} color={primaryColor} name="twitter" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={onPressShare}>
        <MaterialCommunityIcons
          size={24}
          color={primaryColor}
          name="share-variant"
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default Sns;
