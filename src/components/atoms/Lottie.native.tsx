import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleProp, ViewStyle } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  source: {
    uri: string;
  };
  autoPlay: boolean;
  loop: boolean;
};

const Lottie: React.FC<Props> = React.forwardRef(
  ({ style, source, autoPlay, loop }): JSX.Element => {
    return (
      <LottieView
        style={style}
        source={source}
        autoPlay={autoPlay}
        loop={loop}
      />
    );
  }
);

export default Lottie;
