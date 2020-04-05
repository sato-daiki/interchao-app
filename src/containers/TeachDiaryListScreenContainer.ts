import { connect } from 'react-redux';
import { setTeachDiaries } from '../stores/actions/teachDiaryList';
import { setUser } from '../stores/actions/user';
import { State } from '../types/state';
import TeachDiaryListScreen from '../screens/TeachDiaryListScreen';

const mapStateToProps = (state: State) => {
  const { teachDiaries } = state.rootReducer.teachDiaryList;
  return {
    profile: state.rootReducer.profile,
    user: state.rootReducer.user,
    teachDiaries,
  };
};

const mapDispatchToProps = {
  setTeachDiaries,
  setUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeachDiaryListScreen);
