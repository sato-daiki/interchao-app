import { connect } from 'react-redux';
import { setUser } from '../stores/actions/user';
import { setProfile } from '../stores/actions/profile';
import { restoreUid } from '../stores/actions/localStatus';
import AuthLoadingScreen, { Props } from '../screens/AuthLoadingScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => {
  return {
    localStatus: state.rootReducer.localStatus,
  };
};

const mapDispatchToProps = {
  setUser,
  setProfile,
  restoreUid,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
