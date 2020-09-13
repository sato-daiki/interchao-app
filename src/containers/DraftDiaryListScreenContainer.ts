import { connect } from 'react-redux';
import { State } from '../types/state';
import DraftDiaryListScreen, { Props } from '../screens/DraftDiaryListScreen';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
  };
};

export default connect(mapStateToProps)(DraftDiaryListScreen);
