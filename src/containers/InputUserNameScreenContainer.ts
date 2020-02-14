import { connect } from 'react-redux';
import { setUser } from '../stores/actions/user';
import InputUserNameScreen, {
  Props,
  DispatchProps,
} from '../screens/InputUserNameScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
});

const mapDispatchToProps: DispatchProps = {
  setUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputUserNameScreen);
