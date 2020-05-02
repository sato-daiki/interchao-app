import { connect } from 'react-redux';
import { State } from '../types/state';
import ReviewListScreen, { Props } from '../screens/ReviewListScreen';

const mapStateToProps = (state: State): Props => {
  const { profile } = state.rootReducer;

  return {
    profile,
  };
};

export default connect(mapStateToProps)(ReviewListScreen);
