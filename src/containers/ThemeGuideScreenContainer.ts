import { connect } from 'react-redux';
import { State } from '@/types/state';
// @ts-ignore
import ThemeGuideScreen from '@/screens/ThemeGuideScreen/ThemeGuideScreen';
import { Props } from '@/screens/ThemeGuideScreen/interfaces';

const mapStateToProps = (state: State): Props => {
  const { profile } = state.rootReducer;
  return {
    profile,
  };
};

export default connect(mapStateToProps)(ThemeGuideScreen);
