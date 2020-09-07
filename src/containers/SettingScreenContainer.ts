import { connect } from 'react-redux';
import SettingScreen from '../screens/SettingScreen';
import { signOut } from '../stores/actions/localStatus';

const mapDispatchToProps = {
  signOut,
};

export default connect(null, mapDispatchToProps)(SettingScreen);
