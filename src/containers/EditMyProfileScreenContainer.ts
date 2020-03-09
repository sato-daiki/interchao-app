import { connect } from 'react-redux';
import EditMyProfileScreen from '../screens/EditMyProfileScreen';
import { setProfile } from '../stores/actions/profile';
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
)(EditMyProfileScreen);
