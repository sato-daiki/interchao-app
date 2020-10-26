import { connect } from 'react-redux';
import { State } from '../types/state';
import { setUser } from '../stores/actions/user';
import { addDiary } from '../stores/actions/diaryList';
import PostDraftDiaryWebScreen, {
  WebProps,
} from '../screens/PostDraftDiaryScreen/PostDraftDiaryWebScreen';

const mapStateToProps = (state: State): WebProps => {
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
)(PostDraftDiaryWebScreen);
