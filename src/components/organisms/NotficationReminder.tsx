import React, { useCallback, useEffect, useState } from 'react';
import * as Permissions from 'expo-permissions';
import I18n from '@/utils/I18n';
import { mainColor } from '@/styles/Common';
import { Note } from '@/components/atoms';

const NotficationReminder = (): JSX.Element => {
  const [visible, setVisible] = useState(true);
  const [isPermission, setIsPermission] = useState(true);

  useEffect(() => {
    const f = async (): Promise<void> => {
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        setIsPermission(false);
      } else {
        setIsPermission(true);
      }
    };

    f();
  }, []);

  const onPressClose = useCallback(async (): Promise<void> => {
    setVisible(false);
  }, []);

  // 出力条件アプリ、通知の設定がしていない場合
  return (
    <Note
      text={I18n.t('reminderSelectTime.notficationAlert')}
      backgroundColor={mainColor}
      color="#fff"
      visible={!isPermission && visible}
      onPressClose={onPressClose}
    />
  );
};

export default React.memo(NotficationReminder);
