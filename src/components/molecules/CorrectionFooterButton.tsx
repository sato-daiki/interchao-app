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
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: offWhite,
  },
  footerButton: {
    marginBottom: 32,
    backgroundColor: '#fff',
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
