import { connect } from 'react-redux';
import { setTeachDiaries } from '../stores/actions/teachDiaryList';
import { State } from '../types/state';
import TeachDiaryListScreen from '../screens/TeachDiaryListScreen';

const mapStateToProps = (state: State) => {
  const { teachDiaries } = state.rootReducer.teachDiaryList;
  return {
    profile: state.rootReducer.profile,
    teachDiaries,
  };
};

const mapDispatchToProps = {
  setTeachDiaries,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeachDiaryListScreen);
