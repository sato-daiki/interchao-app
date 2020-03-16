import { connect } from 'react-redux';
import TeachDiarySearchScreen from '../screens/TeachDiarySearchScreen';

const mapStateToProps = (state: State) => {
  const { profile } = state.rootReducer;
  return {
    profile,
  };
};

export default connect(mapStateToProps)(TeachDiarySearchScreen);
