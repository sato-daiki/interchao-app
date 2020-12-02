import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { DateTimePickerModal, TimeBox } from '../atoms';

type Props = {
  date: Date;
  isError: boolean;
  onChange: (date: Date) => void;
};

const TimePicker: React.FC<Props> = ({ date, isError, onChange, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  // handlers
  const onConfirm = useCallback(
    (value: Date) => {
      // 注意: 最初にVisibleについてupdateする必要あり
      // ※Android2回表示バグ対策： https://github.com/react-native-community/datetimepicker/issues/54#issuecomment-552951685
      setIsVisible(false);

      // visibleのupdate後にonChangeを動かす
      onChange(value);
    },
    [onChange]
  );

  const onCancel = useCallback(() => {
    setIsVisible(false);
  }, []);

  const onPress = useCallback(() => {
    setIsVisible(true);
  }, []);

  return (
    <View>
      <TimeBox isError={isError} onPress={onPress} date={date} />
      <DateTimePickerModal
        isVisible={isVisible}
        date={date ?? undefined} // initial select date
        mode="time"
        display="spinner"
        minuteInterval={5}
        is24Hour
        onConfirm={onConfirm}
        onCancel={onCancel}
        headerTextIOS="時刻を選択して下さい"
        cancelTextIOS="キャンセル"
        confirmTextIOS="設定"
        locale="ja"
        {...props}
      />
    </View>
  );
};

export default React.memo(TimePicker);
