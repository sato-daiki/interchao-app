import { connect } from 'react-redux';
import { State } from '../types/state';
import { setUser } from '../stores/actions/user';
import { setProfile } from '../stores/actions/profile';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const mapStateToProps = (state: State) => {
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
