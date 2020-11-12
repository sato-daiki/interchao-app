import { SubcatergoryInfo } from '@/screens/SelectSubcategoryScreen/interface';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ListRenderItem } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Modal } from '../../template';
import { getEntries } from './util';
import { Entry } from './interface';
import ThemeGuideIntroduction from './ThemeGuideIntroduction';
import ThemeGuideTip from './ThemeGuideTip';

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
});

interface Props {
  subcatergoryInfo: SubcatergoryInfo;
  visible: boolean;
  onPessClose: () => void;
}

const ModalThemeGuide: React.FC<Props> = ({
  subcatergoryInfo,
  visible,
  onPressClose,
}) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const newEntries = getEntries(subcatergoryInfo.key);
    if (newEntries) {
      setEntries(newEntries);
    }
  }, [subcatergoryInfo, subcatergoryInfo.key]);

  const renderItem: ListRenderItem<Entry> = useCallback(
    ({ item }) => {
      switch (item.key) {
        case 'introduction':
          return (
            <ThemeGuideIntroduction
              title={subcatergoryInfo.title}
              source={subcatergoryInfo.source}
              params={item.params}
            />
          );
        case 'tip':
          return <ThemeGuideTip params={item.params} />;
        default:
          return null;
      }
    },
    [subcatergoryInfo.source, subcatergoryInfo.title]
  );

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Carousel
          // ref={c => {
          //   this._carousel = c;
          // }}
          data={entries}
          renderItem={renderItem}
          sliderWidth={500}
          itemWidth={500}
        />
      </View>
    </Modal>
  );
};

export default ModalThemeGuide;
