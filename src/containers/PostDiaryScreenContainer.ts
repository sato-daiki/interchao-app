import { connect } from 'react-redux';
import { State } from '../types/state';
import { setPoints } from '../stores/actions/user';
import PostDiaryScreen from '../screens/PostDiaryScreen';

const mapStateToProps = (state: State) => {
  return {
    currentUser: state.rootReducer.user,
    currentProfile: state.rootReducer.profile,
  };
};

const mapDispatchToProps = {
  setPoints,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDiaryScreen);
