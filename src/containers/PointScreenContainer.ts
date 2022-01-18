import { connect } from 'react-redux';
import PointScreen, { Props } from '../screens/PointScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  profile: state.rootReducer.profile,
  user: state.rootReducer.user,
});

export default connect(mapStateToProps)(PointScreen);
