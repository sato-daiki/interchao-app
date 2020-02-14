import { connect } from 'react-redux';
import { setUser } from '../stores/actions/user';
import SignUpScreen, { Props, DispatchProps } from '../screens/SignUpScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
});

const mapDispatchToProps: DispatchProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
