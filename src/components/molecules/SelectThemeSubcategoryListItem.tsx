import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';

import { DiaryStatus, Hoverable } from '@/components/atoms';

import {
  borderLightColor,
  fontSizeM,
  fontSizeS,
  hoverGray,
  primaryColor,
  subTextColor,
} from '@/styles/Common';
import { MY_STATUS } from '@/utils/diary';
import { getDay } from '@/utils/time';
import { ThemeSubcategoryInfo } from '@/screens/SelectThemeSubcategoryScreen/interface';
import { ThemeDiary } from '@/types';

interface Props {
  themeDiary?: ThemeDiary;
  item: ThemeSubcategoryInfo;
  title: string;
  source: ImageSourcePropType;
  onPress: (item: ThemeSubcategoryInfo) => void;
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
    flexDirection: 'row',
    alignItems: 'center',
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
    width: 36,
    height: 36,
    marginRight: 16,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
});

const SelectThemeSubcategoryListItem: React.FC<Props> = ({
  themeDiary,
  item,
  source,
  title,
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
        <Text style={styles.title}>{title}</Text>
        {themeDiary ? (
          <View style={styles.textRight}>
            <Text style={styles.postDayText}>
              {getDay(themeDiary.updatedAt)}
            </Text>
            <DiaryStatus
              color={MY_STATUS.posted.color}
              text={MY_STATUS.posted.text}
            />
          </View>
        ) : null}
      </View>
    </Hoverable>
  );
};

export default React.memo(SelectThemeSubcategoryListItem);
