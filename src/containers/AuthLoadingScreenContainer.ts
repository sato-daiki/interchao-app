import { connect } from 'react-redux';
import { setUser } from '../stores/actions/user';
import { setProfile } from '../stores/actions/profile';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const mapDispatchToProps = {
  setUser,
  setProfile,
};

export default connect(null, mapDispatchToProps)(AuthLoadingScreen);
