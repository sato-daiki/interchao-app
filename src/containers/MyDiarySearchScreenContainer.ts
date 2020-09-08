import { connect } from 'react-redux';
import MyDiarySearchScreen, { Props } from '../screens/MyDiarySearchScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => {
  return {
    profile: state.rootReducer.profile,
  };
};

export default connect(mapStateToProps)(MyDiarySearchScreen);
