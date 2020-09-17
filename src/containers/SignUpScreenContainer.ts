import { connect } from 'react-redux';
import { signIn } from '../stores/actions/localStatus';
import { setUser } from '../stores/actions/user';
import { setProfile } from '../stores/actions/profile';

import SignUpScreen, { Props } from '../screens/SignUpScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  profile: state.rootReducer.profile,
});

const mapDispatchToProps = {
  signIn,
  setUser,
  setProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
