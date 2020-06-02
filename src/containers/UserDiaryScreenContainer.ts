import { connect } from 'react-redux';
import { State } from '../types/state';
import { setUser } from '../stores/actions/user';
import UserDiaryScreen, { Props } from '../screens/UserDiaryScreen';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
    profile: state.rootReducer.profile,
  };
};

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDiaryScreen);
