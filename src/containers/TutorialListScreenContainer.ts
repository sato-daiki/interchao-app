import { connect } from 'react-redux';
import { State } from '../types/state';
import TutorialListScreen, { Props } from '../screens/TutorialListScreen';

const mapStateToProps = (state: State): Props => {
  const { profile } = state.rootReducer;
  return {
    profile,
  };
};

export default connect(mapStateToProps)(TutorialListScreen);
