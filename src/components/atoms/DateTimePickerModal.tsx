import React from 'react';
import RNDateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker';

type Props = {
  mode: 'time' | 'date';
  isVisible: boolean;
  date: Date;
  onConfirm: (value: Date) => void;
  onCancel: () => void;
} & ReactNativeModalDateTimePickerProps;

const DateTimePickerModal: React.FC<Props> = ({
  mode,
  isVisible,
  date,
  onConfirm,
  onCancel,
  ...props
}) => (
  <RNDateTimePickerModal
    isVisible={isVisible}
    date={date ?? undefined} // initial select date
    mode={mode}
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
);

export default React.memo(DateTimePickerModal);
