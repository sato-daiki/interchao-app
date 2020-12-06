import { connect } from 'react-redux';
import PushSettingScreen, { Props } from '@/screens/PushSettingScreen';
import { setUser } from '@/stores/actions/user';
import { completedOnboarding } from '@/stores/actions/localStatus';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
  };
};

const mapDispatchToProps = {
  setUser,
  completedOnboarding,
};

export default connect(mapStateToProps, mapDispatchToProps)(PushSettingScreen);
