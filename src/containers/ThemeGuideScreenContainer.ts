import { connect } from 'react-redux';
import { State } from '@/types/state';
// @ts-ignore
import ThemeGuideScreen, { Props } from '@/screens/ThemeGuideScreen';

const mapStateToProps = (state: State): Props => {
  const { profile } = state.rootReducer;
  return {
    profile,
  };
};

export default connect(mapStateToProps)(ThemeGuideScreen);
