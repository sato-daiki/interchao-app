import { connect } from 'react-redux';
import { State } from '../types/state';
import { setUser } from '../stores/actions/user';
import { addDiary } from '../stores/actions/diaryList';
import {
  addDraftDiary,
  deleteDraftDiary,
  editDraftDiary,
} from '../stores/actions/draftDiaryList';
import PostDraftDiaryScreen from '../screens/PostDraftDiaryScreen';

const mapStateToProps = (state: State) => {
  return {
    user: state.rootReducer.user,
    profile: state.rootReducer.profile,
  };
};

const mapDispatchToProps = {
  setUser,
  addDiary,
  addDraftDiary,
  deleteDraftDiary,
  editDraftDiary,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDraftDiaryScreen);
