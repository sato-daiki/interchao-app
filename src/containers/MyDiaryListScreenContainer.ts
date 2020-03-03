import { connect } from 'react-redux';
import { State } from '../types/state';
import MyDiaryListScreen from '../screens/MyDiaryListScreen';

const mapStateToProps = (state: State) => {
  return {
    currentUser: state.rootReducer.user,
  };
};

export default connect(mapStateToProps)(MyDiaryListScreen);
