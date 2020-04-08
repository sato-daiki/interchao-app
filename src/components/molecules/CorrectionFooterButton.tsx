import React from 'react';
import { View, StyleSheet } from 'react-native';
import { offWhite } from '../../styles/Common';
import { TextButtun } from '../atoms';

interface Props {
  nextActionText: string;
  onPressNextAction: () => void;
  onPressHowTo: () => void;
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  footerButton: {
    backgroundColor: offWhite,
  },
});

const CorrectionFooterButton: React.FC<Props> = ({
  nextActionText,
  onPressNextAction,
  onPressHowTo,
}) => {
  return (
    <View style={styles.footer}>
      {nextActionText ? (
        <TextButtun
          isBorrderTop
          title={nextActionText}
          onPress={onPressNextAction}
        />
      ) : null}
      <View style={styles.footerButton}>
        <TextButtun
          isBorrderTop
          isBorrderBottom
          title="添削の仕方"
          onPress={onPressHowTo}
        />
      </View>
    </View>
  );
};

export default CorrectionFooterButton;
