import { connect } from 'react-redux';
import { setUser } from '../stores/actions/user';
import SignInScreen, { Props, DispatchProps } from '../screens/SignInScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
});

const mapDispatchToProps: DispatchProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
