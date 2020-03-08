import { connect } from 'react-redux';
import MyProfileEditScreen from '../screens/MyProfileEditScreen';
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
)(MyProfileEditScreen);
