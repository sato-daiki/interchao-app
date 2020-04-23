import { connect } from 'react-redux';
import { setUser } from '../stores/actions/user';
import NoticeScreen, { Props } from '../screens/NoticeScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => {
  const { user } = state.rootReducer;
  return {
    user,
  };
};

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticeScreen);
