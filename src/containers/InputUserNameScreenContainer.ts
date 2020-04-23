import { connect } from 'react-redux';
import { setProfile } from '../stores/actions/profile';
import InputUserNameScreen, { Props } from '../screens/InputUserNameScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  profile: state.rootReducer.profile,
});

const mapDispatchToProps = {
  setProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputUserNameScreen);
