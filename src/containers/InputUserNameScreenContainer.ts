import { connect } from 'react-redux';
import { setProfile } from '../stores/actions/profile';
import InputUserNameScreen from '../screens/InputUserNameScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State) => ({
  profile: state.rootReducer.profile,
});

const mapDispatchToProps = {
  setProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputUserNameScreen);
