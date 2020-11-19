import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
  green,
} from '@/styles/Common';
import { MyDiaryStatus } from '@/components/molecules';
import { getAlgoliaDay } from '@/utils/time';
import { Diary } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import I18n from '@/utils/I18n';

interface Props {
  item: Diary;
  handlePress: (objectID: string) => void;
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    paddingRight: 16,
  },
  rightContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  postDayText: {
    color: subTextColor,
    fontSize: fontSizeS,
  },
  title: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
    paddingBottom: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    textAlign: 'left',
    flex: 1,
  },
});

const EditMyDiaryListItem = ({ item, handlePress }: Props): JSX.Element => {
  const { createdAt, title, text, themeCategory, themeSubcategory } = item;
  const [checked, setChecked] = useState(false);
  const postDay = getAlgoliaDay(createdAt);

  const onPress = useCallback(() => {
    if (!item.objectID) return;
    setChecked(!checked);
    handlePress(item.objectID);
  }, [checked, handlePress, item.objectID]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <MaterialCommunityIcons
            size={22}
            color={checked ? green : borderLightColor}
            name={checked ? 'check-circle' : 'checkbox-blank-circle'}
          />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.header}>
            <Text style={styles.postDayText}>{postDay}</Text>
            <MyDiaryStatus diary={item} />
          </View>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            {themeCategory && themeSubcategory
              ? `${I18n.t('selectDiaryType.titleTheme')} - ${title}`
              : title}
          </Text>
          <View style={styles.content}>
            <Text style={styles.text} ellipsizeMode="tail" numberOfLines={3}>
              {text}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(EditMyDiaryListItem);
