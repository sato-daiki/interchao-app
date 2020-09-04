import { connect } from 'react-redux';
import { setUser } from '../stores/actions/user';
import { setProfile } from '../stores/actions/profile';
import AuthLoadingScreen, { Props } from '../screens/AuthLoadingScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
    profile: state.rootReducer.profile,
  };
};

const mapDispatchToProps = {
  setUser,
  setProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
