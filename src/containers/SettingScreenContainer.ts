import { connect } from 'react-redux';
import SettingScreen, { Props } from '../screens/SettingScreen';
import { signOut } from '../stores/actions/localStatus';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  profile: state.rootReducer.profile,
});

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
