import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fontSizeM, mainColor } from '../../styles/Common';
import I18n from '../../utils/I18n';

interface Props {
  hidden: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  hidden: {
    color: mainColor,
    fontSize: fontSizeM,
    marginBottom: 16,
    textAlign: 'center',
  },
});

const HideButton: React.FC<Props> = ({
  hidden,
  onPress,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.hidden}>
        {hidden
          ? I18n.t('myDiaryCorrection.show')
          : I18n.t('myDiaryCorrection.hide')}
      </Text>
    </TouchableOpacity>
  );
};

export default HideButton;
