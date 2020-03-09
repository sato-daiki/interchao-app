import { connect } from 'react-redux';
import EditUserNameScreen from '../screens/EditUserNameScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State) => ({
  profile: state.rootReducer.profile,
});

export default connect(mapStateToProps)(EditUserNameScreen);
