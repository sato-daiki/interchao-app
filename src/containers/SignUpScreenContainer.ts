import { connect } from 'react-redux';
import { signIn } from '../stores/actions/localStatus';

import SignUpScreen, { Props } from '../screens/SignUpScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  profile: state.rootReducer.profile,
});

const mapDispatchToProps = {
  signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
