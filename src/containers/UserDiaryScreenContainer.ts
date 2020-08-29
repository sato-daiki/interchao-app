import { connect } from 'react-redux';
import { State } from '../types/state';
import UserDiaryScreen, { Props } from '../screens/UserDiaryScreen';

const mapStateToProps = (state: State): Props => {
  const { profile } = state.rootReducer;
  return {
    profile,
  };
};

export default connect(mapStateToProps)(UserDiaryScreen);
