import { connect } from 'react-redux';
import { State } from '../types/state';
import { setPoints } from '../stores/actions/user';
import { addDiary, setDiaryTotalNum } from '../stores/actions/diaryList';
import {
  addDraftDiary,
  deleteDraftDiary,
  setDraftDiary,
} from '../stores/actions/draftDiaryList';
import PostDraftDiaryScreen from '../screens/PostDraftDiaryScreen';

const mapStateToProps = (state: State) => {
  return {
    user: state.rootReducer.user,
    profile: state.rootReducer.profile,
  };
};

const mapDispatchToProps = {
  setPoints,
  addDiary,
  addDraftDiary,
  deleteDraftDiary,
  setDraftDiary,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDraftDiaryScreen);
