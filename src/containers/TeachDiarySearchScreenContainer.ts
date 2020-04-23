import { connect } from 'react-redux';
import { State } from '../types/state';
import TeachDiarySearchScreen, {
  Props,
} from '../screens/TeachDiarySearchScreen';

const mapStateToProps = (state: State): Props => {
  const { profile } = state.rootReducer;
  return {
    profile,
  };
};

export default connect(mapStateToProps)(TeachDiarySearchScreen);
