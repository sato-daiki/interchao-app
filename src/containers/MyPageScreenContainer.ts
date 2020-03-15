import { connect } from 'react-redux';
import MyPageScreen from '../screens/MyPageScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State) => ({
  profile: state.rootReducer.profile,
});

export default connect(mapStateToProps)(MyPageScreen);