import { connect } from 'react-redux';
import { setUser } from '../stores/actions/user';
import MyPageScreen, { Props } from '../screens/MyPageScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  profile: state.rootReducer.profile,
  user: state.rootReducer.user,
});

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPageScreen);
