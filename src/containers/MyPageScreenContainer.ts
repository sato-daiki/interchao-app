import { connect } from 'react-redux';
import MyPageScreen, { Props } from '../screens/MyPageScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  profile: state.rootReducer.profile,
  user: state.rootReducer.user,
});

export default connect(mapStateToProps)(MyPageScreen);
