import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {
  borderLightColor,
  fontSizeM,
  fontSizeS,
  hoverGray,
  primaryColor,
  subTextColor,
} from '@/styles/Common';
import { DiaryStatus, Hoverable } from '@/components/atoms';
import { MY_STATUS } from '@/utils/diary';

interface Props {
  item: any;
  title: string;
  text: string;
  source: ImageSourcePropType;
  onPress: (item: any) => void;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  hover: {
    backgroundColor: hoverGray,
  },
  textContainer: {
    flex: 1,
  },
  textHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postDayText: {
    color: subTextColor,
    fontSize: fontSizeS,
    marginRight: 8,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  title: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
    paddingBottom: 8,
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
});

const ImageListItem: React.FC<Props> = ({
  item,
  source,
  title,
  text,
  onPress,
}) => {
  const onPressItem = useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  return (
    <Hoverable
      style={styles.container}
      hoverStyle={styles.hover}
      onPress={onPressItem}
    >
      <Image style={styles.image} source={source} />
      <View style={styles.textContainer}>
        <View style={styles.textHeader}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.textRight}>
            <Text style={styles.postDayText}>111</Text>
            <DiaryStatus
              color={MY_STATUS.posted.color}
              text={MY_STATUS.posted.text}
            />
          </View>
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Hoverable>
  );
};

export default React.memo(ImageListItem);
