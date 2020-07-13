import { connect } from 'react-redux';
import SignUpScreen, { Props } from '../screens/SignUpScreen';
import { setUser } from '../stores/actions/user';
import { setProfile } from '../stores/actions/profile';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  profile: state.rootReducer.profile,
});

const mapDispatchToProps = {
  setUser,
  setProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
