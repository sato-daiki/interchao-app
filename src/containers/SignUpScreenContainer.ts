import { connect } from 'react-redux';
import { setProfile } from '../stores/actions/profile';
import { setUser } from '../stores/actions/user';
import SignUpScreen from '../screens/SignUpScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State) => ({
  user: state.rootReducer.user,
  profile: state.rootReducer.profile,
});

const mapDispatchToProps = {
  setUser,
  setProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
