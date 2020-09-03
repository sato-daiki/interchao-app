import { connect } from 'react-redux';
import { setUser } from '../stores/actions/user';
import InitializeNativeScreen, {
  Props,
} from '../screens/InitializeNativeScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
});

const mapDispatchToProps = {
  setUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitializeNativeScreen);
