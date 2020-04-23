import { connect } from 'react-redux';
import EditMyProfileScreen, { Props } from '../screens/EditMyProfileScreen';
import { setProfile } from '../stores/actions/profile';
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
)(EditMyProfileScreen);
