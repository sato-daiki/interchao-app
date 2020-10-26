import { connect } from 'react-redux';
import { State } from '../types/state';
import { setUser } from '../stores/actions/user';
import { addDiary } from '../stores/actions/diaryList';
import PostDraftDiaryScreen, {
  Props,
} from '../screens/PostDraftDiaryScreen/PostDraftDiaryScreen';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
    profile: state.rootReducer.profile,
  };
};

const mapDispatchToProps = {
  setUser,
  addDiary,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDraftDiaryScreen);
