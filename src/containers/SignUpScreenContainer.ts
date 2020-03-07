import { connect } from 'react-redux';
import SignUpScreen from '../screens/SignUpScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State) => ({
  profile: state.rootReducer.profile,
});

export default connect(mapStateToProps)(SignUpScreen);
