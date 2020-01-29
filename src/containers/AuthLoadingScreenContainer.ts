import { connect } from 'react-redux';
import { State } from '../types/state';
import { setUser } from '../stores/actions/user';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const mapStateToProps = (state: State) => {
  return {
    user: state.rootReducer.user,
  };
};

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
