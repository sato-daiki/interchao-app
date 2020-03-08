import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  subTextColor,
} from '../../styles/Common';
// import TotalStatus from './TotalStatus';

interface Status {
  text: string;
  color: string;
}

interface Props {
  postDay: string;
  status: Status | null;
  title: string;
  text: string;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
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
    paddingBottom: 16,
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 32,
  },
});

const DiaryOriginal = ({
  postDay,
  status,
  title,
  text,
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.postDayText}>{postDay}</Text>
        {/* {status ? (
          <TotalStatus color={status.color} text={status.text} />
        ) : null} */}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default DiaryOriginal;
