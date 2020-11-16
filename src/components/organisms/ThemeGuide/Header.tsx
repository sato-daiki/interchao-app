import React, { useCallback } from 'react';
import { Heading, HoverableIcon, Space } from '@/components/atoms';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
}

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 24,
    zIndex: 100,
  },
});

const Header: React.FC<Props> = ({ title }) => {
  const navigation = useNavigation();
  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View>
      <HoverableIcon
        icon="community"
        name="close"
        size={24}
        style={styles.close}
        onPress={onPressClose}
      />
      <Space size={24} />
      <Heading title={title} />
      <Space size={24} />
    </View>
  );
};

export default React.memo(Header);
