import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageProps,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { primaryColor, fontSizeM } from '../../styles/Common';
import { Space, SubmitButton } from '../atoms';

const { width } = Dimensions.get('window');
const baseWidth = width - 80;

interface Props {
  index: number;
  item: Item;
  isLoading: boolean;
  entriesLength: number;
  buttonText: string;
  onPress: () => void;
}

interface Item {
  text: string;
  subText?: string;
  image: ImageProps;
  width: number;
  height: number;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  imageContainer: {
    width: baseWidth + 8,
    height: 320,
    borderWidth: 2,
    borderColor: primaryColor,
    borderRadius: 8,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    color: primaryColor,
    textAlign: 'left',
  },
  subText: {
    paddingTop: 16,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    color: primaryColor,
    textAlign: 'left',
  },
  image: {
    alignSelf: 'center',
  },
});

const TutorialCorrectingListItem: React.FC<Props> = ({
  index,
  item,
  isLoading,
  entriesLength,
  buttonText,
  onPress,
}: Props): JSX.Element | null => {
  if (index !== entriesLength - 1)
    return (
      <View style={styles.container}>
        {item.image ? (
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              style={[
                styles.image,
                {
                  width: baseWidth,
                  height: (baseWidth * item.height) / item.width,
                },
              ]}
              resizeMode="contain"
            />
          </View>
        ) : null}
        <Space size={16} />
        <Text style={styles.text}>{item.text}</Text>
        {item.subText ? (
          <Text style={styles.subText}>{item.subText}</Text>
        ) : null}
      </View>
    );
  return (
    <View style={styles.container}>
      <Space size={16} />
      <Text style={styles.text}>{item.text}</Text>
      <Space size={32} />
      <MaterialCommunityIcons
        size={60}
        color={primaryColor}
        name="spellcheck"
      />
      <Space size={32} />
      <SubmitButton
        isLoading={isLoading}
        title={buttonText}
        onPress={onPress}
      />
    </View>
  );
};

export default TutorialCorrectingListItem;
