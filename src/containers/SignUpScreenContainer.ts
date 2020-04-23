import { connect } from 'react-redux';
import SignUpScreen, { Props } from '../screens/SignUpScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  profile: state.rootReducer.profile,
});

export default connect(mapStateToProps)(SignUpScreen);
